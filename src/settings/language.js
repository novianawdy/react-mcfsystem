import setting from "./setting";

const config = {
  defaultLanguage: setting.language,
  options: [
    {
      languageId: "ID",
      locale: "id",
      text: "Bahasa Indonesia"
    },
    {
      languageId: "EN",
      locale: "en",
      text: "English"
    }
  ]
};

/**
 *
 * @param {String} lang languageID
 */
export const getCurrentLanguage = lang => {
  let selecetedLanguage = config.options[0];
  config.options.forEach(language => {
    if (language.languageId === lang) {
      selecetedLanguage = language;
    }
  });
  return selecetedLanguage;
};

export default config;
