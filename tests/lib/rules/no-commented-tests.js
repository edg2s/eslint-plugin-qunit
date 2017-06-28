/**
 * @fileoverview Ensure that no unit test is commented out.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-commented-tests"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-commented-tests", rule, {

    valid: [
        "QUnit.skip('Name', function () { ok(true); });",

        // shebang comments
        "#!/some-test()",

        // Not actually a commented test
        "// TODO: Add test (ASAP)",
        "// TODO: Add test (foo bar)",
        "// TODO: Add test (unterminated-paren",
        "// TODO: Add test ('unterminated quote)",
        "// TODO: refactor with a Component test (instead of an Acceptance test)"
    ],

    invalid: [
        // Single-line comments
        {
            code: "// test('Name', function () { ok(true); });",
            errors: [
                {
                    message: "Unexpected \"test\" in comment. Use QUnit.skip outside of a comment.",
                    line: 1,
                    column: 4
                }
            ]
        },
        {
            code: "// asyncTest('Name', function () { ok(true); });",
            errors: [
                {
                    message: "Unexpected \"asyncTest\" in comment. Use QUnit.skip outside of a comment.",
                    line: 1,
                    column: 4
                }
            ]
        },
        {
            code: "// QUnit.test('Name', function () { ok(true); });",
            errors: [
                {
                    message: "Unexpected \"QUnit.test\" in comment. Use QUnit.skip outside of a comment.",
                    line: 1,
                    column: 4
                }
            ]
        },
        {
            code: "// QUnit.asyncTest('Name', function () { ok(true); });",
            errors: [
                {
                    message: "Unexpected \"QUnit.asyncTest\" in comment. Use QUnit.skip outside of a comment.",
                    line: 1,
                    column: 4
                }
            ]
        },
        {
            code: "// QUnit.skip('Name', function () { ok(true); });",
            errors: [
                {
                    message: "Unexpected \"QUnit.skip\" in comment. Use QUnit.skip outside of a comment.",
                    line: 1,
                    column: 4
                }
            ]
        },

        // Single-line block comments
        {
            code: "/* test('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"test\" in comment. Use QUnit.skip outside of a comment.",
                    line: 1,
                    column: 4
                }
            ]
        },
        {
            code: "/* asyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"asyncTest\" in comment. Use QUnit.skip outside of a comment.",
                    line: 1,
                    column: 4
                }
            ]
        },
        {
            code: "/* QUnit.test('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"QUnit.test\" in comment. Use QUnit.skip outside of a comment.",
                    line: 1,
                    column: 4
                }
            ]
        },
        {
            code: "/* QUnit.asyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"QUnit.asyncTest\" in comment. Use QUnit.skip outside of a comment.",
                    line: 1,
                    column: 4
                }
            ]
        },
        {
            code: "/* QUnit.skip('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"QUnit.skip\" in comment. Use QUnit.skip outside of a comment.",
                    line: 1,
                    column: 4
                }
            ]
        },

        // Block comments with line offset (\n)
        {
            code: "/**\n\ttest('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"test\" in comment. Use QUnit.skip outside of a comment.",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "/**\n\tasyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"asyncTest\" in comment. Use QUnit.skip outside of a comment.",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "/**\n\tQUnit.test('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"QUnit.test\" in comment. Use QUnit.skip outside of a comment.",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "/**\n\tQUnit.asyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"QUnit.asyncTest\" in comment. Use QUnit.skip outside of a comment.",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "/**\n\tQUnit.skip('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"QUnit.skip\" in comment. Use QUnit.skip outside of a comment.",
                    line: 2,
                    column: 2
                }
            ]
        },

        // Block comments with line offset (\r)
        {
            code: "/**\r\ttest('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"test\" in comment. Use QUnit.skip outside of a comment.",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "/**\r\tasyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"asyncTest\" in comment. Use QUnit.skip outside of a comment.",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "/**\r\tQUnit.test('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"QUnit.test\" in comment. Use QUnit.skip outside of a comment.",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "/**\r\tQUnit.asyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"QUnit.asyncTest\" in comment. Use QUnit.skip outside of a comment.",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "/**\r\tQUnit.skip('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"QUnit.skip\" in comment. Use QUnit.skip outside of a comment.",
                    line: 2,
                    column: 2
                }
            ]
        },

        // Block comments with line offset (\r\n)
        {
            code: "/**\r\n\ttest('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"test\" in comment. Use QUnit.skip outside of a comment.",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "/**\r\n\tasyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"asyncTest\" in comment. Use QUnit.skip outside of a comment.",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "/**\r\n\tQUnit.test('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"QUnit.test\" in comment. Use QUnit.skip outside of a comment.",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "/**\r\n\tQUnit.asyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"QUnit.asyncTest\" in comment. Use QUnit.skip outside of a comment.",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "/**\r\n\tQUnit.skip('Name', function () { ok(true); }); */",
            errors: [
                {
                    message: "Unexpected \"QUnit.skip\" in comment. Use QUnit.skip outside of a comment.",
                    line: 2,
                    column: 2
                }
            ]
        },

        // Not actually tests, but look too suspicious
        {
            code: "// Using backticks: test (`test`)",
            errors: [
                {
                    message: "Unexpected \"test\" in comment. Use QUnit.skip outside of a comment.",
                    line: 1,
                    column: 21
                }
            ]
        },
        {
            code: "// Using single quotes: test ('test')",
            errors: [
                {
                    message: "Unexpected \"test\" in comment. Use QUnit.skip outside of a comment.",
                    line: 1,
                    column: 25
                }
            ]
        },
        {
            code: "// Using double quotes: test (\"test\")",
            errors: [
                {
                    message: "Unexpected \"test\" in comment. Use QUnit.skip outside of a comment.",
                    line: 1,
                    column: 25
                }
            ]
        },
        {
            code: "// Possible multiple args?: test (foo, bar)",
            errors: [
                {
                    message: "Unexpected \"test\" in comment. Use QUnit.skip outside of a comment.",
                    line: 1,
                    column: 29
                }
            ]
        }
    ]

});
