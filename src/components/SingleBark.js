import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Card, CardContent, Typography } from "@material-ui/core";
import { Chat as ChatIcon } from "@material-ui/icons";

import MyButton from "./MyButton";
import CommentForm from "./CommentForm";
import LikeButton from "./LikeButton";
import Comments from "./Comments";

const styles = (theme) => ({
  ...theme.spread.barkPostTheme,
});

class SingleBark extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      //classes,
      bark: {
        comments,
        barkID,
        body,
        createdAt,
        likeCount,
        //userHandle,
        commentCount,
      },
    } = this.props;
    
    return (
      <Card>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>

          <Typography variant="h4" align="center">
            {body}
          </Typography>
          <LikeButton barkID={barkID} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <CommentForm barkID={barkID} />
          <Comments comments={comments} />
        </CardContent>
      </Card>
    );
  }
}

SingleBark.propTypes = {
  bark: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleBark);
