const action = {
  CHANGE_LANG: "CHANGE_LANG",
  changeLanguage: language => ({
    type: action.CHANGE_LANG,
    language
  })
};

export default action;
