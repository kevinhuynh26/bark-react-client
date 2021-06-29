import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { submitComment } from "../redux/actions/dataAction";

import { Button, Grid, TextField, ClickAwayListener } from "@material-ui/core";

const styles = (theme) => ({ ...theme.spread });

class CommentForm extends Component {
  state = { body: "", errors: {}, focus: false };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props
      .submitComment(this.props.barkID, { body: this.state.body })
      .then((res) => {
        console.log(res);
        this.setState({ body: "", focus: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ focus: false });
      });
  };

  textFieldFocus = (event) => {
    console.log("textfield focused");
    this.setState({ focus: true });
  };

  textFieldUnfocus = (event) => {
    console.log("textfield unfocused");
    this.setState({ focus: false });
  };

  static getDerivedStateFromProps(props, state) {
    return props.ui.errors ? { errors: props.ui.errors } : { errors: {} };
  }

  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;
    return authenticated ? (
      <ClickAwayListener onClickAway={this.textFieldUnfocus}>
        <Grid item sm={12} style={{ textAlign: "center" }}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="body"
              tpype="text"
              label="Post a reply!"
              error={errors.comment ? true : false}
              helperText={errors.comment}
              value={this.state.body}
              onChange={this.handleChange}
              onClick={this.textFieldFocus}
              onClose={this.textFieldUnfocus}
              fullWidth
              className={classes.textField}
            />
            {this.state.focus && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
              </Button>
            )}
          </form>
        </Grid>
      </ClickAwayListener>
    ) : null;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  barkID: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ui: state.ui,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
