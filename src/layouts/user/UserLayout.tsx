import * as React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import "./UserLayout.css";
import SelectLang from "../../components/SelectLang";
import action from "../../redux/dashApp/action";
import { connect } from "react-redux";
import { compose } from "redux";

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
            <div className="header">
              <Link to="/" style={{ textDecoration: "none" }}>
                <img alt="logo" className="logo" src={logo} />
                <span className="title">Ant Design</span>
              </Link>
            </div>
            <div className="desc">
              Ant Design 是西湖区最具影响力的 Web 设计规范
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  changeLanguage
};

export default compose(connect(null, mapDispatchToProps))(UserLayout);
