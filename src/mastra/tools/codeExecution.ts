import { Tool } from "@mastra/core";

export const codeExecution = new Tool({
  name: "codeExecution",
  description: "Executes JavaScript code and returns the output.",
  args: {
    code: {
      type: "string",
      description: "The JavaScript code to execute.",
      required: true,
    },
  },
  async run(args: { code: string }) {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(args.code);
      return `Code execution successful. Output: ${result}`;
    } catch (error: any) {
      return `Code execution failed. Error: ${error.message}`;
    }
  },
});