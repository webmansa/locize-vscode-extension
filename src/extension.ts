import { commands, ExtensionContext } from "vscode";
import { LocizeAutomationPanel } from "./panels/LocizeAutomationPanel";

export function activate(context: ExtensionContext) {
  const showLocizeAutomationCommand = commands.registerCommand("locize-automation", () => {
    LocizeAutomationPanel.render(context.extensionUri);
  });

  // Add command to the extension context
  context.subscriptions.push(showLocizeAutomationCommand);
}
