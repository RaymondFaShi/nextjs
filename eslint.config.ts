import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig( [
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    globalIgnores( [
    // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ] ),

    {
        rules: {
        /* 杂项 */
            "max-len": [ "warn", { "code": 999999999, "comments": 999999999 } ], // 一行的最大长度

            /* 空格 */
            // "indent": [ "warn", "tab" ], // 缩进默认空格数
            "indent": [ "warn", 4, { SwitchCase: 1 } ], // 缩进默认空格数
            // "keyword-spacing" : [ "warn", { "before" : true, "after" : true } ], // 关键字左右空格
            "no-mixed-spaces-and-tabs" : [ "warn" ], // 禁止tab和空格混合缩进
            "no-trailing-spaces": [ "warn", { skipBlankLines: false } ], // 禁止行尾空格
            "object-curly-spacing": [ "warn", "always" ], // 大括号开始结束需要有空格
            "array-bracket-spacing": [ "warn", "always" ], // 开括号开始结束需要有空格
            "block-spacing": [ "warn", "always" ], // 强制开括号开始结束有空格
            "comma-spacing": [ "warn", { before: false, after: true } ], // 强制逗号后使用空格
            "computed-property-spacing": [ "warn", "always" ], // 属性开括号开始结束有空格
            "func-call-spacing": [ "warn" ], // 禁止函数名和括号中间有空格
            "space-before-blocks": [ "warn" ], // 强制语句块之前有空格
            "space-infix-ops": [ "off", { int32Hint: false } ], // 运算符前后有空格
            "space-in-parens": [ "warn", "always" ], // 强制括号内开始结束空格
            "spaced-comment": [ "warn", "always", { block: { balanced: true } } ], // 注释前后空格
            "switch-colon-spacing": [ "warn", { before: false, after: true } ], // switch冒号前后空格
            "arrow-spacing": [ "warn", { before: true, after: true } ], // 箭头前后空格

            /* 换行 */
            "object-curly-newline": [ "warn", { multiline: true, consistent: true } ], // 花括号内换行
            // "array-bracket-newline" : [ "warn", "always" ], // 开括号内换行
            "newline-per-chained-call": [ "warn", { ignoreChainWithDepth: 1 } ], // 链式操作换行
            "function-paren-newline": [ "warn" ], // 方法括号内换行
            "multiline-ternary": [ "warn", "never" ], // 允许三元表达式的操作数用换行符分隔

            /* vue */
            // "vue/html-indent" : [ "warn", 4 ], //html缩进
            // "vue/script-indent" : [ "warn", 4 ],   //script缩进
            // "vue/name-property-casing" : "off", //禁止强制驼峰命名
            // "vue/component-definition-name-casing" : "off", //禁止强制驼峰命名
            // "vue/max-attributes-per-line" : [ "warn", { "singleline" : 6, "multiline" : { "max" : 1, "allowFirstLine" : false } } ], //html标签换行

            /* 引入 */
            // "no-duplicate-imports": [ "warn", { includeExports: true } ], // 花括号内换行
            // "import/extensions": [ "warn", "never" ],
            // "import/no-extraneous-dependencies": [ "warn", { "devDependencies": true } ],
            "import/no-unresolved": [ "off" ],
            "no-undef": [ "off" ],

            /* jsx */
            // "no-unused-expressions": [ "warn", { "enforceForJSX": true } ],

        // prettier
        // "prettier/prettier": [ "warn" ],
        },
    }
] );

export default eslintConfig;
