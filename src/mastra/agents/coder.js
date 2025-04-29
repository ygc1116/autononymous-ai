"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.CoderAgent = void 0;
var core_1 = require("@mastra/core");
var openai_1 = require("@ai-sdk/openai");
// ツール定義ファイルから、使用するツールをインポートします
var git_1 = require("../tools/git"); // 例: git.ts からインポート
// 他に必要なツールもインポートします
// import { writeFile } from "../tools/file";
// import { runNpmScript } from "../tools/npm";
var CoderAgent = /** @class */ (function (_super) {
    __extends(CoderAgent, _super);
    function CoderAgent() {
        return _super.call(this, {
            name: "Coder",
            instructions: "\n        \u3042\u306A\u305F\u306F\u30D7\u30ED\u306E\u30BD\u30D5\u30C8\u30A6\u30A7\u30A2\u30A8\u30F3\u30B8\u30CB\u30A2\u3067\u3059\u3002\n        \u4E0E\u3048\u3089\u308C\u305F\u5B9F\u88C5\u30B9\u30C6\u30C3\u30D7\u30EA\u30B9\u30C8\u306B\u57FA\u3065\u304D\u3001\u5404\u30B9\u30C6\u30C3\u30D7\u3092\u9806\u756A\u306B\u5B9F\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002\n        \u5FC5\u8981\u306A\u5834\u5408\u306F\u63D0\u4F9B\u3055\u308C\u3066\u3044\u308B\u30C4\u30FC\u30EB (gitClone, writeFile, runNpmScript \u306A\u3069) \u3092\u4F7F\u7528\u3057\u3066\u3001\u30B3\u30FC\u30C9\u751F\u6210\u3001\u30D5\u30A1\u30A4\u30EB\u66F8\u304D\u8FBC\u307F\u3001\u30B3\u30DE\u30F3\u30C9\u5B9F\u884C\u306A\u3069\u3092\u884C\u3063\u3066\u304F\u3060\u3055\u3044\u3002\n        \u5404\u30B9\u30C6\u30C3\u30D7\u306E\u5B9F\u884C\u7D50\u679C\u3092\u5831\u544A\u3057\u3066\u304F\u3060\u3055\u3044\u3002\n      ",
            // このエージェントが利用可能なツールをリストで指定します
            tools: [
                git_1.gitClone,
                // writeFile, // ファイル書き込みツール
                // runNpmScript, // npm スクリプト実行ツール
                // 他の定義済みツールを追加
            ],
            model: (0, openai_1.openai)("gpt-4o"), // コーディングに適したモデルを選択
        }) || this;
    }
    CoderAgent.prototype.generateCode = function (description) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Implement code generation logic here
                return [2 /*return*/, "// Generated React component: ".concat(description)];
            });
        });
    };
    return CoderAgent;
}(core_1.Agent));
exports.CoderAgent = CoderAgent;
