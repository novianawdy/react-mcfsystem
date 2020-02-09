import { store } from "../redux/store";
import AppLocale from "../languageProvider/AppLocale";
import { getCurrentLanguage } from "../settings/language";
import { getLocal, getSession } from "./helper";
import setting from "../settings/setting";

/**
 *
 * @param {Object} props
 * @param {String} props.id key kamus
 */
const getLang = (props = { id: null, values: null }) => {
  const { id, values } = props;
  const selectedLanguage =
    store.getState().auth && (getLocal("at") || getSession("at"))
      ? store.getState().auth.language
      : store.getState().dashApp
      ? store.getState().dashApp.language
      : undefined;
  const currentAppLocale =
    AppLocale[getCurrentLanguage(selectedLanguage || setting.language).locale];
  const { messages, locale } = currentAppLocale;

  if (!messages[id]) {
    console.error(`Key ${id} in language ${locale} not found`);
  }

  if (values) {
    let str = messages[id] ? messages[id] : id;

    Object.keys(values).map(
      key => (str = str.replace(`{${key}}`, values[key]))
    );
    return str;
  }
  return messages[id] ? messages[id] : id;
};

export default getLang;
