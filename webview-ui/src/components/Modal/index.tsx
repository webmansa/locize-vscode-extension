import * as Dialog from "@radix-ui/react-dialog";
import { VSCodeButton, VSCodeTag, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";
import { useState } from "react";
import { TConfig } from "../../App";
import locize from "../../config/locize/export";

interface ModalProps {
    handlePersistentConfig: (config: { apikey?: string; projectId?: string }) => void;
}

export const Modal: React.FC<ModalProps> = ({ handlePersistentConfig }) => {
    // to be refactored later
    const [open, setOpen] = useState(false);
    const [config, setConfig] = useState<{ apikey?: string; projectId?: string }>({})

    const hasDefaultConfig = locize?.projectId && locize?.apiKey;

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <VSCodeButton>{hasDefaultConfig ? 'Update Locize Config' : 'Set Locize Config' }</VSCodeButton>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md p-6 bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2">
                    <VSCodeTag>Settings Configuration</VSCodeTag>
                    <Dialog.Description className="mt-2 text-sm text-gray-600">
                        Enter your Locize API config settings.
                    </Dialog.Description>
                    <div className="my-4 flex w-full">
                        <div className="flex w-full">
                            <VSCodeTextField placeholder="api key" name="apiKey" className="flex" onChange={(e) => setConfig({
                                ...config,
                                apikey: (e.target as HTMLInputElement)?.value || ''
                            })} />
                        </div>
                        <div className="flex w-full">
                            <VSCodeTextField placeholder="project id" name="projectId" className="flex" onChange={(e) => setConfig({
                                ...config,
                                projectId: (e.target as HTMLInputElement)?.value || ''
                            })} />  
                        </div>
                    </div>

                    <div className="flex gap-4  justify-center">
                        <Dialog.Close asChild>
                            <VSCodeButton>Close</VSCodeButton>
                        </Dialog.Close>

                        <VSCodeButton onClick={() => {
                            handlePersistentConfig(config);
                            setOpen(false);
                        }}>Submit</VSCodeButton>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}