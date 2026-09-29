// Chrome sin ventana controlado por el protocolo DevTools (CDP), sin
// dependencias: usa el WebSocket y el fetch que trae Node 22.
// Cada pestaña va en su propio contexto de navegador (como otro dispositivo:
// localStorage aparte) y sin service worker.
import { spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

export const sleep = ms => new Promise(r => setTimeout(r, ms));

const CHROMES = [
  process.env.CHROME,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'
].filter(Boolean);

/* arranca Chrome con un perfil temporal y un puerto libre; devuelve {ws, close} */
export async function launchChrome(){
  const bin = CHROMES.find(p => fs.existsSync(p));
  if (!bin) throw new Error('No encuentro Chrome. Indica la ruta con CHROME=/ruta/al/binario');
  const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'armairua-chrome-'));
  const proc = spawn(bin, ['--headless=new', '--remote-debugging-port=0', '--user-data-dir=' + prof,
    '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: 'ignore' });
  const portFile = path.join(prof, 'DevToolsActivePort');
  for (let i = 0; i < 100; i++) {
    if (fs.existsSync(portFile)) {
      const [port] = fs.readFileSync(portFile, 'utf8').split('\n');
      try {
        const v = await (await fetch('http://127.0.0.1:' + port + '/json/version')).json();
        return { ws: v.webSocketDebuggerUrl, close: () => { proc.kill(); setTimeout(() => { try { fs.rmSync(prof, { recursive: true, force: true }); } catch (e) {} }, 500); } };
      } catch (e) {}
    }
    await sleep(100);
  }
  proc.kill();
  throw new Error('Chrome no ha arrancado');
}

/* abre una pestaña nueva (otro «dispositivo») */
export async function tab(browserWs, { width = 1280, height = 900, mobile = false, scheme } = {}){
  const ws = new WebSocket(browserWs);
  let id = 0; const pend = {}; const errs = [];
  ws.onmessage = m => {
    const d = JSON.parse(m.data);
    if (d.id && pend[d.id]) { pend[d.id](d); delete pend[d.id]; }
    if (d.method === 'Runtime.exceptionThrown') errs.push('excepción: ' + (d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text));
    if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') errs.push('console.error: ' + d.params.args.map(a => a.value || a.description).join(' '));
  };
  await new Promise(r => ws.onopen = r);
  const send = (method, params = {}, sessionId) => new Promise(r => { const i = ++id; pend[i] = r; const msg = { id: i, method, params }; if (sessionId) msg.sessionId = sessionId; ws.send(JSON.stringify(msg)); });
  const { result: { browserContextId } } = await send('Target.createBrowserContext', {});
  const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank', browserContextId });
  const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
  const S = (m, p) => send(m, p, sessionId);
  await S('Runtime.enable'); await S('Page.enable'); await S('Network.enable');
  await S('Network.setBypassServiceWorker', { bypass: true });
  await S('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: mobile ? 2 : 1, mobile });
  if (mobile) await S('Emulation.setTouchEmulationEnabled', { enabled: true });
  if (scheme) await S('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }] });
  const t = {
    errs, S, sleep,
    /* evalúa en la página; devuelve el valor (o «EVAL-ERR …») */
    ev: async expr => {
      const r = await S('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
      return r.result.exceptionDetails ? 'EVAL-ERR ' + (r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text) : r.result.result.value;
    },
    go: async (url, wait = 1500) => { await S('Page.navigate', { url }); await sleep(wait); },
    offline: v => S('Network.emulateNetworkConditions', { offline: !!v, latency: 0, downloadThroughput: -1, uploadThroughput: -1 }),
    tap: async (x, y) => {
      await S('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] }); await sleep(50);
      await S('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    },
    click: async (x, y) => {
      await S('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
      await S('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
    },
    key: k => S('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code: k, windowsVirtualKeyCode: k === 'Escape' ? 27 : 0 }),
    shot: async file => { const r = await S('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(file, Buffer.from(r.result.data, 'base64')); },
    close: async () => { await send('Target.disposeBrowserContext', { browserContextId }); ws.close(); }
  };
  return t;
}
