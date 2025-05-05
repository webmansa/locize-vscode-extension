import locize from "../config/locize/export";
import { get } from "./apiClient";

export const getAvailableLanguages = async () => { 

    const response = await get(`/languages/${locize.projectId}`);

    return response;
}