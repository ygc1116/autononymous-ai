"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planner = void 0;
var core_1 = require("@mastra/core");
var openai_1 = require("@ai-sdk/openai");
exports.planner = new core_1.Agent({
    name: "Planner",
    instructions: "\n    \u4EE5\u4E0B\u306E\u4ED5\u69D8\u3092\u3082\u3068\u306B\u3001\u5B9F\u88C5\u30B9\u30C6\u30C3\u30D7\u3092\u6BB5\u968E\u7684\u306B\u5217\u6319\u3057\u3066\u304F\u3060\u3055\u3044\u3002\n    \u4F8B: 1. \u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u521D\u671F\u5316\u30012. \u30EB\u30FC\u30C6\u30A3\u30F3\u30B0\u8A2D\u5B9A ...\n  ",
    model: (0, openai_1.openai)("gpt-4o"), // 使用するモデルを指定します。環境変数などでAPIキー設定が必要です。
});
