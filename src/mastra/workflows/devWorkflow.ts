import { Workflow } from "@mastra/core";
// ワークフローで使用するエージェントをインポートします
import { planner } from "../agents/planner";
import { coder } from "../agents/coder";
// 将来的に追加する可能性のあるエージェント (例)
// import { verifier } from "../agents/verifier";
// import { deployer } from "../agents/deployer";

// 'dev' という名前の開発ワークフローを定義
export const devWorkflow = new Workflow("dev")
  // 1. 'plan' ステップ: planner エージェントを実行
  .step("plan", async (ctx) => {
    // ワークフローの初期入力 (ctx.input.spec) を planner に渡して実行
    // .spec はワークフロー実行時に渡す想定の入力キー
    const planResult = await planner.generate([
      { role: "user", content: ctx.input.spec }, // ユーザーからの仕様を渡す
    ]);
    // planner の生成結果 (実装ステップリスト) を返す
    return planResult;
  })
  // 2. 'execute' ステップ: coder エージェントを実行
  .step("execute", async (ctx) => {
    // 前の 'plan' ステップの出力 (ctx.steps.plan.output) を coder に渡して実行
    const codeResult = await coder.generate([
      { role: "user", content: `以下のステップを実行してください:\n${ctx.steps.plan.output}` }, // プランナーの出力を指示として渡す
    ]);
    // coder の実行結果 (コード生成やツール実行のログなど) を返す
    return codeResult;
  });
  // 3. 'verify' ステップ (将来追加する例)
  // .step("verify", async (ctx) => verifier.generate(ctx.steps.execute.output))
  // 4. 'deploy' ステップ (将来追加する例)
  // .after("deploy", async (ctx) => deployer.generate(ctx.steps.verify.output));

// 必要に応じて、ワークフロー全体の入力スキーマを定義することもできます
// devWorkflow.setInputSchema({ ... });

import { Workflow } from "@mastra/core";
import { planner } from "../agents/planner";
import { coder } from "../agents/coder";
// 仮のメモリコンポーネントをインポート (別途実装が必要)
// import { memory } from "../memory/vectorStore"; // 例: ベクトルストア連携

// --- 仮のメモリコンポーネントのダミー実装 ---
// 実際にはベクトルデータベース等に接続する実装が必要です
const memory = {
  retrieve: async ({ query }: { query: string }) => {
    console.log(`[Memory] Retrieving info for query: ${query.substring(0, 50)}...`);
    // ダミーの応答: 本来はここでベクトル検索などを行う
    if (query.includes("認証")) {
      return "過去のプロジェクトでは JWT (JSON Web Token) を使用しました。関連ライブラリ: jsonwebtoken, passport-jwt";
    }
    return "関連する記憶情報は見つかりませんでした。";
  }
};
// --- ダミー実装ここまで ---


export const devWorkflow = new Workflow("dev")
  // NEW: 1. 'retrieve' ステップ: 記憶から関連情報を検索
  .step("retrieve", async (ctx) => {
    console.log("Retrieving relevant information from memory...");
    // ワークフローの初期入力 (ctx.input.spec) をクエリとしてメモリを検索
    // memory.retrieve は Promise を返すと仮定
    const retrievedInfo = await memory.retrieve({ query: ctx.input.spec });
    console.log("Retrieved information:", retrievedInfo);
    // 検索結果 (文字列または構造化データ) を返す
    return retrievedInfo;
  })
  // 2. 'plan' ステップ: 取得した情報を活用して計画 (変更あり)
  .step("plan", async (ctx) => {
    // retrieve ステップの出力 (ctx.steps.retrieve.output) を取得
    const retrievedContext = ctx.steps.retrieve.output;

    // planner への指示に、取得した記憶情報を追加
    const plannerInstructions = `
以下の仕様と、過去の関連情報（もしあれば）に基づいて、実装ステップを段階的に列挙してください。

# 仕様:
${ctx.input.spec}

# 過去の関連情報:
${retrievedContext || "特にありません。"}

# 出力形式の例:
1. 依存関係のインストール (例: npm install library)
2. 設定ファイルの作成 (例: config.ts)
3. 主要な関数の実装 (例: src/main.ts の main 関数)
...`;

    const planResult = await planner.generate([
      { role: "user", content: plannerInstructions },
    ]);
    return planResult;
  })
  // 3. 'execute' ステップ: (変更なし)
  .step("execute", async (ctx) => {
    const codeResult = await coder.generate([
      { role: "user", content: `以下のステップを実行してください:\n${ctx.steps.plan.output}` },
    ]);
    return codeResult;
  });
  // ... (将来的な verify, deploy ステップ)