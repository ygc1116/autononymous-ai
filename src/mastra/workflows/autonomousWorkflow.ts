import { Workflow } from "@mastra/core";

import { codeExecution } from "../tools/codeExecution";

import { fileWriting } from "../tools/fileWriting";
export const autonomousWorkflow = new Workflow("autonomous")
  .step("create-file", async (ctx) => {
    const filePath = ctx.input.filePath;
    const fileContent = ctx.input.fileContent;
    const result = await fileWriting.execute({ filePath, content: fileContent });
    return result;
  })
  .step("edit-file", async (ctx) => {
    const filePath = ctx.input.filePath;
    const fileContent = ctx.input.fileContent;
    // ここで、ファイルの編集ロジックを実装する必要があります
    // 例: ファイルを読み込み、指定された内容で更新し、保存する
    const result = "File edited successfully.";
    return result;
  })
  .step("execute-file", async (ctx) => {
    const filePath = ctx.input.filePath;
    const result = await codeExecution.execute(filePath);
    return result;
  });