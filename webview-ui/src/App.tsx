import { VSCodeButton, VSCodeDivider, VSCodeDropdown, VSCodeLink, VSCodeOption, VSCodeRadio, VSCodeRadioGroup, VSCodeTag, VSCodeTextArea, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";
import "./App.css";
import locize from "./config/locize/export";
import { translateWithCloudAPI } from "./utilities/translateWithCloudAPI";
import { mapTranslationRequest } from "./utilities/mapTranslationRequests";
import { vscode } from "./utilities/vscode";

export type TranslationObjectInterface = Array<{ [key: string]: { [key: string]: string } }>

function App() {

  async function handleTranslation() {

    const form = document.getElementById("form");

    if (form instanceof HTMLFormElement) {
      const formData = new FormData(form);

      const translationKey = formData.get('translation-key') as string;
      const translationContent = formData.get('translation-content') as string;
      const translationNamespace = formData.get('namespace') as string;
      const translationApiKey = formData.get('api-key') as string;
      const environment = formData.get('environment') as string || locize.version;

      const [english, german = '', turkish = ''] = translationContent.split('\n')

      let translationObjects: TranslationObjectInterface = [
        {
          'en-US': {
            [translationKey]: english
          }
        },
        {
          'de-DE': {
            [translationKey]: german
          }

        },
        {
          'tr-TR': {
            [translationKey]: turkish
          }

        }
      ]

      if (!translationKey) {
        vscode.postMessage({
          command: 'toast',
          text: 'Please provide a translation key 😢',
        });
        return;
      }

      if (translationApiKey) {
        const textToTranslate = english;

        const [germanTranslation, turkishTranslation] = await Promise.all(['de-DE', 'tr-TR'].map((item) => translateWithCloudAPI(textToTranslate, item.split('-')[0], 'en', translationApiKey)));

        translationObjects = [
          {
            'en-US': {
              [translationKey]: english
            }

          },
          {
            'de-DE': {
              [translationKey]: germanTranslation || ''
            }

          },
          {
            'tr-TR': {
              [translationKey]: turkishTranslation || ''
            }

          }
        ]
      }

      try {
        await Promise.all(mapTranslationRequest(translationObjects, { environment, translationNamespace }));
      } catch (error) {
        console.error('One or more updates failed:', error);
      }
    }
  }

  return (
    <main className="max-w-[600px] w-full m-auto">
      <section className="p-4">
        <h2 className="text-center">Un-official Kollex VS-Code locize translation</h2>

        <VSCodeDivider role="separator" />

        <form id="form">
          <div className="flex mt-5 gap-4 justify-center">
            <VSCodeRadioGroup className="flex justify-between">
              <VSCodeRadio name="environment" value="latest" defaultChecked>Latest</VSCodeRadio>
              <VSCodeRadio name="environment" value="staging">Staging</VSCodeRadio>
            </VSCodeRadioGroup>
          </div>

          <div className="dropdown-container mt-5 flex items-center gap-4">
            <VSCodeTag>namespace:</VSCodeTag>

            <VSCodeDropdown id="namespace" name="namespace">
              <VSCodeOption>umar-test-namespace</VSCodeOption>
              <VSCodeOption>Kollex Web App</VSCodeOption>
              <VSCodeOption>Kollex Mobile App</VSCodeOption>
              <VSCodeOption>Kollex BackOffice App</VSCodeOption>
              <VSCodeOption>Kollex Merchant Center</VSCodeOption>
            </VSCodeDropdown>
          </div>

          <div className="flex items-center mt-5 gap-5">
            <VSCodeTextField placeholder="key" name="translation-key" className="w-full" />
          </div>

          <div className="flex flex-col items-center mt-5 gap-2">
            <VSCodeTextArea placeholder="content" name="translation-content" rows={10} className="w-full" />
          </div>


          <>
            PS: <br />

            <p>You can put the translation text line by line, see below <br /></p>

            <div className="p-4 mt-2" style={{ backgroundColor: '#f1c40f' }}>
              <span className="flex italic text-shadow-blue-300">this is the english</span>
              <span className="flex italic text-shadow-blue-300">this is the german</span>
              <span className="flex italic text-shadow-blue-300">this is the turkish</span>
            </div>

            <label htmlFor="" className="mt-3 font-bold">Bonus</label>
            <div className="flex mt-2 gap-3 items-center">
              <VSCodeTag>Auto-Translate with Google Translation API</VSCodeTag>
              <VSCodeTextField name="api-key" placeholder="api key" />
            </div>

            <VSCodeLink href="https://cloud.google.com/translate/docs/reference/rest">You can create your own key </VSCodeLink>

            <br /><br />

            *Fun Tip:
            <p>
              When there is an omission of any text, the english default text get automatically translated using the <VSCodeLink href="https://cloud.google.com/translate/docs/reference/rest"> cloud translation api.</VSCodeLink>
            </p>
          </>

          <div className="flex justify-center mt-2">
            <VSCodeButton onClick={handleTranslation}>Submit</VSCodeButton>
          </div>
        </form>

      </section>
    </main>
  );
}

export default App;
