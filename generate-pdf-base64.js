import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsPath = path.join(__dirname, "app", "data", "Blogs.pdf");
const bookPath = path.join(__dirname, "app", "data", "Book.pdf");

try {
  const [blogsBuffer, bookBuffer] = await Promise.all([
    fs.readFile(blogsPath),
    fs.readFile(bookPath),
  ]);

  const blogsBase64 = blogsBuffer.toString("base64");
  const bookBase64 = bookBuffer.toString("base64");

  console.log("Blogs PDF Base64:");
  console.log(blogsBase64);
  console.log("\nBook PDF Base64:");
  console.log(bookBase64);

  // Generate the content for pdfData.ts
  const pdfDataContent = `
export const pdfData = {
  blogsBase64: '${blogsBase64}',
  bookBase64: '${bookBase64}'
};
`;

  // Write the content to pdfData.ts
  await fs.writeFile(
    path.join(__dirname, "app", "data", "pdfData.ts"),
    pdfDataContent
  );
  console.log("\npdfData.ts has been updated with the base64 strings.");
} catch (error) {
  console.error("Error:", error);
}
