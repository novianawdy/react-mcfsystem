import * as React from "react";
import { Dropdown, Menu, Icon, Avatar, Button, Typography } from "antd";
import { getCurrentLanguage } from "../../settings/language";
import { store } from "../../redux/store";
import setting from "../../settings/setting";
import ukFlag from "../../assets/images/uk-flag.svg";
import styled from "styled-components";
import getLang from "../../lib/getLang";

type ClickParam = {
  key: string;
  keyPath?: Array<string>;
  item?: any;
  domEvent?: Event;
};

interface SelectLangProps {
  onClick: (param: ClickParam) => void;
  mode?: "pages" | "app" | "button";
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

    let renderChild;
    switch (mode) {
      case "pages":
        renderChild = (
          <Dropdown
            placement="bottomRight"
            overlay={langMenu}
            trigger={["click"]}
          >
            <Icon type="global" title="Bahasa" style={{ cursor: "pointer" }} />
          </Dropdown>
        );
        break;
      case "app":
        renderChild = (
          <Dropdown
            placement="bottomRight"
            overlay={langMenu}
            trigger={["click"]}
          >
            <AvaWrapper>
              <Avatar src={ukFlag} size="small" shape="square" />
            </AvaWrapper>
          </Dropdown>
        );
        break;
      case "button":
        renderChild = (
          <>
            <div style={{ marginBottom: 10 }}>
              <Typography.Text>{getLang({ id: "language" })}</Typography.Text>
            </div>
            <div style={{ display: "flex" }}>
              {locales.map(locale => (
                <ButtonWrapper key={locale}>
                  <Button
                    disabled={selectedLang === locale}
                    onClick={() => {
                      this.setState({ selectedLang: locale });
                      localStorage.setItem("language", locale);
                      return onClick ? onClick({ key: locale }) : locale;
                    }}
                  >
                    {locale}
                  </Button>
                </ButtonWrapper>
              ))}
            </div>
          </>
        );
        break;
      default:
        renderChild = (
          <Dropdown
            placement="bottomRight"
            overlay={langMenu}
            trigger={["click"]}
          >
            <Icon type="global" title="Bahasa" style={{ cursor: "pointer" }} />
          </Dropdown>
        );
        break;
    }
    return renderChild;
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

const ButtonWrapper = styled.div`
  margin-right: 10px;
`;

export default SelectLang;
