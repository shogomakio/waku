import React from "react";

// redux
import { connect } from "react-redux";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import * as actionTypes from "../../store/actions";
import Config from "../../Utils/Config";

const useStyles = {
  root: {
    minHeight: "10vh",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: Config.searchDefault.page,
      limit: Config.searchDefault.limit,
    };
    this.props.getVideosApi(this.state.limit, this.state.page);
    this.props.getVideosCountApi();
  }

  handleChange = (event, value) => {
    this.setState({ page: value });
    this.props.getVideosApi(this.state.limit, value);
  };

  calculatePaginationCount = () => {
    const paginationCount = Math.ceil(this.props.videoCount / this.state.limit);
    return paginationCount;
  };

  render() {
    const { page } = this.state;
    return (
      <Stack spacing={2} style={useStyles.root}>
        <Pagination
          showFirstButton
          showLastButton
          count={this.calculatePaginationCount()}
          page={page}
          onChange={this.handleChange}
          color={"primary"}
          style={{ verticalAlign: "baseline"}}
        />
      </Stack>
    );
  }
}

const mapStateToProps = (state) => ({
  videoCount: state.videoCount,
});

const mapDispatchToProps = (dispatch) => ({
  getVideosApi: (limit, page) =>
    dispatch(actionTypes.getVideosApi(limit, page)),
  getVideosCountApi: () => dispatch(actionTypes.getVideoCountApi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
