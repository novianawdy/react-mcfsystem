import * as React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
// import logo from "../../assets/images/logo.svg";
import "./UserLayout.css";
import SelectLang from "../../components/SelectLang";
import action from "../../redux/dashApp/action";
import { connect } from "react-redux";
import { compose } from "redux";
import setting from "../../settings/setting";
import Logo from "../../assets/images/mcfsystem-transparent.png";

const { changeLanguage } = action;

type UserLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  changeLanguage?: (languageId: string) => void;
};

const UserLayout: React.SFC<UserLayoutProps> = props => {
  const { title, description, children, changeLanguage } = props;
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description ? description : title} />
      </Helmet>

      <div className="container">
        <div className="lang">
          <SelectLang
            onClick={param =>
              changeLanguage ? changeLanguage(param.key) : param
            }
          />
        </div>
        <div className="content">
          <div className="top">
            <div className="logo">
              <img src={Logo} alt="MCFSystem" />
            </div>
            <div className="header">
              <Link to="/" style={{ textDecoration: "none" }}>
                {/* <img alt="logo" className="logo" src={logo} /> */}
                <span className="title">{setting.appName}</span>
              </Link>
            </div>
            <div className="desc">{setting.appDescription}</div>
          </div>
          {children}
        </div>
        <div className="bottom">
          <span className="footer">{setting.footer}</span>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  changeLanguage
};

export default compose(connect(null, mapDispatchToProps))(UserLayout);
