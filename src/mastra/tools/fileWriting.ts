import { Tool } from "@mastra/core";
import * as fs from 'fs/promises';

export const fileWriting = new Tool({
  name: "fileWriting",
  description: "Writes content to a file.",
  args: {
    filePath: {
      type: "string",
      description: "The path to the file.",
      required: true,
    },
    content: {
      type: "string",
      description: "The content to write to the file.",
      required: true,
    },
  },
  async run(args: { filePath: string; content: string }) {
    try {
      await fs.writeFile(args.filePath, args.content);
      return `File writing successful. File: ${args.filePath}`;
    } catch (error: any) {
      return `File writing failed. Error: ${error.message}`;
    }
  },
});