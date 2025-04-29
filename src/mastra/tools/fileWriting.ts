import { createTool } from "@mastra/core";
import * as fs from 'fs/promises';
import { z } from "zod";

export const fileWriting = createTool({
  id: "fileWriting",
  description: "Writes content to a file.",
  inputSchema: z.object({
    filePath: z.string().describe("The path to the file."),
    content: z.string().describe("The content to write to the file."),
  }),
  outputSchema: z.string(),
  async execute(args) {
    try {
      await fs.writeFile(args.filePath, args.content);
      return `File writing successful. File: ${args.filePath}`;
    } catch (error: any) {
      return `File writing failed. Error: ${error.message}`;
    }
  },
});