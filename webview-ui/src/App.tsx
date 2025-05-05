import { VSCodeButton, VSCodeDivider, VSCodeDropdown, VSCodeLink, VSCodeOption, VSCodeTag, VSCodeTextArea, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";
import "./App.css";
import locize from "./config/locize/export";
import { mapTranslationRequest } from "./utils/mapTranslationRequests";
import { vscode } from "./utils/vscode";
import { getAvailableLanguages } from "./utils/getAvailableLanguages";
import { getProjectStats } from "./utils/getProjectStats";
import { useEffect, useState } from "react";
import { Modal } from "./components/Modal";

export type TranslationObjectInterface = Array<{ [key: string]: { [key: string]: string } }>

function App() {

  const [locizeState, setLocizeState] = useState<{
    versions: string[];
    languages: string[];
    namespaces: string[];
  }>({ versions: [], languages: [], namespaces: [] });

  // State for VS Code config
  const [config, setConfig] = useState<{ apikey?: string; projectId?: string }>({})

  const handlePersistentConfig = (config: { apikey?: string; projectId?: string }) => {
    setConfig(config);
    if (config.apikey && config.projectId) {
      locize.apiKey = config.apikey;
      locize.projectId = config.projectId;

      // Persist config to local storage
      localStorage.setItem('locizeConfig', JSON.stringify(config));

      vscode.postMessage({
        command: 'toast',
        text: `Config updated and saved: ${JSON.stringify(config)}`,
      });
    }
  }

  async function handleTranslation() {

    const form = document.getElementById("form");

    if (form instanceof HTMLFormElement) {
      const formData = new FormData(form);

      const namespace = formData.get('namespace') as string;
      const version = formData.get('version') as string || locize.version;

      const translationKey = formData.get('translation-key') as string;
      const translationContent = formData.get('translation-content') as string;

      const translationObjects = locizeState.languages.map((language) => {
        const translationContentArray = translationContent.split('\n');
        return {
          [language]: {
            [translationKey]: translationContentArray[locizeState.languages.indexOf(language)] || ''
          }
        }
      })

      console.log('translationObjects', translationObjects);

      await Promise.all(mapTranslationRequest(locizeState.languages, translationObjects, { version, namespace }));


      if (!translationKey) {
        vscode.postMessage({
          command: 'toast',
          text: 'Please provide a translation key 😢',
        });
        return;
      }
    }
  }

  useEffect(() => {
    // need to improve on this, seems its making too many requests
    Promise.all([getProjectStats(), getAvailableLanguages()]).then((results) => {
      const [projectStats, availableLanguages] = results;

      const stats = projectStats['latest']
      const namespaces = Object.keys(stats[Object.keys(availableLanguages)[0]])

      setLocizeState({
        versions: Object.keys(projectStats),
        languages: Object.keys(availableLanguages),
        namespaces
      });

    }).catch((error) => {
      vscode.postMessage({
        command: 'toast',
        text: 'Error fetching project stats 😢',
      });
      console.error('Error fetching project stats:', error);
    });
  }, [locize.apiKey, locize.projectId]);

  // Fetch config from local storage on component mount
  useEffect(() => {
    const storedConfig = localStorage.getItem("locizeConfig");
    if (storedConfig) {
      const parsedConfig = JSON.parse(storedConfig);
      setConfig(parsedConfig);

      // Update locize configuration
      if (parsedConfig.apikey) locize.apiKey = parsedConfig.apikey;
      if (parsedConfig.projectId) locize.projectId = parsedConfig.projectId;

      vscode.postMessage({
        command: "toast",
        text: "Config loaded from local storage",
      });
    }
  }, []);

  console.log(locize, 'locizeState');

  return (
    <main className="max-w-[600px] w-full m-auto">
      <section className="p-4 w-full">
        <h2 className="text-center">Un-official VS-Code locize translation</h2>

        <Modal handlePersistentConfig={handlePersistentConfig} />

        <VSCodeDivider role="separator" />

        <form id="form">
          <div className="dropdown-container mt-5 grid grid-cols-2 items-center gap-4">
            <VSCodeTag>versions:</VSCodeTag>

            {/* be careful with the namespace, it is case sensitive and should be exactly the same as in the locize project. */}
            <VSCodeDropdown id="version" name="version">
              {
                locizeState.versions.map((version) => (
                  <VSCodeOption key={version} value={version}>
                    {version}
                  </VSCodeOption>
                ))
              }
            </VSCodeDropdown>
          </div>

          <div className="dropdown-container mt-5 grid grid-cols-2 items-center gap-4">
            <VSCodeTag>namespaces:</VSCodeTag>

            <VSCodeDropdown id="namespace" name="namespace">
              {
                locizeState.namespaces.map((namespace) => (
                  <VSCodeOption key={namespace} value={namespace}>
                    {namespace}
                  </VSCodeOption>
                ))
              }
            </VSCodeDropdown>
          </div>

          <div className="flex items-center mt-5 gap-5">
            <VSCodeTextField placeholder="key" name="translation-key" className="w-full" />
          </div>

          <p className="py-2 italic font-bold text-xs">Pls let your default language be the first line </p>
          <div className="flex flex-col items-center gap-2">
            <VSCodeTextArea placeholder="content" name="translation-content" rows={10} className="w-full" />
          </div>

          <>
            <span className="italic text-xs font-bold">Example:</span> <br />

            <div className="p-4 mt-2 text-sm" style={{ backgroundColor: '#f1c40f' }}>
              {
                locizeState.languages.map((language) => (
                  <span key={language} className="flex italic text-shadow-blue-300">this is the <b className="mx-1">{language}</b> sentence</span>
                ))
              }
            </div>

            <p className="text-sm py-2">If you like my project you can support me on PayPal <VSCodeLink href="https://paypal.me/sesayumar?country.x=AE&locale.x=en_US">click here</VSCodeLink></p>


            {/* <label htmlFor="" className="my-2 font-bold flex">Bonus</label>
            <div className="flex gap-3 items-center">
              <VSCodeTag>Auto-Translate with Google Translation API</VSCodeTag>
              <VSCodeTextField name="api-key" placeholder="api key" />
            </div>

            <VSCodeLink href="https://cloud.google.com/translate/docs/reference/rest">You can create your own key </VSCodeLink>

            <br /><br />

            *Fun Tip:
            <p>
              When there is an omission of any text, the english default text get automatically translated using the <VSCodeLink href="https://cloud.google.com/translate/docs/reference/rest"> cloud translation api.</VSCodeLink>
            </p> */}
          </>

          <div className="flex justify-center mt-5">
            <VSCodeButton onClick={handleTranslation}>Submit</VSCodeButton>
          </div>
        </form>

      </section>
    </main>
  );
}

export default App;
