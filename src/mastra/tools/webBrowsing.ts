import { Tool } from "@mastra/core";

export const webBrowsing = new Tool({
  name: "webBrowsing",
  description: "Fetches the content of a webpage.",
  args: {
    url: {
      type: "string",
      description: "The URL of the webpage to fetch.",
      required: true,
    },
  },
  async run(args: { url: string }) {
    try {
      const response = await web_read({ url: args.url });
      return `Web browsing successful. Content: ${response}`;
    } catch (error: any) {
      return `Web browsing failed. Error: ${error.message}`;
    }
  },
});