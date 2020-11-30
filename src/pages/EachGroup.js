import React from "react";
import Header from '../components/Header';
import GroupPosts from '../components/GroupPosts';


class EachGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: "Anonymous", data: null, joined: null };
        this.path = props.location.pathname;
    };

    componentDidMount() {

        let grouppath = this.path.substring(this.path.lastIndexOf('/') + 1)

        const user = localStorage.getItem("user")
        if (user) {
            this.setState({ user: user });
        }

        Promise.all([
            fetch('http://flip3.engr.oregonstate.edu:7272/eachgroup?group=' + grouppath),
            fetch('http://flip3.engr.oregonstate.edu:7272/groupjoined?username=' + user + '&group=' + grouppath)
        ])
            .then(([res1, res2]) => Promise.all(
                [
                    res1.json(),
                    res2.json()
                ]))
            .then(([res1, res2]) => {
                this.setState({
                    data: res1,
                    joined: res2
                });
            })
    };

    logIn(username) {
        this.setState({ user: username })
    };

    joinGroup = async (x, y) => {

        fetch('http://flip3.engr.oregonstate.edu:7272/groups', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                group_name: x,
                user_name: y
            })
        })
            .then(response => response.json())
            .catch(err => console.log(err))

        window.location.reload(false);
    }

    leaveGroup = async (x, y) => {

        fetch('http://flip3.engr.oregonstate.edu:7272/groups?groupname=' + x + '&username=' + y, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .catch(err => console.log(err))

        window.location.reload(false);
    }


    render() {
        let groupname = ""
        let groupdes = ""
        let joined = 0
        let username = ""
        if (this.state.joined != null) {
            groupname = this.state.data[0].group_name
            groupdes = this.state.data[0].description
            joined = this.state.joined[0].joined
            username = this.state.user
        }
        let button;
        if (joined === 0) {
            button = <button onClick={() => this.joinGroup(groupname, username)}>Join Group</button>
        } else {
            button = <button onClick={() => this.leaveGroup(groupname, username)}>Leave Group</button>;
        }
        return (
            <div>
                < Header func={this.logIn.bind(this)} user={this.state.user} />
                <div style={{ paddingTop: "100px" }}>
                    <h2>{groupname}</h2>
                    {button}
                    <br />
                    <p>Description: {groupdes}</p>
                </div>
                <div>
                    <GroupPosts username={this.state.user} group_name={groupname} />
                </div>
            </div>
        );
    }
};

export default EachGroups;