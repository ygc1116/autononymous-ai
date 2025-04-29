import { createTool } from "@mastra/core";
import { z } from "zod";

export const webBrowsing = createTool({
  id: "webBrowsing",
  description: "Fetches the content of a webpage.",
  inputSchema: z.object({
    url: z.string().describe("The URL of the webpage to fetch."),
  }),
  outputSchema: z.string(),
  async execute(args) {
    try {
      const response = await web_read({ url: args.url });
      return `Web browsing successful. Content: ${response}`;
    } catch (error: any) {
      return `Web browsing failed. Error: ${error.message}`;
    }
  },
});