import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
});

export const askFinanceAI = async (transcations, question) => {
  const prompt = PromptTemplate.fromTemplate(`
You are a finance assistant.

User transcations:
{transcations}

User question:
{question}

Give a simple beginner friendly answer.
    `);

  const chain = prompt.pipe(model);

  const response = await chain.invoke({
    transcations: JSON.stringify(transcations),
    question,
  });

  return response.content;
};
