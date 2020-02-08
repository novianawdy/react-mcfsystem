import * as React from "react";
import { Dropdown, Menu, Icon } from "antd";
import { getCurrentLanguage } from "../../settings/language";
import { store } from "../../redux/store";

type ClickParam = {
  key: string;
  keyPath: Array<string>;
  item: any;
  domEvent: Event;
};

interface SelectLangProps {
  onClick: (param: ClickParam) => void;
}
interface SelectLangState {
  selectedLang?: string;
}
class SelectLang extends React.Component<SelectLangProps, SelectLangState> {
  state = {
    selectedLang: ""
  };

  componentDidMount = () => {
    const selectedLang = getCurrentLanguage(
      store.getState().dashApp.language || "ID"
    ).languageId;
    this.setState({ selectedLang });
  };
  render() {
    const { onClick } = this.props;
    const { selectedLang } = this.state;
    const locales = ["ID", "EN"];

    type LangLabelsType = {
      [name: string]: string;
    };
    const languageLabels: LangLabelsType = {
      ID: "Bahasa Indonesia",
      EN: "English"
    };
    type LangLIconsType = {
      [name: string]: string;
    };
    const languageIcons: LangLIconsType = {
      ID: "🇮🇩",
      EN: "🇺🇸"
    };

    const langMenu = (
      <Menu
        selectedKeys={[selectedLang]}
        onClick={param => {
          this.setState({ selectedLang: param.key });
          return onClick ? onClick(param) : param;
        }}
        style={{ minWidth: 160 }}
      >
        {locales.map(locale => (
          <Menu.Item key={locale}>
            <span role="img" aria-label={languageLabels[locale]}>
              {languageIcons[locale]}
            </span>{" "}
            {languageLabels[locale]}
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <Dropdown placement="bottomRight" overlay={langMenu}>
        <Icon type="global" title="Bahasa" style={{ cursor: "pointer" }} />
      </Dropdown>
    );
  }
}

export default SelectLang;
