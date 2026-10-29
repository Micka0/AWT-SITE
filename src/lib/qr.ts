import qrcode from "qrcode-generator";

/** Génère un QR code en SVG (modules sombres sur fond blanc, zone de silence de 4 modules). */
export function qrSvg(text: string) {
  const q = qrcode(0, "M");
  q.addData(text);
  q.make();
  const n = q.getModuleCount();
  const m = 4;
  const size = n + 2 * m;
  let d = "";
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (q.isDark(r, c)) d += `M${c + m} ${r + m}h1v1h-1z`;
    }
  }
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges">` +
    `<rect width="${size}" height="${size}" fill="#fff"/><path fill="#1c1a1b" d="${d}"/></svg>`
  );
}
