//REACT
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserData, getOneBark } from "../redux/actions/dataAction";
//MUI
import { Grid } from "@material-ui/core";
//COMPONENTS
import BarkPost from "../components/BarkPost";
import SingleBark from "../components/SingleBark";
import StaticProfile from "../components/StaticProfile";
import BarkSkeleton from "../util/BarkSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

class users extends Component {
  state = { profile: null, barkID: null, bark: null };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const barkIDParam = this.props.match.params.barkID;
    //FETCH SINGLE POST IF NAVIGATED TO SINGLE POST
    if (barkIDParam) {
      this.props.getOneBark(barkIDParam, true).then((res) => {
        this.setState({ barkID: barkIDParam, bark: res });
      });
    }
    //FETCH USER PROFILE DETAILS
    this.props
      .getUserData(handle)
      .then((res) => {
        this.setState({ profile: res });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate() {
    const barkIDParam = this.props.match.params.barkID;
    if (barkIDParam !== this.state.barkID && barkIDParam !== undefined) {
      this.props.getOneBark(barkIDParam, true).then((res) => {
        this.setState({ barkID: barkIDParam, bark: res });
      });
    }
  }

  render() {
    const { barks, loading, bark } = this.props.data;

    const barkMarkUp = loading ? (
      <BarkSkeleton />
    ) : barks === null ? (
      <p>User has not posted any barks yet!</p>
    ) : !this.props.match.params.barkID ? (
      barks.map((single) => <BarkPost key={single.barkID} bark={single} />)
    ) : (
      <Fragment>
        {Object.keys(bark).length && (
          <SingleBark bark={bark} profile={this.state.profile} />
        )}
      </Fragment>
    );

    const profileMarkUp = loading ? (
      <ProfileSkeleton />
    ) : this.state.profile === null ? (
      <ProfileSkeleton />
    ) : (
      <StaticProfile profile={this.state.profile} />
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {barkMarkUp}
        </Grid>
        <Grid item sm={4} xd={12}>
          {profileMarkUp}
        </Grid>
      </Grid>
    );
  }
}

users.propTypes = {
  data: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
  getOneBark: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getOneBark, getUserData })(users);
