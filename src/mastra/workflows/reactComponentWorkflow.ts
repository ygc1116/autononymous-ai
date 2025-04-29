// src/mastra/workflows/reactComponentWorkflow.ts

import { CoderAgent } from "../agents/coder";
import { fileWriting } from "../tools/fileWriting";

export async function reactComponentWorkflow(componentDescription: string, filename: string): Promise<string> {
  const coderAgent = new CoderAgent();

  const componentCode = await coderAgent.generateCode(
    `Generate a React component with the following description: ${componentDescription}`
  );

  const result = await fileWriting.run({ filePath: filename, content: componentCode });

  return `React component written to ${filename}`;
}