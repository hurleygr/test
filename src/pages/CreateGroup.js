import React from 'react';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header';

class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, groups: { group_name: null, description: null } };
  };

  groupname_change(e) {
    this.setState({ groups: { ...this.state.groups, group_name: e.target.value } })
  };

  description_change(e) {
    this.setState({ groups: { ...this.state.groups, description: e.target.value } })
  };


  createGroup = async (e) => {
    e.preventDefault()

    await fetch('http://flip3.engr.oregonstate.edu:7272/groups/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        group_name: this.state.groups.group_name,
        description: this.state.groups.description
      })
    })
      .then(response => console.log(response))
      .catch(err => console.log(err))

    this.props.history.push('/group/' + this.state.groups.group_name);
  };

  logIn(username) {
    this.setState({ user: username })
  };

  render() {
    return (
      <div>

        < Header func={this.logIn.bind(this)} user={this.state.user} />
        <   div style={{ paddingTop: "100px" }}></div>
        <h1>Create a Group</h1>

        <form id="creategroup" onSubmit={this.createGroup.bind(this)}>
          Name<br />
                    **Names cannot have spaces, must be between 3-21 characters, and underscores are the only special charactres allowed**
                    <br />
          <input type="text" name="name" onChange={this.groupname_change.bind(this)} /> <br />
          <br />
                    Description<br />
          <input type="text" name="description" onChange={this.description_change.bind(this)} /> <br />
          <br />
          <input type="submit" value="Create Group" />
        </form>
      </div>
    );
  }
};

export default withRouter(CreateGroup);