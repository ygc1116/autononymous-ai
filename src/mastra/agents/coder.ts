import { Agent, openai } from "@mastra/core";
// ツール定義ファイルから、使用するツールをインポートします
import { gitClone } from "../tools/git"; // 例: git.ts からインポート
// 他に必要なツールもインポートします
// import { writeFile } from "../tools/file";
// import { runNpmScript } from "../tools/npm";

export const coder = new Agent({
  name: "Coder",
  instructions: `
    あなたはプロのソフトウェアエンジニアです。
    与えられた実装ステップリストに基づき、各ステップを順番に実行してください。
    必要な場合は提供されているツール (gitClone, writeFile, runNpmScript など) を使用して、コード生成、ファイル書き込み、コマンド実行などを行ってください。
    各ステップの実行結果を報告してください。
  `,
  // このエージェントが利用可能なツールをリストで指定します
  tools: [
    gitClone,
    // writeFile, // ファイル書き込みツール
    // runNpmScript, // npm スクリプト実行ツール
    // 他の定義済みツールを追加
  ],
  model: openai("gpt-4o"), // コーディングに適したモデルを選択
});