import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";

interface PalmAITextStuff {
  user_prompt: string;
  text_input:string;
}

export async function palmAITextStuff({ user_prompt,text_input }: PalmAITextStuff) {
  const MODEL_NAME = "models/text-bison-001";
  const API_KEY = import.meta.env.RAKKAS_PALM_API_KEY;
    const the_proompt = `Restructue the following blog post  ${text_input} , and adhere to the following ${user_prompt}`;

  const promptString = the_proompt;
  const stopSequences: string[] = [];

  try {
    const client = new TextServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const result = await client.generateText({
      // required, which model to use to generate the result
      model: MODEL_NAME,
      // optional, 0.0 always uses the highest-probability result
      temperature: 0.7,
      // optional, how many candidate results to generate
      candidateCount: 1,
      // optional, number of most probable tokens to consider for generation
      topK: 40,
      // optional, for nucleus sampling decoding strategy
      topP: 0.95,
      // optional, maximum number of output tokens to generate
      maxOutputTokens: 1024,
      // optional, sequences at which to stop model generation
      stopSequences: stopSequences,
      // optional, safety settings
      safetySettings: [
        { category: "HARM_CATEGORY_DEROGATORY", threshold: 1 },
        { category: "HARM_CATEGORY_TOXICITY", threshold: 1 },
        { category: "HARM_CATEGORY_VIOLENCE", threshold: 2 },
        { category: "HARM_CATEGORY_SEXUAL", threshold: 2 },
        { category: "HARM_CATEGORY_MEDICAL", threshold: 2 },
        { category: "HARM_CATEGORY_DANGEROUS", threshold: 2 },
      ],
      prompt: {
        text: promptString,
      },
    });

    let the_response = "";
    result.forEach((item, idx) => {
      if (item) {
        // @ts-expect-error
        item.candidates.forEach((x, index) => {
          the_response = the_response + x.output;
        });
      }
    });
    return {
      data: { output: the_response, original_response: result },
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.message,
        original_error: error,
      },
    };
  }
}
