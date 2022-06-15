import React from "react";
// redux
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import InfiniteScroll from "../components/Images/InfiniteScroll";

const useStyles = makeStyles({
  root: {
    top: "0%",
    left: "0%",
    position: "absolute",
    width: "100%",
    height: "100vh",
  },
});

function Waku(props) {
  const { videos } = props;
  const classes = useStyles();
  document.body.style.overflow = "hidden";
  return (
    <div className={classes.root}>
      <Header />
      <InfiniteScroll videos={videos} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  videos: state.videos,
});

const mapDispatchToProps = (dispatch) => ({
  loadVideo: (videos) => dispatch(actionTypes.loadVideo(videos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Waku);
