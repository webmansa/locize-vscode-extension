"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode_1 = require("vscode");
const LocizeAutomationPanel_1 = require("./panels/LocizeAutomationPanel");
function activate(context) {
    const showLocizeAutomationCommand = vscode_1.commands.registerCommand("locize-automation", () => {
        LocizeAutomationPanel_1.LocizeAutomationPanel.render(context.extensionUri);
    });
    // Add command to the extension context
    context.subscriptions.push(showLocizeAutomationCommand);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map