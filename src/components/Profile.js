//REACT, REDUX
import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userAction";

//MATERIAL-UI
import { withStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
  Edit as EditIcon,
  KeyboardReturn,
} from "@material-ui/icons";

//COMPONENTS
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import MyButton from "./MyButton";
import ProfileSkeleton from "../util/ProfileSkeleton";

const styles = (theme) => ({
  ...theme.spread.profileTheme,
  profile: {
    ...theme.spread.profileTheme.profile,
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
  },
});

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                id="imageInput"
                onChange={this.handleImageChange}
                hidden="hidden"
              />
              <MyButton
                tip="Change Profile Picture"
                tipPlacement="top"
                onClick={this.handleEditPicture}
                className="button"
              >
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color="primary" /> <span>{location}</span>
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <hr />
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                </Fragment>
              )}
              <hr />
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            <MyButton
              tip="Log Out"
              tipPlacement="top"
              onClick={this.handleLogout}
              className="button"
            >
              <KeyboardReturn color="primary" />
            </MyButton>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Log In
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/signup"
            >
              Sign Up
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <ProfileSkeleton/>
    );

    return profileMarkup;
  }
}

const mapActionsToProps = { logoutUser, uploadImage };

const mapStateToProps = (state) => ({
  user: state.user,
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
