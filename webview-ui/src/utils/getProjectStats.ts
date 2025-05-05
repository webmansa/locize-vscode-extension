import locize from '../config/locize/export';
import { get } from './apiClient';

export const getProjectStats = async () => {
    const response = await get(
      `/stats/project/${locize.projectId}`
    );

    return response;
}