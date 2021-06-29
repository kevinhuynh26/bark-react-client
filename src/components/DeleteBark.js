//REACT, REDUX +CORE
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//MATERIAL UI
import {
  Button,
  Dialog,
  DialogActions as DialogAction,
  DialogTitle,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";

//COMPONENTS
import { deleteBark } from "../redux/actions/dataAction";
import MyButton from "./MyButton";

const styles = {
  deleteButton: { position: "absolute", left: "90%", top: "10%" },
};

class DeleteBark extends Component {
  state = { open: false };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  deleteBark = () => {
    this.props.deleteBark(this.props.barkID);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Delete Bark"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Confirm, Delete Bark?</DialogTitle>
          <DialogAction>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteBark} color="secondary">
              Delete
            </Button>
          </DialogAction>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteBark.propTypes = {
  deleteBark: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  barkID: PropTypes.string.isRequired,
};

export default connect(null, { deleteBark })(withStyles(styles)(DeleteBark));
