import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, createStyles, Modal } from "@mui/material";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";
import AddCategory from "./AddCategory";
import * as api from "../api/actions";

const useStyles = createStyles((theme) => ({
  div: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    minWidth: 600,
    marginRight: 20,
  },
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
  // toolbar: {
  //   textAlign: "center",
  //   height: 80,
  //   // backgroundColor: "#ea00d9",
  //   color: "#ea00d9",
  //   backgroundColor: theme.palette.background.paper,
  // },
  // heading: {
  //   color: "#ea00d9",
  //   margin: "auto",
  //   fontSize: 30,
  // },
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
  datagrid: {
    marginTop: 10,
    marginLeft: 20,
    width: "100%",
    height: 400,
  },
  chip: {
    backgroundColor: "#E8E8E8",
    color: "#ea00d9",
    width: "auto",
    marginTop: 5,
    marginLeft: 5,
    fontSize: 14,
    height: 20,
  },
  button: {
    position: "absolute",
    width: 150,
    backgroundColor: "#AFABDB",
    right: 32,
    top: 3,
    color: "#fff",
  },
}));

const Category = (props) => {
  const [categories, setCategories] = React.useState([]);
  const [showAddCategory, setShowAddCategory] = React.useState(false);
  const classes = useStyles();

  const mapCategories = (categories) => {
    const mappedCategories = categories.map((category) => {
      return { id: category.id, category: category.category };
    });
    return mappedCategories;
  };

  const handleEdit = async (params) => {
    const res = await api.updateCategory(params.id, params.category);
    if (res.changedRows > 0) {
      alert(`Category updated: ${params.category}`);
    } else {
      alert("Error trying to update. NOT updated");
    }
  };

  const handleShowAddCategory = () => {
    const isShowAddCategory = !showAddCategory;
    setShowAddCategory(isShowAddCategory);
  };

  const handleCloseAddCategory = () => {
    setShowAddCategory(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 130,
      editable: false,
      headerAlign: "center",
      isHidden: true,
    },
    {
      field: "category",
      headerName: "Name",
      width: 230,
      editable: true,
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      editable: true,
      sortable: false,
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{
              width: 80,
              margin: "10px",
            }}
            onClick={() => {
              handleEdit(params.row);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            // rowId={params.id}
            style={{
              width: 80,
            }}
            onClick={() => {
              handleEdit(params.row);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  React.useEffect(async () => {
    const allCategories = await props.getCategoriesApi();
    const mappedCategories = mapCategories(allCategories);
    setCategories(mappedCategories);
  }, []);

  return (
    <Box sx={classes.box}>
      <div style={classes.div}>
        <div style={classes.datagrid}>
          <DataGrid rows={categories} columns={columns} />
        </div>
        <Button style={classes.button} onClick={handleShowAddCategory}>
          Add Category
        </Button>
      </div>
      <Modal
        open={showAddCategory}
        onClose={handleCloseAddCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddCategory onClose={handleCloseAddCategory}/>
      </Modal>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getCategoriesApi: () => dispatch(actionTypes.getCategoriesApi()),
  // updateCategoryApi: (id, category) =>
  //   actionTypes.updateCategoryApi(id, category),
  // updateCategoryApi: (id, category) =>
  //   dispatch(actionTypes.updateCategoryApi(id, category)),
});

export default connect(null, mapDispatchToProps)(Category);
