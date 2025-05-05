import * as vscode from "vscode"; // Use standard 'vscode' import
import { LocizeAutomationPanel } from "./panels/LocizeAutomationPanel";

console.log("Locize Automation Extension is activated!");

export function activate(context: vscode.ExtensionContext) {
  const showLocizeAutomationCommand = vscode.commands.registerCommand(
    "locize-automation",
    () => {
      // Read config when the command is executed
      const config = vscode.workspace.getConfiguration("locizePilot");
      // Use type assertion and provide default empty string if undefined
      const projectId = config.get<string>("projectId") ?? "";
      const apiKey = config.get<string>("apiKey") ?? "";


      if (!config) {
        vscode.window.showWarningMessage(
          "config is not defined. Please check your settings."
        );
        return;
      }

      // Check if settings are configured
      if (!projectId || !apiKey) {
        vscode.window.showWarningMessage(
          "Locize Project ID or API Key is not configured. Please set them in VS Code settings under 'Locize Pilot'."
        );
        // Optionally, open settings for the user
        // vscode.commands.executeCommand('workbench.action.openSettings', 'locizePilot');
        return; // Don't open the panel if config is missing
      }

      // Render the panel
      LocizeAutomationPanel.render(context.extensionUri);

      // Send config to the panel *after* it might have been created.
      // This assumes LocizeAutomationPanel manages its instance, e.g., via LocizeAutomationPanel.currentPanel
      // A more robust way is for the webview to request the config after it loads.
       setTimeout(() => { // Use setTimeout to allow panel rendering cycle to complete
          if (LocizeAutomationPanel.currentPanel) {
             console.log("Sending config to Webview Panel:", { projectId, apiKey });
             LocizeAutomationPanel.currentPanel.postMessage({ // Use the new public method
               type: "config",
               data: {
                 projectId: projectId,
               apiKey: apiKey,
             },
           });
          } else {
            
            console.warn("Could not send config: LocizeAutomationPanel.currentPanel is not available.");
            // Consider having the webview request the config upon loading instead.
        }
      }, 100); // Small delay
    }
  );

  // Add command to the extension context
  context.subscriptions.push(showLocizeAutomationCommand);

  // Optional: Listen for configuration changes
  context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration('locizePilot.projectId') || e.affectsConfiguration('locizePilot.apiKey')) {
      console.log('Locize Pilot configuration changed.');
      // If the panel is open, you might want to resend the config
      if (LocizeAutomationPanel.currentPanel) {
        const updatedConfig = vscode.workspace.getConfiguration('locizePilot');
          const updatedProjectId = updatedConfig.get<string>('projectId') ?? "";
          const updatedApiKey = updatedConfig.get<string>('apiKey') ?? "";
          console.log("Resending updated config to Webview Panel.");
          LocizeAutomationPanel.currentPanel.postMessage({ // Use the new public method
            type: 'config',
            data: { projectId: updatedProjectId, apiKey: updatedApiKey },
          });
      }
    }
  }));
}

// Optional: Add deactivate function if needed
// export function deactivate() {}
