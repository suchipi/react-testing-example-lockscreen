import React, { PropTypes } from "react";
import ClockDisplay from "./ClockDisplay";
import TopOverlay from "./TopOverlay";
import SlideToUnlock from "./SlideToUnlock";

export default class LockScreen extends React.Component {
  static propTypes = {
    wallpaperPath: PropTypes.string,
    userInfoMessage: PropTypes.string,
    onUnlocked: PropTypes.func,
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
          <TopOverlay
            style={{
              padding: "2em",
              marginBottom: "auto",
            }}
          >
            {userInfoMessage}
          </TopOverlay>
        ) : null}
        <SlideToUnlock onSlide={onUnlocked} />
      </div>
    );
  }
}