/**
 * @fileoverview Forbids use of QUnit.reset.
 * @author Kevin Partington
 * @copyright 2016 Kevin Partington. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid QUnit.reset",
            category: "Best Practices"
        },
        messages: {
            noReset: "Do not use QUnit.reset()."
        },
        schema: []
    },

    create: function (context) {
        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "CallExpression[callee.object.name='QUnit'][callee.property.name='reset']": function (node) {
                context.report({
                    node: node,
                    messageId: "noReset"
                });
            }
        };
    }
};
