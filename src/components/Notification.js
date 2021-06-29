import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { markNotificationRead } from "../redux/actions/userAction";

import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
  Badge,
} from "@material-ui/core";
import {
  Notifications as NotificationsIcon,
  Favorite as FavoriteIcon,
  Chat as ChatIcon,
} from "@material-ui/icons";

class Notification extends Component {
  state = { anchor: null };

  handleOpen = (event) => {
    this.setState({ anchor: event.target });
  };

  handleClose = () => {
    this.setState({ anchor: null });
  };

  onMenuOpen = () => {
    let notificationIDs = this.props.notifications
      .filter((notif) => !notif.read)
      .map((notif) => notif.notificationId);
      console.log(notificationIDs);
    if (notificationIDs.length > 0)
    this.props.markNotificationRead(notificationIDs);
  };

  render() {
    const { notifications } = this.props;
    dayjs.extend(relativeTime);

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((notif) => notif.read === false).length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                notifications.filter((notif) => notif.read === false).length
              }
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon />);
    } else {
      notificationsIcon = <NotificationsIcon />;
    }

    let markup =
      notifications && notifications.length > 0 ? (
        notifications.map((notif) => {
          const verb = notif.type === "like" ? "liked" : "commented on";
          const time = dayjs(notif.createdAt).fromNow();
          const iconColor = notif.read ? "primary" : "secondary";
          const icon =
            notif.type === "like" ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem key={notif.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color={iconColor}
                variant="body1"
                to={`/users/${notif.recipient}/bark/${notif.barkID}`}
              >
                {notif.sender} {verb} your bark {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>No New Notifications</MenuItem>
      );

    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={this.state.anchor ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={this.state.anchor}
          open={Boolean(this.state.anchor)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpen}
        >
          {markup}
        </Menu>
      </Fragment>
    );
  }
}

Notification.propTypes = {
  notifications: PropTypes.array.isRequired,
  markNotificationRead: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationRead })(Notification);
