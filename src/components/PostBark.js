//REACT
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postBark, clearErrors } from "../redux/actions/dataAction";

//MATERIAL UI
import { Add as AddIcon, Close as CloseIcon } from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Button,
  TextField,
  DialogContent,
  Dialog,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";

//COMPONENTS
import MyButton from "./MyButton";

const styles = (theme) => ({
  ...theme.spread,
});

class PostBark extends Component {
  state = { open: false, body: "", errors: {} };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {}, body: "" });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props
      .postBark({ body: this.state.body })
      .then(() => {
        this.handleClose();
      })
      .catch(() => {
        console.log("rejected");
      });
  };
  static getDerivedStateFromProps(props, state) {
    return props.ui.errors ? { errors: props.ui.errors } : { errors: {} };
  }
  render() {
    const { errors } = this.state;
    const {
      classes,
      ui: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="New Post">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>New Bark</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="body"
                multiline
                placeholder="Woof Woof?"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostBark.propTypes = {
  postBark: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ui: state.ui,
});

export default connect(mapStateToProps, { postBark, clearErrors })(
  withStyles(styles)(PostBark)
);
