/**
 * @fileoverview Forbid setup/teardown module hooks
 * @author Kevin Partington
 * @copyright 2016 Kevin Partington. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

const utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid setup/teardown module hooks",
            category: "Possible Errors"
        },
        messages: {
            noSetupTeardown: "Use {{preferred}} instead of {{forbidden}}."
        },
        schema: []
    },

    create: function (context) {
        const replacements = {
            setup: "beforeEach",
            teardown: "afterEach"
        };

        function checkModuleHook(propertyNode) {
            if (replacements.hasOwnProperty(propertyNode.key.name)) {
                context.report({
                    node: propertyNode,
                    messageId: "noSetupTeardown",
                    data: {
                        forbidden: propertyNode.key.name,
                        preferred: replacements[propertyNode.key.name]
                    }
                });
            }
        }

        function isInModule(propertyNode) {
            return propertyNode &&
                propertyNode.parent &&          // ObjectExpression
                propertyNode.parent.parent &&   // CallExpression?
                propertyNode.parent.parent.type === "CallExpression" &&
                utils.isModule(propertyNode.parent.parent.callee);
        }

        return {
            "Property": function (node) {
                if (utils.isModuleHookPropertyKey(node.key) && isInModule(node)) {
                    checkModuleHook(node);
                }
            }
        };
    }
};
