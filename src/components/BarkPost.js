//REACT, REDUX +CORE
import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//MATERIAL-UI
import { withStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import { Chat as ChatIcon } from "@material-ui/icons";

//COMPONENTS
import MyButton from "./MyButton";
import DeleteBark from "./DeleteBark";
import BarkDialog from "./BarkDialog";
import LikeButton from "./LikeButton";

const styles = (theme) => ({
  ...theme.spread.barkPostTheme,
});

class BarkPost extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      bark: {
        body,
        createdAt,
        userImage,
        userHandle,
        likeCount,
        commentCount,
        barkID,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteBark barkID={barkID} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia image={userImage} className={classes.image} />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>

          <Typography variant="body1">{body}</Typography>
          <LikeButton barkID={barkID} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          
          <BarkDialog barkID={barkID} userHandle={userHandle}></BarkDialog>
        
        </CardContent>
      </Card>
    );
  }
}

BarkPost.propTypes = {
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  bark: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});

export default connect(mapStateToProps)(withStyles(styles)(BarkPost));
