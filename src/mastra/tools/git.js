"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitClone = void 0;
var core_1 = require("@mastra/core");
var child_process_1 = require("child_process"); // Node.js の標準モジュールを使用
var util_1 = require("util"); // exec を Promise 化するために使用
var execAsync = (0, util_1.promisify)(child_process_1.exec); // exec を async/await で使えるようにする
exports.gitClone = (0, core_1.defineTool)({
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
    func: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var command, _c, stdout, stderr, error_1;
        var repoUrl = _b.repoUrl, targetDirectory = _b.targetDirectory;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    command = targetDirectory ? "git clone ".concat(repoUrl, " ").concat(targetDirectory) : "git clone ".concat(repoUrl);
                    console.log("Executing: ".concat(command)); // 実行コマンドをログに出力
                    return [4 /*yield*/, execAsync(command)];
                case 1:
                    _c = _d.sent(), stdout = _c.stdout, stderr = _c.stderr;
                    if (stderr) {
                        console.error("git clone stderr: ".concat(stderr));
                        // 必要に応じてエラー処理を追加
                    }
                    console.log("git clone stdout: ".concat(stdout));
                    return [2 /*return*/, "\u30EA\u30DD\u30B8\u30C8\u30EA ".concat(repoUrl, " \u306E\u30AF\u30ED\u30FC\u30F3\u306B\u6210\u529F\u3057\u307E\u3057\u305F\u3002")];
                case 2:
                    error_1 = _d.sent();
                    console.error("git clone failed for ".concat(repoUrl, ":"), error_1);
                    // より詳細なエラー情報を返すか、例外を再スローする
                    return [2 /*return*/, "\u30EA\u30DD\u30B8\u30C8\u30EA ".concat(repoUrl, " \u306E\u30AF\u30ED\u30FC\u30F3\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F: ").concat(error_1.message)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
});
// 他に必要なツール (ファイル書き込み、ビルド、テスト実行など) も同様に定義していきます。
// 例: writeFile ツール
// export const writeFile = defineTool({ ... });
