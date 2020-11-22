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
        this.deletePost = this.deletePost.bind(this);
    }
	componentDidMount() {
          fetch('http://flip3.engr.oregonstate.edu:1135/posts')
          .then(response => response.json())
          .then(json => this.setState({data: json}));
	  //console.log(this.state);        
//.then(json => this.setState(json))
        }

    createPost(arr) {
 	fetch('http://flip3.engr.oregonstate.edu:1135/posts', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: arr[0],
              content: arr[1],
              create_date: arr[3],
              author: arr[2],
              group: arr[4]
            })
          })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.log(err));      
        const new_state = this.state;
        new_state.titles.unshift(arr[0])
        new_state.authors.unshift(arr[1])
        new_state.contents.unshift(arr[2])
        new_state.create_dates.unshift(arr[3])
        new_state.groups.unshift(arr[4])
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
    return (
        <div style = {{margin:"40px"}}>
            <WritePost update = {this.createPost} username = {this.props.username}/>
	    {this.state.data.length ? this.state.data.map((state, idx) => {
                return (<Post
                title = {state.title}
                author={state.author} 
                content={state.content} 
                create_date = {state.create_date}
                group = {state.group}
                id = {idx}
                editfunc = {this.editPost}
                deletefunc = {this.deletePost}
                />
                )
            }): null }
        </div> 
);
} }
export default Posts;
