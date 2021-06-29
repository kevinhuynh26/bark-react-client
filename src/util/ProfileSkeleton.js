import React from "react";
import NoImg from "./noimage_person.png";
import PropTypes from "prop-types";

import { Paper } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spread.barkSkeletonTheme,
  ...theme.spread.profileTheme,
  handle: {
    width: 70,
    height: 18,
    marginBottom: 10,
    marginLeft: "40%",
    backgroundColor: theme.palette.primary.main,
  },
  fullLine: {
    ...theme.spread.barkSkeletonTheme.fullLine,
    marginLeft: "5%",
  },
});

const ProfileSkeleton = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
