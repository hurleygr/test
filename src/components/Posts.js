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
          fetch('http://flip2.engr.oregonstate.edu:1135/posts')
          .then(response => response.json())
          .then(json => this.setState({data: json}));
        };
    
    id_from_user(user){
          return fetch('http://flip2.engr.oregonstate.edu:1135/userid?username=' + user )
	  .then((response) => response.json())
	  .catch((err) => console.log(err))
    };

    id_from_group(group){
        return fetch('http://flip2.engr.oregonstate.edu:1135/groupid?groupname=' + group)
        .then((response) => response.json())
	.catch((err) => console.log(err))
    };

    getGroupAndUser(user, group){
	return Promise.all([this.id_from_user(user), this.id_from_group(group)])
    }	
    async createPost(arr) {
        const new_state = this.state;
        const post_id = null;
	const user = localStorage.getItem("user");
	const create_date = new Date();
	const [user_id, group_id] = await this.getGroupAndUser(user, arr[3])
        
	


        fetch('http://flip2.engr.oregonstate.edu:1135/posts', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials' : true,
	      'Access-Control-Allow-Origin' : '*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: arr[0],
              content: arr[1],
              user_id: user_id.length ? user_id[0].user_id : 4, //arr[2],
              group_id: group_id.length ? group_id[0].group_id : null //arr[3]
            })
          })
          .then(response => response.json())
	      .then(data => post_id = data.insertId)
          .catch(err => console.log(err))
        
         new_state.data.push({create_date: create_date, post_id:post_id, content: arr[1] , title: arr[0], group_id: group_id, group_name: arr[3], user_name: user ? user: "Anonymous", user_id: user_id})
        this.setState(new_state)
    };

    async editPost(arr, idx) {
      const new_state = this.state;
      const post_id = arr[3] ;
      const group_id = await this.id_from_group(arr[2])

      const group_name = group_id.length ? arr[2] : this.state.data[idx].group_name

        fetch('http://flip2.engr.oregonstate.edu:1135/posts', {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials' : true,
              'Access-Control-Allow-Origin' : '*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: arr[0],
              content: arr[1],
              group_id: group_id.length ? group_id[0].group_id : null, //arr[3]
              post_id: post_id
	    })
          })
          .then(response => response.json())
          .catch(err => console.log(err))

        new_state.data[idx]={...new_state.data[idx], content: arr[1] , title: arr[0], group_name: group_name, group_id: group_id}
        this.setState(new_state)
    };

    deletePost(id) {
	fetch('http://flip2.engr.oregonstate.edu:1135/posts?id=' + id, {
	    method: 'DELETE',
	    headers: {
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials' : true,
                  'Access-Control-Allow-Origin' : '*',
              'Content-Type': 'application/json'
            }})
	    .then(response => response.json())
	    .catch(err => console.log(err))
	var arr = this.state.data;
	console.log(id, arr)
        for (var i=0; i<arr.length; i++) {
	    if (arr[i].post_id == id) {
		arr.splice(i,1);
		this.setState({data: arr})
	        break;
        }}
        
    };

render() {
	console.log(this.state);
    return (
        <div style = {{margin:"40px"}}>
            <WritePost update = {this.createPost} username = {this.props.username}/>
	    {this.state.data.length ? this.state.data.map((state, idx) => {
                return (<Post
                title = {state.title}
                author={state.user_name} 
                content={state.content} 
                create_date = {state.create_date}
                group_id = {state.group_id}
		group_name = {state.group_name}
                idx = {idx}
	        post_id = {state.post_id}
                editfunc = {this.editPost}
                deletefunc = {this.deletePost}
                />
                )
            }): null }
        </div> 
);
} }
export default Posts;
