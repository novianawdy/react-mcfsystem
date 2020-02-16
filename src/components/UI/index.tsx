import * as React from "react";
import styled from "styled-components";
import { Avatar } from "antd";
import notifIcon from "../../assets/images/notification.svg";

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

export class UserProfile extends React.Component {
  render() {
    return (
      <>
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
          Sean
        </span>
        <Avatar
          shape="square"
          size="large"
          style={{
            backgroundColor: "#2d1e5f",
            color: "#fff",
            fontSize: "1.6rem"
          }}
        >
          S
        </Avatar>
      </>
    );
  }
}

export class Notification extends React.Component {
  render() {
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
      >
        <Avatar src={notifIcon} size="small" /> <Pulse />
      </div>
    );
  }
}
