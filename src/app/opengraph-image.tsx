import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "Mel Milap Foundation: Good begins when we come together.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FFF8ED", position: "relative", fontFamily: "sans-serif" }}>
        <div style={{ position: "absolute", right: -80, top: 60, width: 520, height: 520, borderRadius: 999, background: "#FFBD2E", display: "flex" }} />
        <div style={{ position: "absolute", right: 260, bottom: -120, width: 300, height: 300, borderRadius: 999, background: "#D82A63", display: "flex" }} />
        <div style={{ position: "absolute", right: 60, bottom: 40, width: 200, height: 200, borderRadius: "200px 200px 0 0", background: "#18845F", display: "flex" }} />
        <div style={{ position: "absolute", right: 120, top: 20, width: 110, height: 110, borderRadius: 999, background: "#2546D8", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, width: 760, color: "#2B1538" }}>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#C01E55" }}>{site.name}</div>
          <div style={{ fontSize: 86, fontWeight: 800, lineHeight: 1, marginTop: 24, letterSpacing: -3 }}>{site.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
