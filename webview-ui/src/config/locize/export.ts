interface Config {
  projectId?: string;
  apiKey?: string;
}

let config: Config = {};

// Getter to access the current config safely
const getLocizeConfig = (): Required<Config> => ({
  projectId: config.projectId || '',
  apiKey: config.apiKey || '' ,
});

const locize = {
  baseUrl: "https://api.locize.app",
  version: "latest", // default version
  get projectId() {
    return getLocizeConfig().projectId;
  },
  get apiKey() {
    return getLocizeConfig().apiKey;
  },
  set apiKey(value: string | undefined) {
    config.apiKey = value;
  },
  set projectId(value: string | undefined) {
    config.projectId = value;
  },
};

export default locize;
