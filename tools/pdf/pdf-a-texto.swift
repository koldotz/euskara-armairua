// ── PDF → texto (y opcionalmente imágenes de página) ─────────────────────
// Primer paso para transcribir un material nuevo (así se hicieron Mintzamena
// y Ostalaritza): el texto sale con marcas «===== PDF PAGE n =====» para
// poder citar la página, y las imágenes sirven para revisar lo que el texto
// no recoge bien (tablas, columnas, dibujos, erratas).
//
//   swift tools/pdf/pdf-a-texto.swift <fichero.pdf> <carpeta-salida> [--png] [--desde N] [--hasta M] [--escala 2]
//
// Crea <carpeta-salida>/texto.txt y, con --png, p001.png, p002.png…
// Solo macOS (usa PDFKit, que viene con el sistema).
import Foundation
import PDFKit
import AppKit

var args = Array(CommandLine.arguments.dropFirst())
func opt(_ name: String) -> String? {
    guard let i = args.firstIndex(of: name), i + 1 < args.count else { return nil }
    let v = args[i + 1]; args.removeSubrange(i...(i + 1)); return v
}
let png = args.contains("--png"); args.removeAll { $0 == "--png" }
let desde = Int(opt("--desde") ?? "1") ?? 1
let hastaOpt = opt("--hasta").flatMap { Int($0) }
let escala = CGFloat(Double(opt("--escala") ?? "2") ?? 2)
guard args.count == 2 else {
    print("Uso: swift tools/pdf/pdf-a-texto.swift <fichero.pdf> <carpeta-salida> [--png] [--desde N] [--hasta M] [--escala 2]")
    exit(2)
}
guard let doc = PDFDocument(url: URL(fileURLWithPath: args[0])) else { print("No se puede abrir el PDF: \(args[0])"); exit(1) }
let out = URL(fileURLWithPath: args[1])
try? FileManager.default.createDirectory(at: out, withIntermediateDirectories: true)
let hasta = min(hastaOpt ?? doc.pageCount, doc.pageCount)

var texto = ""
for i in desde...max(desde, hasta) {
    guard let page = doc.page(at: i - 1) else { continue }
    texto += "===== PDF PAGE \(i) =====\n" + (page.string ?? "") + "\n"
    if png {
        let box = page.bounds(for: .mediaBox)
        let w = Int(box.width * escala), h = Int(box.height * escala)
        let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: w, pixelsHigh: h, bitsPerSample: 8, samplesPerPixel: 4,
                                   hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
        NSGraphicsContext.saveGraphicsState()
        let ctx = NSGraphicsContext(bitmapImageRep: rep)!
        NSGraphicsContext.current = ctx
        ctx.cgContext.setFillColor(NSColor.white.cgColor)
        ctx.cgContext.fill(CGRect(x: 0, y: 0, width: w, height: h))
        ctx.cgContext.scaleBy(x: escala, y: escala)
        page.draw(with: .mediaBox, to: ctx.cgContext)
        NSGraphicsContext.restoreGraphicsState()
        try! rep.representation(using: .png, properties: [:])!.write(to: out.appendingPathComponent(String(format: "p%03d.png", i)))
    }
}
try! texto.write(to: out.appendingPathComponent("texto.txt"), atomically: true, encoding: .utf8)
print("✔ \(hasta - desde + 1) páginas → \(out.path)/texto.txt" + (png ? " + imágenes p###.png" : ""))
