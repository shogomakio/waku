import React from "react";
import "video-react/dist/video-react.css"; // import css
import {
  Player,
  ControlBar,
  PlaybackRateMenuButton,
  ReplayControl,
  BigPlayButton,
  LoadingSpinner,
} from "video-react";
import { Typography } from "@material-ui/core";

const VideoPlayer = ({ videoUrl, thumbnailUrl, videoTitle }) => {
  const [displayTitle, setDisplayTitle] = React.useState(false);

  const handleOnClick = () => {
    console.log("shogo played");
  };

  const showMovieTitle = () => {
    setDisplayTitle(true);
  };

  const hideMovieTitle = () => {
    setDisplayTitle(false);
  };

  return (
    <div
      onMouseOver={showMovieTitle}
      onMouseOut={hideMovieTitle}
    >
      {displayTitle && (
        <Typography
        style={{position: "absolute", top: 50, left: "1%", backgroundColor: "#fff", zIndex: 1000}} >
          {videoTitle}
        </Typography>
      )}
      <Player
        fluid={false}
        width={"800"}
        muted
        autoPlay
        aspectRatio={"16:9"}
        className="react-player"
        poster={thumbnailUrl}
        src={videoUrl}
        onClick={() => handleOnClick()}
      >
        <BigPlayButton position="center" />
        <ControlBar autoHide={true}>
          <ReplayControl seconds={5} order={2.1} />
          <PlaybackRateMenuButton order={7} rates={[2, 1.5, 1.0, 0.5]} />
          <LoadingSpinner />
        </ControlBar>
      </Player>
    </div>
  );
};

export default VideoPlayer;
