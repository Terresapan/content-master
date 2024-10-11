import { readFileSync } from "fs";
import path from "path";

const blogsBase64 = readFileSync(
  path.join(process.cwd(), "app", "data", "Blogs.pdf")
).toString("base64");
const bookBase64 = readFileSync(
  path.join(process.cwd(), "app", "data", "Book.pdf")
).toString("base64");

export const pdfData = {
  blogsBase64,
  bookBase64,
};
