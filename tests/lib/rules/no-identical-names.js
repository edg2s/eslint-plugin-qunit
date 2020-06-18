"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-identical-names"),
    RuleTester = require("eslint").RuleTester,
    outdent = require("outdent");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-identical-title", rule, {

    valid: [
        outdent`
            module("module");
            test("test", function() {});
        `,
        outdent`
            module("module1");
            test("it1", function() {});
            test("it2", function() {});
        `,
        outdent`
            test("it1", function() {});
            test("it2", function() {});
        `,
        outdent`
            module("title", function() {});
            test("title", function() {});
        `,
        outdent`
            module("module1");
            test("it1", function() {});
            module("module2");
            test("it1", function() {});
        `,
        outdent`
            module("module1");
            module("module2");
        `,
        outdent`
            test("test" + n, function() {});
            test("test" + n, function() {});
        `,
        outdent`
            module("module1", function() {
              test("it1", function() {});
              test("it2", function() {});
            });
            module("module2", function() {
              test("it1", function() {});
              test("it2", function() {});
            });
        `,
        {
            code: outdent `
                test(\`it$\{n\}\`, function() {});
                test(\`it$\{n\}\`, function() {});
            `,
            parserOptions: {
                ecmaVersion: 6
            }
        }
    ],

    invalid: [
        {
            code: outdent `
                module("module1");
                test("it1", function() {});
                test("it1", function() {});
            `,
            errors: [{
                messageId: "duplicateTest",
                data: {
                    line: 2
                },
                column: 6,
                line: 3
            }]
        },
        {
            code: outdent `
                test("it1", function() {});
                test("it1", function() {});
            `,
            errors: [{
                messageId: "duplicateTest",
                data: {
                    line: 1
                },
                column: 6,
                line: 2
            }]
        },
        {
            code: outdent `
                module("module1", function() {
                  test("it1", function() {});
                  test("it1", function() {});
                });
            `,
            errors: [{
                messageId: "duplicateTest",
                data: {
                    line: 2
                },
                column: 8,
                line: 3
            }]
        },
        {
            code: outdent `
                module("module1");
                module("module1");
            `,
            errors: [{
                messageId: "duplicateModule",
                data: {
                    line: 1
                },
                column: 8,
                line: 2
            }]
        },
        {
            code: outdent `
                module("module1");
                test("it", function() {});
                module("module1");
            `,
            errors: [{
                messageId: "duplicateModule",
                data: {
                    line: 1
                },
                column: 8,
                line: 3
            }]
        }
    ]
});
