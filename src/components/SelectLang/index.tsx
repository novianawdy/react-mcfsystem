import * as React from "react";
import { Dropdown, Menu, Icon, Avatar } from "antd";
import { getCurrentLanguage } from "../../settings/language";
import { store } from "../../redux/store";
import setting from "../../settings/setting";
import ukFlag from "../../assets/images/uk-flag.svg";
import styled from "styled-components";

type ClickParam = {
  key: string;
  keyPath: Array<string>;
  item: any;
  domEvent: Event;
};

interface SelectLangProps {
  onClick: (param: ClickParam) => void;
  mode?: "pages" | "app";
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
      store.getState().dashApp.language || setting.language
    ).languageId;
    this.setState({ selectedLang });
  };
  render() {
    const { onClick, mode } = this.props;
    const { selectedLang } = this.state;
    const locales = ["ID", "EN"];

    type LangLabelsType = {
      [name: string]: string;
    };
    const languageLabels: LangLabelsType = {
      ID: "Indonesia",
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
          localStorage.setItem("language", param.key);
          return onClick ? onClick(param) : param;
        }}
        style={{ minWidth: 160, padding: "1rem 0px" }}
      >
        {locales.map(locale => (
          <Menu.Item key={locale} style={{ padding: "5px calc(10px + 1rem)" }}>
            <span role="img" aria-label={languageLabels[locale]}>
              {languageIcons[locale]}
            </span>{" "}
            {languageLabels[locale]}
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <Dropdown placement="bottomRight" overlay={langMenu} trigger={["click"]}>
        {mode === "pages" || !mode ? (
          <Icon type="global" title="Bahasa" style={{ cursor: "pointer" }} />
        ) : (
          <AvaWrapper>
            <Avatar src={ukFlag} size="small" shape="square" />
          </AvaWrapper>
        )}
      </Dropdown>
    );
  }
}

const AvaWrapper = styled.div`
  padding: 10px;
  display: initial;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #171622;
  }
`;

export default SelectLang;
