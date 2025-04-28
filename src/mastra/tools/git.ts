import { defineTool } from "@mastra/core";
import { exec } from "child_process"; // Node.js の標準モジュールを使用
import { promisify } from "util"; // exec を Promise 化するために使用

const execAsync = promisify(exec); // exec を async/await で使えるようにする

export const gitClone = defineTool({
  name: "gitClone",
  description: "指定されたリポジトリURLからgit cloneを実行します。",
  // 入力パラメータの型定義 (例)
  inputSchema: {
    type: "object",
    properties: {
      repoUrl: { type: "string", description: "クローンするリポジトリのURL" },
      targetDirectory: { type: "string", description: "クローン先のディレクトリ名 (オプション)", optional: true },
    },
    required: ["repoUrl"],
  },
  // 実行される関数
  func: async ({ repoUrl, targetDirectory }) => {
    try {
      const command = targetDirectory ? `git clone ${repoUrl} ${targetDirectory}` : `git clone ${repoUrl}`;
      console.log(`Executing: ${command}`); // 実行コマンドをログに出力
      const { stdout, stderr } = await execAsync(command);
      if (stderr) {
        console.error(`git clone stderr: ${stderr}`);
        // 必要に応じてエラー処理を追加
      }
      console.log(`git clone stdout: ${stdout}`);
      return `リポジトリ ${repoUrl} のクローンに成功しました。`;
    } catch (error) {
      console.error(`git clone failed for ${repoUrl}:`, error);
      // より詳細なエラー情報を返すか、例外を再スローする
      return `リポジトリ ${repoUrl} のクローン中にエラーが発生しました: ${error.message}`;
    }
  },
});

// 他に必要なツール (ファイル書き込み、ビルド、テスト実行など) も同様に定義していきます。
// 例: writeFile ツール
// export const writeFile = defineTool({ ... });