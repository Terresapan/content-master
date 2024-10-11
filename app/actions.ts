"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { pdfData } from "./data/pdfData";

interface VideoDetails {
  videoTopic: string;
  targetAudience: string;
  uniqueSellingPoints: string;
  question: string;
}

export async function processPdfAction(videoDetails: VideoDetails) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { blogsBase64, bookBase64 } = pdfData;

    const prompt = `
        Please use the information provided in the PDFs to generate a response based on the following details:

        Topic: ${videoDetails.videoTopic}
        Target Audience: ${videoDetails.targetAudience}
        Unique Selling Points: ${videoDetails.uniqueSellingPoints}
        Question: ${videoDetails.question}

        Your response should include:
        1. A brief outline for a short video (30-60 seconds) that addresses the topic and appeals to the target audience.
        2. Suggestions on how to incorporate the unique selling points into the video.
        3. A response to the user's specific question, relating it back to the video content.
        4. Any relevant tips or strategies from the PDFs that could enhance the video's effectiveness for lead generation.

        Adhere strictly to the content in these PDFs. If the information requested is nothing to do with the provided materials,
        clearly state that you do not have the answer, rather than providing speculative responses.
        If users raise questions unrelated to content creation, politely remind them to focus on the topic at hand.
        `;

    const request = {
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: blogsBase64,
                mimeType: "application/pdf",
              },
            },
            {
              inlineData: {
                data: bookBase64,
                mimeType: "application/pdf",
              },
            },
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const resp = await model.generateContent(request);

    if (!resp.response.candidates || resp.response.candidates.length === 0) {
      throw new Error("Did not receive response candidates.");
    }

    const summary = resp.response.candidates[0].content.parts[0].text;
    return { summary };
  } catch (error) {
    console.error("Error in processPdfAction:", error);
    throw new Error("Failed to process PDFs and generate response");
  }
}
