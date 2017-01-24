import React, { PropTypes } from "react";
import SlideToUnlock from "./SlideToUnlock";
import ClockDisplay from "./ClockDisplay";

export default class LockScreen extends React.Component {
  static propTypes = {
    wallpaperPath: PropTypes.string,
    userInfoMessage: PropTypes.string,
    onUnlocked: PropTypes.func,
  };

  state = {
    isFaded: false,
  };

  render() {
    const {
      wallpaperPath,
      userInfoMessage,
      onUnlocked,
    } = this.props;

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          backgroundImage: wallpaperPath ? `url(${wallpaperPath})` : "",
          backgroundColor: "black",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <ClockDisplay />
        {userInfoMessage ? (
          <div
            style={{
              color: "white",
              marginBottom: "auto",
              background: "linear-gradient(rgba(85, 85, 85, 0.498039), transparent)",
              padding: "2em",
            }}
          >
            {userInfoMessage}
          </div>
        ) : null}
        <SlideToUnlock onSlide={onUnlocked} />
      </div>
    );
  }
}