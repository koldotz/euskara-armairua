// Fusión a tres bandas del navegador (armairua-cloud.js): se extraen las
// funciones del fichero real, sin copiarlas, para probar exactamente lo publicado.
import fs from 'fs';
import path from 'path';

export default async function(t){
  const src = fs.readFileSync(path.join(t.root, 'armairua-cloud.js'), 'utf8');
  const a = src.indexOf('var ATOM'), b = src.indexOf('/* aplica lo que la nube');
  t.ok(a > 0 && b > a, 'se encuentran las funciones de fusión en armairua-cloud.js');
  const { mergeStr } = new Function(src.slice(a, b) + '; return { mergeStr };')();
  const S = JSON.stringify, P = JSON.parse;
  const base = S({ 1: { b: 1, n: 1 }, 2: { b: 1, n: 1 } });

  let r = P(mergeStr('hitzen-kutxa-v1', base, S({ 1: { b: 1, n: 1 }, 2: { b: 1, n: 1 }, 5: { b: 2 } }), S({ 1: { b: 1, n: 1 }, 2: { b: 1, n: 1 }, 7: { b: 2 } }), false));
  t.ok(r[5] && r[7] && r[1] && r[2], 'palabras repasadas en dispositivos distintos: se quedan las dos');
  const o = S({ 1: { b: 1, ef: 2.5, n: 1 } }), l = S({ 1: { b: 2, ef: 2.5, n: 2 } }), c = S({ 1: { b: 1, ef: 2.3, n: 2 } });
  t.ok(S(P(mergeStr('hitzen-kutxa-v1', o, l, c, true))[1]) === S({ b: 2, ef: 2.5, n: 2 }), 'misma palabra: la ficha entera del lado más reciente (local)');
  t.ok(S(P(mergeStr('hitzen-kutxa-v1', o, l, c, false))[1]) === S({ b: 1, ef: 2.3, n: 2 }), 'misma palabra: la ficha entera del lado más reciente (nube)');
  r = P(mergeStr('koadernoa:k1', o, l, c, true));
  t.ok(r[1].ef === 2.3 && r[1].b === 2, 'fuera de Hitzen kutxa se fusiona campo a campo');
  t.ok(Object.keys(P(mergeStr('hitzen-kutxa-v1', base, S({}), base, true))).length === 0, 'reinicio aquí y nada nuevo en la nube → reiniciado');
  r = P(mergeStr('hitzen-kutxa-v1', base, S({ 1: { b: 1, n: 1 }, 2: { b: 1, n: 1 }, 9: { b: 2 } }), S({}), false));
  t.ok(Object.keys(r).join() === '9', 'reinicio en otro dispositivo + repaso nuevo aquí → solo el nuevo');
  r = P(mergeStr('hitzen-kutxa-v1', undefined, S({ 3: { b: 2 }, 4: { b: 1 } }), S({ 4: { b: 5 }, 6: { b: 1 } }), false));
  t.ok(r[3] && r[6] && r[4].b === 5, 'sin base (primera vez): unión, y el choque para el más reciente');
  r = P(mergeStr('koadernoa:k1', S({ g0: 'etxe' }), S({ g0: 'etxe', g1: 'etxean' }), S({ g0: 'etxea' }), false));
  t.ok(r.g0 === 'etxea' && r.g1 === 'etxean', 'cuaderno: casillas distintas se juntan');
  r = P(mergeStr('mintzamena-a1-v1', S({ done: { o01: 1 }, hide: false }), S({ done: { o01: 1, o02: 2 }, hide: false }), S({ done: { o01: 1, j09: 3 }, hide: true }), false));
  t.ok(r.done.o02 && r.done.j09 && r.hide === true, 'Mintzamena: conversaciones hechas en los dos dispositivos');
  t.ok(mergeStr('x', 'a', 'b', 'c', true) === 'b' && mergeStr('x', 'a', 'b', 'c', false) === 'c', 'texto que no es JSON: gana el más reciente');
  const cv = '{"1": {"b":2}}';
  t.ok(mergeStr('x', S({ 1: { b: 1 } }), S({ 1: { b: 1 } }), cv, true) === cv, 'sin cambios locales: la cadena de la nube tal cual');
}
