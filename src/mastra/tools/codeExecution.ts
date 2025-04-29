import { createTool } from "@mastra/core";
import { z } from "zod";

export const codeExecution = createTool({
  id: "codeExecution",
  description: "Executes JavaScript code and returns the output.",
  inputSchema: z.object({
    code: z.string().describe("The JavaScript code to execute."),
  }),
  outputSchema: z.string(),
  async execute(args) {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(args.code);
      return `Code execution successful. Output: ${result}`;
    } catch (error: any) {
      return `Code execution failed. Error: ${error.message}`;
    }
  },
});