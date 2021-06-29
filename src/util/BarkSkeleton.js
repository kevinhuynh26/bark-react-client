import React, { Fragment } from "react";
import NoImg from "./noimage_person.png";
import PropTypes from "prop-types";

import { Card, CardMedia, CardContent } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spread,
  ...theme.spread.barkSkeletonTheme,
  handle: {
    width: 60,
    height: 18,
    marginBottom: 10,
    backgroundColor: theme.palette.primary.main,
  },
});

const BarkSkeleton = (props) => {
  const { classes } = props;
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));
  return <Fragment>{content}</Fragment>;
};

BarkSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BarkSkeleton);
