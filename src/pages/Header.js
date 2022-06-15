import React from "react";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SearchBar from "material-ui-search-bar";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Link, withStyles } from "@material-ui/core";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import * as actionTypes from "../store/actions";
import { compose } from "redux";

const useStyles = (theme) => ({
  toolbar: {
    textAlign: "center",
    height: 80,
    // backgroundColor: "#ea00d9",
    color: "#ea00d9",
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    color: "#ea00d9",
    margin: "auto",
    fontSize: 30,
  },
  select: {
    marginTop: "50px",
    position: "relative",
    left: "3%",
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    multiValue: (styles) => {
      // const color = chroma("blue");
      return {
        ...styles,
        // backgroundColor: color.alpha(0.1).css(),
      };
    },
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlayer: false,
      search: "",
      selectedCategories: null,
      anchorEl: null,
      categories: null,
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleOnClickVisibility = () => {
    const newShowPlayer = !this.state.showPlayer;
    this.props.updateShowPlayer(newShowPlayer);
    this.setState({ showPlayer: newShowPlayer });
  };

  handleOnChangeSearch = (searchTerm) => {
    this.setState({ search: searchTerm });
  };

  handleSelectChange = async (selectedOption) => {
    const { search } = this.state;
    this.setState({ selectedCategories: selectedOption });

    if (!search && selectedOption.length === 0) {
      // window.location.replace("/");
      this.props.clearVideos();
      return await this.props.getVideosApi();
    }
    await this.props.searchVideoApi(search, selectedOption);
  };

  render() {
    const props = this.props;
    const { classes } = this.props;
    const { anchorEl, search, selectedCategories, categories, showPlayer } =
      this.state;
    const open = Boolean(anchorEl);
    const animatedComponents = makeAnimated();
    return (
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Button
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={this.handleClick}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={this.handleClose}>Manage categories</MenuItem>
            <MenuItem onClick={this.handleClose}>Edit videos info</MenuItem>
            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
          </Menu>
          <Link href="/" underline="none" className={classes.heading}>
            Movies App
          </Link>
          <div style={{ width: "auto", minWidth: 600, marginRight: 20 }}>
            <Select
              placeholder="Select categories"
              closeMenuOnSelect={false}
              value={selectedCategories}
              options={categories}
              components={animatedComponents}
              isMulti
              isSearchable
              isRtl
              onChange={this.handleSelectChange}
              // isOptionDisabled={() => selectedCategories.length >= 3}
              styles={classes.select}
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
          <SearchBar
            value={search}
            onChange={(value) => this.handleOnChangeSearch(value)}
            onRequestSearch={() =>
              props.searchVideoApi(search, selectedCategories)
            }
            style={{ height: 36 }}
          />
          <Button
            onClick={this.handleOnClickVisibility}
            style={{ color: "#ea00d9" }}
          >
            {showPlayer ? <VisibilityOffIcon /> : <PlayCircleOutlineIcon />}
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

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

  async componentDidMount() {
    await this.props.getCategoriesApi();
    const categories = this.convertCategoriesForSelect(this.props.categories);
    this.setState({ categories });
  }
}

const mapStateToProps = (state) => ({
  showPlayer: state.showPLayer,
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
  updateShowPlayer: (showPlayer) =>
    dispatch(actionTypes.updateShowPlayer(showPlayer)),
  searchVideoApi: (search, selectedCategories = null) =>
    dispatch(actionTypes.searchVideoApi(search, selectedCategories)),
  getCategoriesApi: () => dispatch(actionTypes.getCategoriesApi()),
  getVideosApi: () => dispatch(actionTypes.getVideosApi()),
  clearVideos: () => dispatch(actionTypes.clearVideos()),
});

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(Header);
