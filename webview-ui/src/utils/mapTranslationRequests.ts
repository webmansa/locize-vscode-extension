import { TranslationObjectInterface } from "../App";
import { updateLocizeTranslationKeys } from "./updateLocizeTranslationKeys";
import { vscode } from "./vscode";

export const mapTranslationRequest = (
  locales: string[],
  translationObjects: TranslationObjectInterface,
  { version, namespace }: { version: string; namespace: string }
) => {
  const requests = locales.map((locale) => {
    const json = translationObjects.find((item) => item[locale as keyof typeof item]);

    if (json) {
      // only send for keys with values
      if (Object.keys(json[locale]).toString().trim()) {
        updateLocizeTranslationKeys({
          json,
          version,
          locale,
          namespace,
        })
          .then(() => {
            vscode.postMessage({
              command: "toast",
              text: 'Updated translated key Successfully 😊',
            });
          })
          .catch((error) => {
            vscode.postMessage({
              command: "toast",
              text: `Error Updating Translation Keys 😢 ${JSON.stringify(error)}`,
            });
          });
      }
    } else {
      vscode.postMessage({
        command: "toast",
        text: 'No translation object found for locale',
      });
    }
  });

  return requests;
};
