import React from "react";

// redux
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions";
import Config from "../../Utils/Config";

import { createStyles } from "@material-ui/core/styles";
import { ImageList } from "@material-ui/core";
import VideoPlayer from "../Videos/ReactVideoPlayer";
import ReactInfiniteScroller from "react-infinite-scroller";
import MediaCard from "./MediaCard";
import { Typography } from "@mui/material";
import ScrollToTop from "react-scroll-to-top";
import PathParser from "../../Utils/PathParser";
// import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = createStyles((theme) => ({
  root: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  control: {
    top: "0",
    position: "sticky",
    // backgroundColor: theme.palette.background.paper,
    // backgroundColor: "#711c91",
    // backgroundColor: "#ea00d9",
    zIndex: 100,
  },
  imageList: {
    marginTop: "20px",
    width: "100%",
    zIndex: 1,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  scrollableDiv: {
    top: 0,
    overflowX: "hidden",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    marginLeft: "0%",
    width: "100%",
    // maxHeight: "900px",
    height: "91vh",
  },
  noMoreVideos: {
    marginTop: "50px",
    display: "flex",
    justifyContent: "center",
  },
  loader: {
    marginLeft: "50%",
    // width: "100%",
  },
  movieTitle: {
    display: "flex",
    height: "20px",
    margin: "auto",
  },
}));

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      page: Config.searchDefault.page,
      hasMore: true,
      video: {},
      videoUrl: "",
      videoTitle: "",
      thumbnailUrl: "",
    };
  }

  fetchVideos = async () => {
    const { page, hasMore } = this.state;
    const canLoadVideos = this.props.canLoadVideos;
    if (hasMore && canLoadVideos) {
      const fetchedVideos = await this.props.getVideosApi(
        Config.searchDefault.limit,
        page
      );
      if (fetchedVideos.length <= 0) {
        this.setState({
          ...this.state,
          hasMore: false,
        });
        return;
      }
      // TODO: this is buggy, should become a global state
      const newPage = this.state.page + 1;
      this.setState({ page: newPage });
    }
  };

  handleOnClickMediaCard = (video) => {
    const path = PathParser.getRelativePath(video);
    const videoUrl = `${path}/${video.filename}`;

    // const filenames = video.filename.split(".");
    // TODO: waku
    const thumbnailUrl = `${path}/${video.thumbnail}`;

    this.setState({ videoUrl });
    this.setState({ thumbnailUrl });
    this.setState({ videoTitle: video.title });

    this.props.updateShowPlayer(true);
  };

  render() {
    const classes = useStyles();
    const { videos, showPlayer } = this.props;

    return (
      <React.Fragment>
        {showPlayer && (
          <div className={classes.control}>
            <VideoPlayer
              videoUrl={this.state.videoUrl}
              thumbnailUrl={this.state.thumbnailUrl}
              videoTitle={this.state.videoTitle}
            />
            <ScrollToTop top={0} color={"#ea00d9"} smooth={true} />
          </div>
        )}
        <div
          id="scrollableDiv"
          ref={(ref) => (this.scrollParentRef = ref)}
          style={classes.scrollableDiv}
        >
          <ReactInfiniteScroller
            // dataLength={videos.length}
            loadMore={() => this.fetchVideos()}
            hasMore={this.state.hasMore}
            useWindow={false}
            // loader={
            //   <div className="loader" key={0}>
            //     <img
            //       src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
            //       alt="loading"
            //     />
            //   </div>
            // }
            // scrollableTarget="scrollableDiv"
          >
            <div className="image-grid" style={classes.imageList}>
              <ImageList
                // className={classes.imageList}
                rowHeight={150}
                gap={15}
                cols={5}
              >
                {videos.length > 0 &&
                  videos.map((video) => (
                    <MediaCard
                      video={video}
                      onClickMediaCard={(video) =>
                        this.handleOnClickMediaCard(video)
                      }
                    />
                  ))}
              </ImageList>
            </div>
            {!this.state.hasMore && (
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                style={classes.noMoreVideos}
              >
                End of the list.
              </Typography>
            )}
          </ReactInfiniteScroller>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  videoCount: state.videoCount,
  videos: state.videos,
  showPlayer: state.showPlayer,
  canLoadVideos: state.canLoadVideos,
});

const mapDispatchToProps = (dispatch) => ({
  getVideosApi: (limit, page) =>
    dispatch(actionTypes.getVideosApi(limit, page)),
  updateShowPlayer: (showPlayer) =>
    dispatch(actionTypes.updateShowPlayer(showPlayer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
