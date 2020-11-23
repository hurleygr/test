import React from 'react';
import Post from './Post';
import WritePost from './WritePost';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        //add SELECT
        this.state = {data:[]};
        this.createPost = this.createPost.bind(this);
        this.editPost = this.editPost.bind(this);
	this.id_from_user = this.id_from_user.bind(this);
	this.id_from_group = this.id_from_group.bind(this);
	this.getGroupAndUser = this.getGroupAndUser.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }
	componentDidMount() {
          fetch('http://flip3.engr.oregonstate.edu:1135/posts')
          .then(response => response.json())
          .then(json => this.setState({data: json}));
        };
    
    id_from_user(user){
          return fetch('http://flip3.engr.oregonstate.edu:1135/userid?=' + user )
	  .then((response) => response.json())
	  .catch((err) => console.log(err))
    };

    id_from_group(group){
        return fetch('http://flip3.engr.oregonstate.edu:1135/groupid?=' + group)
        .then((response) => response.json())
	.catch((err) => console.log(err))
    };

    getGroupAndUser(user, group){
	return Promise.all([this.id_from_user(user), this.id_from_group(group)])
    }	
    createPost(arr) {
        const new_state = this.state;
        const post_id = null;
	const user_id = null;
	const group_id = null;
	this.getGroupAndUser(arr[2], arr[3])
	  .then(([u, g]) => console.log(u, g))//{group_id = group_id, user_id = user_id}
	  .catch((err) => console.log(err))
	


        fetch('http://flip3.engr.oregonstate.edu:1135/posts', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: arr[0],
              content: arr[1],
              author: user_id, //arr[2],
              group: group_id //arr[3]
            })
          })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.log(err));
        

        new_state.data.push({post_id:post_id, content: arr[1] , title: arr[0], group_id: group_id, group_name: arr[3], user_name: arr[2], user_id: user_id})
        this.setState(new_state)
    };

    editPost(arr, idx) {
        const new_state = this.state;
        new_state.titles[idx] = arr[0];
        new_state.contents[idx] = arr[1];
        new_state.groups[idx] = arr[2];
        this.setState(new_state)
    };

    deletePost(idx) {
        const new_state = this.state;
        for (var key in new_state) {
            new_state[key].splice(idx, 1)
        };
        this.setState(new_state)
    };

render() {
	console.log(this.state);
    return (
        <div style = {{margin:"40px"}}>
            <WritePost update = {this.createPost} username = {this.props.username}/>
	    {this.state.data.length ? this.state.data.map((state, idx) => {
                return (<Post
                title = {state.title}
                author={state.author} 
                content={state.content} 
                create_date = {state.create_date}
                group_id = {state.group_id}
		group_name = {state.group_name}
                idx = {idx}
	        id = {state.post_id}
                editfunc = {this.editPost}
                deletefunc = {this.deletePost}
                />
                )
            }): null }
        </div> 
);
} }
export default Posts;
