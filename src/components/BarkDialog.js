//REACT, REDUX +CORE
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getOneBark,
  clearErrors,
  dialogClosed,
} from "../redux/actions/dataAction";

//MATERIAL UI
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import {
  Chat as ChatIcon,
  UnfoldMore,
  Close as CloseIcon,
} from "@material-ui/icons";

//COMPONENTS
import LikeButton from "./LikeButton";
import MyButton from "./MyButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const styles = (theme) => ({
  ...theme.spread,
  ...theme.spread.barkDialogTheme,
});

class BarkDialog extends Component {
  state = { open: false, location: '' };

  handleOpen = () => {
    this.setState({location:window.location.pathname});
    let path = `/users/${this.props.userHandle}/bark/${this.props.barkID}`
    window.history.pushState(null, null, path)
    this.setState({ open: true });
    this.props.getOneBark(this.props.barkID);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.location)
    this.setState({ open: false });
    this.props.clearErrors();
    this.props.dialogClosed();
  };

  render() {
    const {
      classes,
      bark: {
        barkID,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      ui: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinner}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton barkID={barkID} />
          <span>{likeCount}</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm barkID={barkID} />
        {comments != null && <Comments comments={comments} />}
      </Grid>
    );

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon color="primary" />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

BarkDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getOneBark: PropTypes.func.isRequired,
  barkID: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  bark: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bark: state.data.bark,
  ui: state.ui,
});

export default connect(mapStateToProps, {
  dialogClosed,
  getOneBark,
  clearErrors,
})(withStyles(styles)(BarkDialog));
