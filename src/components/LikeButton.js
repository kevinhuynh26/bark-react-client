//REACT
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { likeBark, unlikeBark } from "../redux/actions/dataAction";
import PropTypes from "prop-types";
//MATERIAL UI
import { Favorite as FavoriteIcon, FavoriteBorder } from "@material-ui/icons";
//COMPONENTS
import MyButton from "./MyButton";

export class LikeButton extends Component {
  likedBark = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.barkID === this.props.barkID)
    ) {
      return true;
    } else {
      return false;
    }
  };

  likeBark = () => {
    this.props.likeBark(this.props.barkID);
  };
  unlikeBark = () => {
    this.props.unlikeBark(this.props.barkID);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedBark() ? (
      <MyButton onClick={this.unlikeBark} tip="Unlike">
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton onClick={this.likeBark} tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  barkID: PropTypes.string.isRequired,
  likeBark: PropTypes.func.isRequired,
  unlikeBark: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps, { likeBark, unlikeBark })(LikeButton);
