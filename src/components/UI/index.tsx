import * as React from "react";
import styled from "styled-components";
import { Avatar, Row, Col, Tooltip, Icon } from "antd";
import Number from "antd/lib/statistic/Number";
import notifIcon from "../../assets/images/notification.svg";
import themes from "../../settings/themes/themes";
import getLang from "../../lib/getLang";
import { TooltipPlacement } from "antd/lib/tooltip";

export interface LogoTextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export class LogoText extends React.Component<LogoTextProps> {
  render() {
    const Span = styled.span`
      @font-face {
        font-family: "AdventPro-Bold";
        src: url("/fonts/AdventPro-Bold.ttf");
      }

      font-family: "AdventPro-Bold";
      color: #fefe;
    `;
    return <Span {...this.props} />;
  }
}

export interface UserProfileProps {
  username?: string | React.ReactNode;
  avatar: string;
  onClick?: () => void;
}
export class UserProfile extends React.PureComponent<UserProfileProps> {
  render() {
    const { username, avatar, onClick } = this.props;
    const UserWrapper = styled.div`
      padding: 18px 0px 18px 5px;
      display: initial;
      border-radius: 10px;
      cursor: pointer;
    `;

    return (
      <UserWrapper onClick={onClick}>
        <span
          style={{
            padding: "0 .55rem 0 0",
            fontWeight: 400,
            fontSize: ".9rem",
            color: "#636177"
          }}
        >
          Hi,
        </span>
        <span
          style={{
            padding: "0 .55rem 0 0",
            fontWeight: 400,
            fontSize: ".9rem",
            color: "#fff"
          }}
        >
          {username}
        </span>
        <Avatar
          shape="square"
          size="large"
          style={{
            backgroundColor: themes.themedefault.palette.secondary[1],
            color: "#fff",
            fontSize: "1.6rem",
            textTransform: "capitalize"
          }}
        >
          {avatar}
        </Avatar>
      </UserWrapper>
    );
  }
}

export interface UserTitleProps {
  username?: string | React.ReactNode;
  role?: string;
  avatar: string;
}
export class UserTitle extends React.Component<UserTitleProps> {
  render() {
    const { username, avatar, role } = this.props;

    return (
      <div style={{ display: "flex" }}>
        <div>
          <Avatar
            shape="square"
            size="large"
            style={{
              backgroundColor: themes.themedefault.palette.secondary[1],
              color: "#fff",
              fontSize: "1.6rem",
              textTransform: "capitalize",
              marginRight: 10
            }}
          >
            {avatar}
          </Avatar>
        </div>
        <div>
          <Row>
            <Col span={24}>
              <span
                style={{
                  padding: "0 .55rem 0 0",
                  fontWeight: 400,
                  fontSize: ".9rem",
                  color: "#636177"
                }}
              >
                Hi,
              </span>
              <span
                style={{
                  padding: "0 .55rem 0 0",
                  fontWeight: 400,
                  fontSize: ".9rem",
                  color: "#2e2e2e"
                }}
              >
                {username}
              </span>
            </Col>
            <Col span={24}>
              <span
                style={{
                  padding: "0 .55rem 0 0",
                  fontWeight: 400,
                  fontSize: ".9rem",
                  color: "#636177"
                }}
              >
                {role}
              </span>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

type NotificationProps = {
  onClick?: () => void;
};

export class Notification extends React.Component<NotificationProps> {
  render() {
    const { onClick } = this.props;
    const Pulse = styled.span`
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: transparent;
      font-family: Poppins, Helvetica, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #646c9a;
      -webkit-box-direction: normal;
      cursor: pointer;
      box-sizing: border-box;
      display: block;
      border-radius: 40px;
      height: 40px;
      width: 40px;
      position: absolute;
      animation: kt-pulse 3.5s ease-out;
      animation-iteration-count: infinite;
      opacity: 0;
      border-width: 3px;
      border-style: solid;
      border-color: #ffb822;
      top: -9px;
      left: -8px;

      @-webkit-keyframes kt-pulse {
        0% {
          -webkit-transform: scale(0.1, 0.1);
          opacity: 0;
        }

        60% {
          -webkit-transform: scale(0.1, 0.1);
          opacity: 0;
        }

        65% {
          opacity: 1;
        }

        100% {
          -webkit-transform: scale(1.2, 1.2);
          opacity: 0;
        }
      }

      @keyframes kt-pulse {
        0% {
          -webkit-transform: scale(0.1, 0.1);
          opacity: 0;
        }

        60% {
          -webkit-transform: scale(0.1, 0.1);
          opacity: 0;
        }

        65% {
          opacity: 1;
        }

        100% {
          -webkit-transform: scale(1.2, 1.2);
          opacity: 0;
        }
      }
    `;
    return (
      <div
        style={{ display: "initial", position: "relative", cursor: "pointer" }}
        onClick={onClick}
      >
        <Tooltip title={getLang({ id: "notification" })}>
          <Avatar src={notifIcon} size="small" /> <Pulse />
        </Tooltip>
      </div>
    );
  }
}

type AnomaliProps = {
  value?: string | number;
  prevValue?: string | number;
};

export class Anomali extends React.Component<AnomaliProps> {
  render() {
    let { value, prevValue } = this.props;
    let val = 0;
    let prevVal = 0;

    if (typeof value === "string") {
      val = parseFloat(value);
    } else if (typeof value === "number") {
      val = value;
    }

    if (typeof prevValue === "string") {
      prevVal = parseFloat(prevValue);
    } else if (typeof prevValue === "number") {
      prevVal = prevValue;
    }

    if (!prevVal && val === 0) {
      return "";
    } else if (!prevVal && val > 0) {
      return (
        <span style={{ color: "#3f8600", fontSize: "9px" }}>
          <Icon type="arrow-up" />
          <Number
            value={val}
            precision={2}
            decimalSeparator=","
            groupSeparator="."
          />
        </span>
      );
    } else if (!prevVal && val < 0) {
      return (
        <span style={{ color: "#cf1322", fontSize: "9px" }}>
          <Icon type="arrow-down" />
          <Number
            value={val}
            precision={2}
            decimalSeparator=","
            groupSeparator="."
          />
        </span>
      );
    } else if (val > prevVal) {
      return (
        <span style={{ color: "#3f8600", fontSize: "9px" }}>
          <Icon type="arrow-up" />
          <Number
            value={val - prevVal}
            precision={2}
            decimalSeparator=","
            groupSeparator="."
          />
        </span>
      );
    } else if (val < prevVal) {
      return (
        <span style={{ color: "#cf1322", fontSize: "9px" }}>
          <Icon type="arrow-down" />
          <Number
            value={prevVal - val}
            precision={2}
            decimalSeparator=","
            groupSeparator="."
          />
        </span>
      );
    } else {
      return "";
    }
  }
}

type IconButtonProps = {
  tooltip?: {
    title: string | React.ReactNode;
    placement: TooltipPlacement;
  };
  icon: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};

export class IconButton extends React.Component<IconButtonProps> {
  render() {
    const { tooltip, icon, onClick, style, ...restProps } = this.props;
    const CustomIcon = styled(Icon)`
      cursor: pointer;
      font-size: 15px;

      :hover {
        color: ${themes.themedefault.palette.primary[0]};
      }
    `;
    return (
      <Tooltip title={tooltip?.title} placement={tooltip?.placement}>
        <CustomIcon
          type={icon}
          onClick={onClick}
          style={style}
          {...restProps}
        />
      </Tooltip>
    );
  }
}
