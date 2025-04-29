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
exports.devWorkflow = void 0;
var core_1 = require("@mastra/core");
var planner_1 = require("../agents/planner");
var coder_1 = require("../agents/coder");
// 仮のメモリコンポーネントをインポート (別途実装が必要)
// import { memory } from "../memory/vectorStore"; // 例: ベクトルストア連携
// --- 仮のメモリコンポーネントのダミー実装 ---
// 実際にはベクトルデータベース等に接続する実装が必要です
var memory = {
    retrieve: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var query = _b.query;
        return __generator(this, function (_c) {
            console.log("[Memory] Retrieving info for query: ".concat(query.substring(0, 50), "..."));
            // ダミーの応答: 本来はここでベクトル検索などを行う
            if (query.includes("認証")) {
                return [2 /*return*/, "過去のプロジェクトでは JWT (JSON Web Token) を使用しました。関連ライブラリ: jsonwebtoken, passport-jwt"];
            }
            return [2 /*return*/, "関連する記憶情報は見つかりませんでした。"];
        });
    }); }
};
// --- ダミー実装ここまで ---
exports.devWorkflow = new core_1.Workflow("dev")
    // NEW: 1. 'retrieve' ステップ: 記憶から関連情報を検索
    .step("retrieve", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var retrievedInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Retrieving relevant information from memory...");
                return [4 /*yield*/, memory.retrieve({ query: ctx.input.spec })];
            case 1:
                retrievedInfo = _a.sent();
                console.log("Retrieved information:", retrievedInfo);
                // 検索結果 (文字列または構造化データ) を返す
                return [2 /*return*/, retrievedInfo];
        }
    });
}); })
    // 2. 'plan' ステップ: 取得した情報を活用して計画 (変更あり)
    .step("plan", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var retrievedContext, plannerInstructions, planResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                retrievedContext = ctx.steps.retrieve.output;
                plannerInstructions = "\n\u4EE5\u4E0B\u306E\u4ED5\u69D8\u3068\u3001\u904E\u53BB\u306E\u95A2\u9023\u60C5\u5831\uFF08\u3082\u3057\u3042\u308C\u3070\uFF09\u306B\u57FA\u3065\u3044\u3066\u3001\u5B9F\u88C5\u30B9\u30C6\u30C3\u30D7\u3092\u6BB5\u968E\u7684\u306B\u5217\u6319\u3057\u3066\u304F\u3060\u3055\u3044\u3002\n\n# \u4ED5\u69D8:\n".concat(ctx.input.spec, "\n\n# \u904E\u53BB\u306E\u95A2\u9023\u60C5\u5831:\n").concat(retrievedContext || "特にありません。", "\n\n# \u51FA\u529B\u5F62\u5F0F\u306E\u4F8B:\n1. \u4F9D\u5B58\u95A2\u4FC2\u306E\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB (\u4F8B: npm install library)\n2. \u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u306E\u4F5C\u6210 (\u4F8B: config.ts)\n3. \u4E3B\u8981\u306A\u95A2\u6570\u306E\u5B9F\u88C5 (\u4F8B: src/main.ts \u306E main \u95A2\u6570)\n...");
                return [4 /*yield*/, planner_1.planner.generate([
                        { role: "user", content: plannerInstructions },
                    ])];
            case 1:
                planResult = _a.sent();
                return [2 /*return*/, planResult];
        }
    });
}); })
    // 3. 'execute' ステップ: (変更なし)
    .step("execute", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var coderAgent, codeResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                coderAgent = new coder_1.CoderAgent();
                return [4 /*yield*/, coderAgent.generateCode("\u4EE5\u4E0B\u306E\u30B9\u30C6\u30C3\u30D7\u3092\u5B9F\u884C\u3057\u3066\u304F\u3060\u3055\u3044:\n".concat(ctx.steps.plan.output))];
            case 1:
                codeResult = _a.sent();
                return [2 /*return*/, codeResult];
        }
    });
}); })
    .step("test", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var testResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Executing tests...");
                return [4 /*yield*/, testExecution.execute(ctx.steps.execute.output)];
            case 1:
                testResult = _a.sent();
                console.log("Test result:", testResult);
                return [2 /*return*/];
        }
    });
}); });
// ... (将来的な verify, deploy ステップ)
