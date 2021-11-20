import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ReactPlayer from "react-player";

function VideoPlayer() {
  return (
    <>
      <ReactPlayer
        style={{ float: "left" }}
        url="/uploads/cherry-blossom-tree-desktop-wallpaperwaifu-totext-1634201673672.mp4"
        // width="20%"
        // height="20%"
        controls={true}
      />
      <div style={{ float: "right", backgroundColor: "red", width: "50%" }}>
        cherry-blossom-tree-desktop-wallpaperwaifu-totext-1634201673672.mp4cherry-blossom-tree-desktop-wallpaperwaifu-totext-1634201673672.mp4cherry-blossom-tree-desktop-wallpaperwaifu-totext-1634201673672.mp4cherry-blossom-tree-desktop-wallpaperwaifu-totext-1634201673672.mp4cherry-blossom-tree-desktop-wallpaperwaifu-totext-1634201673672.mp4cherry-blossom-tree-desktop-wallpaperwaifu-totext-1634201673672.mp4
      </div>
    </>
  );
}

export default VideoPlayer;
