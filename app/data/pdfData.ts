import fs from "fs/promises";
import path from "path";

async function loadPdfData() {
  const blogsPath = path.join(process.cwd(), "app", "data", "Blogs.pdf");
  const bookPath = path.join(process.cwd(), "app", "data", "Book.pdf");

  const [blogsBuffer, bookBuffer] = await Promise.all([
    fs.readFile(blogsPath),
    fs.readFile(bookPath),
  ]);

  return {
    blogsBase64: blogsBuffer.toString("base64"),
    bookBase64: bookBuffer.toString("base64"),
  };
}

export const pdfDataPromise = loadPdfData();
