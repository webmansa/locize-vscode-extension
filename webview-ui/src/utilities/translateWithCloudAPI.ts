import fetch from "cross-fetch";

const TRANSLATE_API_URL = "https://translation.googleapis.com/language/translate/v2";

interface TranslationResponse {
  data?: {
    translations?: {
      translatedText?: string;
    }[];
  };
  error?: {
    message: string;
  };
}

export const translateWithCloudAPI = async (
  text: string,
  targetLanguage: string,
  sourceLanguage: string,
  API_KEY: string
): Promise<string | null> => {
  try {
    const response = await fetch(`${TRANSLATE_API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
        source: sourceLanguage,
      }),
    });

    if (!response.ok) {
      const errorData: { error?: { message: string } } = await response.json();
      console.error(
        "Translation API Error:",
        errorData?.error?.message || `HTTP error! status: ${response.status}`
      );
      return null;
    }

    const responseData: TranslationResponse = await response.json();

    if (
      responseData &&
      responseData.data &&
      responseData.data.translations &&
      responseData.data.translations.length > 0
    ) {
      return responseData.data.translations[0].translatedText || null;
    } else if (responseData && responseData.error) {
      console.error("Translation API Error:", responseData.error.message);
      return null;
    } else {
      console.error("Unexpected response from Translation API:", responseData);
      return null;
    }
  } catch (error: any) {
    console.error("Error during translation:", error.message);
    return null;
  }
};
