import { Agent, openai } from "@mastra/core";

export const planner = new Agent({
  name: "Planner",
  instructions: `
    以下の仕様をもとに、実装ステップを段階的に列挙してください。
    例: 1. プロジェクト初期化、2. ルーティング設定 ...
  `,
  model: openai("gpt-4o"), // 使用するモデルを指定します。環境変数などでAPIキー設定が必要です。
});