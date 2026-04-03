// apps/api/test-render.ts
import { renderCertificate } from "@/services/render-engine";
import fs from "fs";

const template = fs.readFileSync("./sample.png");

const result = await renderCertificate({
  templateBuffer: template,
  placeholders: [
    { key: "name", x: 200, y: 200, fontSize: 80, fontColor: "#FF0000", align: "left" }
  ],
  data: { name: "TEST" }
});

fs.writeFileSync("./output.png", result);
console.log("✅ Open output.png");