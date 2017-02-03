import React from "react";
import LockScreen from "./LockScreen";

export default class App extends React.Component {
  render() {
    return (
      <LockScreen
        wallpaperPath="react_wallpaper.png"
        userInfoMessage="This is Tim's phone. If found, please give it back to him. He will be sad without it"
        onUnlocked={() => alert("unlocked!")}
      />
    );
  }
}