import * as React from "react";
import { Box, Button, createStyles, TextField } from "@mui/material";
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
  field: {
    marginTop: "20px",
    width: 600,
    position: "relative",
    left: "3%",
  },
  button: {
    position: "absolute",
    width: 150,
    backgroundColor: "#c7edef",
    right: 0,
    bottom: 0,
    color: "#757575",
  },
  form: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
}));

const AddCategory = (props) => {
  const [category, setCategory] = React.useState([]);
  const classes = useStyles();

  const handleTextChange = (value) => {
    setCategory(value);
  };

  const handleAddCategory = () => {
    api.addCategory(category);
    // if (result.insertedId) {
    //   // const allCategories = await props.getCategoriesApi();
    //   // const mappedCategories = mapCategories(allCategories);
    //   // setCategories(mappedCategories);
      // alert(`Category added: ${category}`);
    // } else {
    //   alert("Error trying to add. A new category couldn't be added.");
    // }
    const closeThisModal = props.onClose;
    closeThisModal();
  };

  return (
    <Box sx={classes.box}>
      <div style={classes.div}>
        <form
          onSubmit={() => {
            handleAddCategory();
          }}
          style={classes.form}
        >
          <TextField
            type="add a category"
            label="Category"
            id={`add-category`}
            value={category || ""}
            onChange={(e) => handleTextChange(e.target.value)}
            style={classes.field}
          />
          <Button
            variant="contained"
            sx={{
              borderRadius: 50,
            }}
            style={classes.button}
            type="submit"
          >
            Add Category
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default AddCategory;
