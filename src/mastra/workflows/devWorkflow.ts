

import { Workflow } from "@mastra/core";
import { planner } from "../agents/planner";
import { CoderAgent } from "../agents/coder";
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
    const coderAgent = new CoderAgent();
    const codeResult = await coderAgent.generateCode(
      `以下のステップを実行してください:\n${ctx.steps.plan.output}`
    );
    return codeResult;
<<<<<<< HEAD
  }) 
  .step("test", async (ctx) => {
      console.log("Executing tests...");
      // execute ステップの出力 (ctx.steps.execute.output) をテストツールに渡す
      const testResult = await testExecution.execute(ctx.steps.execute.output);
      console.log("Test result:", testResult);
      return testResult;
    });
=======
  })
  .step("test", async (ctx) => {
    console.log("Executing tests...");
    // execute ステップの出力 (ctx.steps.execute.output) をテストツールに渡す
    const testResult = await testExecution.execute(ctx.steps.execute.output);
    console.log("Test result:", testResult);
  })
   
>>>>>>> ab1c25df57fc773247ca47bbe2a4d7ce01759395
  // ... (将来的な verify, deploy ステップ)