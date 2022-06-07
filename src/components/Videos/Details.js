import React from "react";

import { connect } from "react-redux";

import chroma from "chroma-js";
import { Button, Box, TextField, Typography } from "@material-ui/core";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import * as actionTypes from "../../store/actions";

const useStyles = {
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflownY: "auto",
  },
  form: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  field: {
    marginTop: "20px",
    width: 600,
    position: "relative",
    left: "3%",
    // color: "#c7edef",
  },
  fieldThumbnail: {
    marginTop: "75px",
    width: 600,
    position: "relative",
    left: "3%",
    // color: "#c7edef",
  },
  button: {
    position: "absolute",
    width: 150,
    backgroundColor: "#c7edef",
    right: 0,
    bottom: 0,
    color: "#757575",
  },
  buttonThumbnail: {
    position: "absolute",
    width: 150,
    backgroundColor: "#c7edef",
    right: 30,
    bottom: 30,
    color: "#757575",
  },
  select: {
    marginTop: "50px",
    width: 600,
    position: "relative",
    left: "3%",
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    multiValue: (styles) => {
      const color = chroma("blue");
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
  },
};

class VideoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      video: this.props.video,
      timestamps: "70",
      allCategories: [],
      selectedCategories: null,
    };
  }
  handleSaveChanges = () => {
    const { video, selectedCategories } = this.state;
    this.props.updateVideoApi(video, selectedCategories);
  };

  handleGenerateThumbnail = () => {
    const { video, timestamps } = this.state;
    this.props.generateThumbnailApi(video, timestamps);
  };

  handleTimestampsChange = (timestamps) => {
    this.setState({
      ...this.state,
      timestamps,
    });
  };

  handleTextChange = (key, value) => {
    this.setState({
      ...this.setState,
      video: {
        ...this.state.video,
        [key]: value,
      },
    });
  };

  handleSelectChange = (selectedOption) => {
    console.log("selected options:", selectedOption);
    this.setState({ selectedCategories: selectedOption });
  };

  convertCategoriesForSelect = (categories) => {
    const options = [];
    for (const category of categories) {
      options.push({
        id: category.id,
        value: category.id,
        label: category.category,
      });
    }
    return options;
  };

  render() {
    const { video } = this.props;
    const { code, title, filename, part, full_path, year } = this.state.video;
    const timestamps = this.state.timestamps;
    const animatedComponents = makeAnimated();
    return (
      <Box sx={useStyles.box}>
        {/* <Box sx={classes.root}> */}
        <form onSubmit={this.handleSaveChanges} style={useStyles.form}>
          <TextField
            type="text"
            label="Code"
            id={`video-code-${video.id}`}
            value={code || ""}
            onChange={(e) => this.handleTextChange("code", e.target.value)}
            style={useStyles.field}
          />
          <TextField
            type="text"
            label="Title"
            id={`video-title-${video.id}`}
            value={title || ""}
            onChange={(e) => this.handleTextChange("title", e.target.value)}
            style={useStyles.field}
          />
          <TextField
            type="text"
            label="ファイル名"
            id={`video-filename-${video.id}`}
            value={filename || ""}
            onChange={(e) => this.handleTextChange("filename", e.target.value)}
            style={useStyles.field}
          />
          <TextField
            type="text"
            label="Part"
            id={`video-part-${video.id}`}
            value={part || ""}
            onChange={(e) => this.handleTextChange("part", e.target.value)}
            style={useStyles.field}
          />
          <TextField
            type="text"
            label="Path"
            id={`video-path-${video.id}`}
            value={full_path || ""}
            onChange={(e) => this.handleTextChange("full_path", e.target.value)}
            style={useStyles.field}
          />
          <TextField
            type="text"
            label="Year"
            id={`video-year-${video.id}`}
            value={year || ""}
            onChange={(e) => this.handleTextChange("year", e.target.value)}
            style={useStyles.field}
          />
          <div style={useStyles.select}>
            <Typography
              style={{
                color: "#757575",
                marginBottom: "5px",
              }}
            >
              Categories
            </Typography>
            <Select
              closeMenuOnSelect={false}
              value={this.state.selectedCategories}
              options={this.state.allCategories}
              components={animatedComponents}
              isMulti
              isSearchable
              onChange={this.handleSelectChange}
              styles={useStyles.select}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: "hotpink",
                  primary: "black",
                },
              })}
            />
          </div>
          <Button
            variant="contained"
            sx={{
              borderRadius: 50,
            }}
            style={useStyles.button}
            type="submit"
          >
            Save changes
          </Button>
        </form>
        <TextField
          type="text"
          label="Create thumbnail at timestamps:"
          id={`video-thumb-${video.id}`}
          value={timestamps}
          onChange={(e) => this.handleTimestampsChange(e.target.value)}
          style={useStyles.fieldThumbnail}
        />
        <Button
          variant="contained"
          sx={{
            borderRadius: 50,
          }}
          type="click"
          onClick={this.handleGenerateThumbnail}
          style={useStyles.buttonThumbnail}
        >
          generate
        </Button>
      </Box>
    );
  }

  async componentDidMount() {
    await this.props.getCategoriesApi();
    const allCategories = this.convertCategoriesForSelect(
      this.props.allCategories
    );
    this.setState({ allCategories });

    const videoCategories = await this.props.getVideoCategoriesApi(
      this.props.video.id
    );
    let selectedCategories = [];
    for (const videoCategory of videoCategories) {
      let matched = allCategories.find(
        (data) => data.id === videoCategory.category_id
      );
      selectedCategories.push(matched);
    }
    this.setState({ selectedCategories });
  }
}

const mapStateToProps = (state) => ({
  videos: {
    ...state.videos,
  },
  allCategories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
  updateVideoApi: (video, categories) =>
    dispatch(actionTypes.updateVideoApi(video, categories)),
  generateThumbnailApi: (video, timestamps = null) =>
    dispatch(actionTypes.generateThumbnailApi(video, timestamps)),
  getVideoCategoriesApi: (id) =>
    dispatch(actionTypes.getVideoCategoriesApi(id)),
  getCategoriesApi: () => dispatch(actionTypes.getCategoriesApi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoDetail);
