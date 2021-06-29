import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getBarks } from "../redux/actions/dataAction";

import BarkPost from "../components/BarkPost.js";
import Profile from "../components/Profile.js";
import BarkSkeleton from "../util/BarkSkeleton";
//
class home extends Component {
  state = { barks: {}, initialLoad: true };
  componentDidMount() {
    this.props.getBarks().then((res) => {
      console.log("initial start up, home component did mount");
      this.setState({ barks: res, initialLoad: false });
      //this.state.barks.map((bark) => console.log(bark))
    });
  }
  /*
  componentDidUpdate() {
    //console.log(this.props.data.barks)
    if (
      this.props.data.loading &&
      !this.state.initialLoad &&
      Object.keys(this.state.barks).length !== 0
    ) {
      this.props.reloadData();
      //console.log(this.props.data)
      //console.log("reloading");
    }
    //console.log("home component did update");
  }
*/
  render() {
    //if(Object.keys(this.state.barks).length !== 0) console.log(this.state.barks)
    const { loading, barks } = this.props.data;
    let recentBarks =
      !loading && Object.keys(barks).length !== 0 ? (
        barks.map((bark) => <BarkPost key={bark.barkID} bark={bark} />)
      ) : (
        <BarkSkeleton />
      );

    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentBarks}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile/>
        </Grid>
      </Grid>
    );
  }
}
home.propTypes = {
  getBarks: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getBarks })(home);
