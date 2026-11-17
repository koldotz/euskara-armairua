// ── PDF → texto (y opcionalmente imágenes de página) ─────────────────────
// Primer paso para transcribir un material nuevo (así se hicieron Mintzamena
// y Ostalaritza): el texto sale con marcas «===== PDF PAGE n =====» para
// poder citar la página, y las imágenes sirven para revisar lo que el texto
// no recoge bien (tablas, columnas, dibujos, erratas).
//
//   swift tools/pdf/pdf-a-texto.swift <fichero.pdf> <carpeta-salida> [--png] [--ocr|--ocr-todo] [--desde N] [--hasta M] [--escala 2]
//
// Crea <carpeta-salida>/texto.txt y, con --png, p001.png, p002.png…
// Con --ocr, las páginas escaneadas (sin texto) se leen con el reconocimiento
// de texto de macOS (Vision); con --ocr-todo, todas. Vision no trae euskera:
// lee como castellano sin corrector, así que revisa las palabras raras.
// Solo macOS (usa PDFKit y Vision, que vienen con el sistema).
import Foundation
import PDFKit
import AppKit
import Vision

var args = Array(CommandLine.arguments.dropFirst())
func opt(_ name: String) -> String? {
    guard let i = args.firstIndex(of: name), i + 1 < args.count else { return nil }
    let v = args[i + 1]; args.removeSubrange(i...(i + 1)); return v
}
func flag(_ name: String) -> Bool { let f = args.contains(name); args.removeAll { $0 == name }; return f }
let png = flag("--png")
let ocrTodo = flag("--ocr-todo")
let ocr = flag("--ocr") || ocrTodo
let desde = Int(opt("--desde") ?? "1") ?? 1
let hastaOpt = opt("--hasta").flatMap { Int($0) }
let escala = CGFloat(Double(opt("--escala") ?? "2") ?? 2)
guard args.count == 2 else {
    print("Uso: swift tools/pdf/pdf-a-texto.swift <fichero.pdf> <carpeta-salida> [--png] [--ocr|--ocr-todo] [--desde N] [--hasta M] [--escala 2]")
    exit(2)
}
guard let doc = PDFDocument(url: URL(fileURLWithPath: args[0])) else { print("No se puede abrir el PDF: \(args[0])"); exit(1) }
let out = URL(fileURLWithPath: args[1])
try? FileManager.default.createDirectory(at: out, withIntermediateDirectories: true)
let hasta = min(hastaOpt ?? doc.pageCount, doc.pageCount)

/* la página como imagen, a la escala pedida */
func render(_ page: PDFPage, _ s: CGFloat) -> NSBitmapImageRep {
    let box = page.bounds(for: .mediaBox)
    let w = Int(box.width * s), h = Int(box.height * s)
    let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: w, pixelsHigh: h, bitsPerSample: 8, samplesPerPixel: 4,
                               hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
    NSGraphicsContext.saveGraphicsState()
    let ctx = NSGraphicsContext(bitmapImageRep: rep)!
    NSGraphicsContext.current = ctx
    ctx.cgContext.setFillColor(NSColor.white.cgColor)
    ctx.cgContext.fill(CGRect(x: 0, y: 0, width: w, height: h))
    ctx.cgContext.scaleBy(x: s, y: s)
    page.draw(with: .mediaBox, to: ctx.cgContext)
    NSGraphicsContext.restoreGraphicsState()
    return rep
}
/* reconocimiento de texto: líneas de arriba abajo */
func leer(_ rep: NSBitmapImageRep) -> String {
    guard let cg = rep.cgImage else { return "" }
    let req = VNRecognizeTextRequest()
    req.recognitionLevel = .accurate
    req.usesLanguageCorrection = false
    req.recognitionLanguages = ["es-ES"]
    try? VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
    let obs = (req.results ?? []).sorted { a, b in
        abs(a.boundingBox.midY - b.boundingBox.midY) > 0.008 ? a.boundingBox.midY > b.boundingBox.midY : a.boundingBox.minX < b.boundingBox.minX
    }
    return obs.compactMap { $0.topCandidates(1).first?.string }.joined(separator: "\n")
}

var texto = "", leidas = 0
for i in desde...max(desde, hasta) {
    guard let page = doc.page(at: i - 1) else { continue }
    var t = page.string ?? ""
    let escaneada = t.trimmingCharacters(in: .whitespacesAndNewlines).count < 40
    if ocr && (ocrTodo || escaneada) { t = leer(render(page, max(escala, 3))); leidas += 1 }
    texto += "===== PDF PAGE \(i) =====\n" + t + "\n"
    if png { try! render(page, escala).representation(using: .png, properties: [:])!.write(to: out.appendingPathComponent(String(format: "p%03d.png", i))) }
}
try! texto.write(to: out.appendingPathComponent("texto.txt"), atomically: true, encoding: .utf8)
print("✔ \(hasta - desde + 1) páginas → \(out.path)/texto.txt" + (leidas > 0 ? " (\(leidas) leídas con OCR)" : "") + (png ? " + imágenes p###.png" : ""))
