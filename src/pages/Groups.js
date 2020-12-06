import React from "react";
import {
  Link
} from 'react-router-dom'

import Header from '../components/Header';

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "Anonymous",
      data: [],
      top: [],
      my: [],
      groups: { groupsearch_name: null }
    };
  };

  groupsearch_change(e) {
    this.setState({ groups: { ...this.state.groups, groupsearch_name: e.target.value } })
  };

  componentDidMount() {

    const user = localStorage.getItem("user")
    if (user) {
      this.setState({ user: user });
    }

    Promise.all([
      fetch('http://flip3.engr.oregonstate.edu:7272/groups'),
      fetch('http://flip3.engr.oregonstate.edu:7272/topgroups'),
      fetch('http://flip3.engr.oregonstate.edu:7272/mygroups/?username=' + user)
    ])
      .then(([res1, res2, res3]) => Promise.all(
        [
          res1.json(),
          res2.json(),
          res3.json()
        ]))
      .then(([res1, res2, res3]) => {
        this.setState({
          data: res1,
          top: res2,
          my: res3
        });
      })
  };

  logIn(username) {
    this.setState({ user: username })
  };

  searchGroup = async (e) => {
    e.preventDefault()

    await fetch('http://flip3.engr.oregonstate.edu:7272/searchgroups?searchname=' + this.state.groups.groupsearch_name)
      .then(response => response.json())
      .then(json => this.setState({ data: json }));
  };

  render() {
    console.log(this.state)
    console.log(this.state.user)
    const { group } = this.state;
    console.log(group)
    let mygroup;

    if (this.state.user === "Anonymous") {
      mygroup = "Log In to See Your Groups"
    } else {
      mygroup = ""
    }

    return (
      <div>
        < Header func={this.logIn.bind(this)} user={this.state.user} />
        <div style={{ paddingTop: "100px" }}>

          <form id="searchgroup" onSubmit={this.searchGroup.bind(this)}>
            <input type="text" className="input" placeholder="Search Groups" onChange={this.groupsearch_change.bind(this)} />
            <input type="submit" value="Search" />
          </form>
          <br />
          <br />


          <Link to="/creategroup">
            <button type="button">
              Create Group
            </button>
          </Link>

          <h2>Top 5 Groups (by # of users)</h2>
          <ul>
            {this.state.top.map((group) => (
              <li key={group.group_name}>
                <Link to={this.props.match.url + "/" + group.group_name}>{group.group_name}</Link>: {group.users} user(s)</li>
            ))}
          </ul>

          <h2>My Groups</h2>
          {mygroup}
          <ul>
            {this.state.my.map((group) => (
              <li key={group.group_name}>
                <Link to={this.props.match.url + "/" + group.group_name}>{group.group_name}</Link></li>
            ))}
          </ul>

          <h2>Groups</h2>
          <ul>
            {this.state.data.map((group) => (
              <li key={group.group_name}>
                <Link to={this.props.match.url + "/" + group.group_name}>{group.group_name}</Link></li>
            ))}
          </ul>


        </div>
      </div >
    );
  }
};

export default Groups;