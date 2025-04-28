import { Workflow } from "@mastra/core";
import { webBrowsing } from "../tools/webBrowsing";
import { coder } from "../agents/coder";

export const summarizeWorkflow = new Workflow("summarize")
  .step("browse", async (ctx) => {
    const url = ctx.input.url;
    const content = await webBrowsing.execute(url);
    return content;
  })
  .step("summarize", async (ctx) => {
    const content = ctx.steps.browse.output;
    const summary = await coder.generate([
      { role: "user", content: `以下の内容を要約してください:\n${content}` },
    ]);
    return summary;
  });