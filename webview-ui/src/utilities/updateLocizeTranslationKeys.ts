import locize from "../config/locize/export";
// import fetch from "cross-fetch";
import { vscode } from "./vscode";

export type UpdateLocizeTranslationKeys = {
  json: {
    [key: string]: { [key: string]: string };
  };
  environment: string;
  locale: string;
  translationNamespace: string;
};

export const updateLocizeTranslationKeys = async ({
  json,
  environment,
  locale,
  translationNamespace,
}: UpdateLocizeTranslationKeys) => {
  const url = `${locize.baseUrl}/${locize.projectId}/${environment}/${locale}/${translationNamespace}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${locize.apiKey}`,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(json[locale]),
  });

  if (response.status === 401) {
    vscode.postMessage({
      command: "toast",
      text: `Unauthorized: Please check your API key.`,
    });
  }

  if (!response.ok || response.status === 412) {
    vscode.postMessage({
      command: "toast",
      text: `Error: Unnecessary Request: Nothing changed!`,
    });

    return;
  }

  return response.json();
};
