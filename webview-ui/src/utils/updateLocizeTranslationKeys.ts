import locize from "../config/locize/export";
import { post } from "./apiClient";

export type UpdateLocizeTranslationKeys = {
  json: {
    [key: string]: { [key: string]: string };
  };
  version: string;
  locale: string;
  namespace: string;
};

export const updateLocizeTranslationKeys = async ({
  json,
  version,
  locale,
  namespace,
}: UpdateLocizeTranslationKeys) => {
  const url = `/update/${locize.projectId}/${version}/${locale}/${namespace}`;
  const response = await post(url, json[locale]);

  return response;
};
