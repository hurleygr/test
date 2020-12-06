import React from 'react';
import Comment from './Comment';
import WriteComment from './WriteComment';


class Comments extends React.Component {
    constructor(props) {
        super(props);
        //add SELECT
        this.state = {data: []};
        this.createComment = this.createComment.bind(this);
        this.editComment = this.editComment.bind(this);
        this.deleteComment= this.deleteComment.bind(this);
        this.id_from_user = this.id_from_user.bind(this);

    }
    componentDidMount() {
        fetch('http://flip2.engr.oregonstate.edu:1135/comments?id=' + this.props.post_id)
        .then(response => response.json())
        .then(json => this.setState({data: json}));
      };

    id_from_user(user){
	  return fetch('http://flip2.engr.oregonstate.edu:1135/userid?username=' + user )
          .then((response) => response.json())
          .catch((err) => console.log(err))
  };
    async createComment(arr) {
        const user = localStorage.getItem("user")
	const u = await this.id_from_user(user)
        console.log(u, "user ", user)
	const new_state = this.state;
	const comment_id = null;
        fetch('http://flip2.engr.oregonstate.edu:1135/comments', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials' : true,
	          'Access-Control-Allow-Origin' : '*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              create_date: new Date(),
              content: arr[0],
              user_id: u.length ? u[0].user_id : 4, //arr[2],
              post_id: this.props.post_id //arr[3]
            })
          })
          .then(response => response.json())
	  .then(data => comment_id = data.insertId)
          .catch(err => console.log(err))
        

         new_state.data.push({comment_id: comment_id, post_id: this.props.post_id, content: arr[0], user_id: u, user_name: user ? user  : "Anonymous", create_date: new Date() })
         this.setState(new_state)
    };

    editComment(arr, idx) {
	    const new_state = this.state
	    fetch('http://flip2.engr.oregonstate.edu:1135/comments', {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials' : true,
              'Access-Control-Allow-Origin' : '*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              
              content: arr[0]
              comment_id: arr[1]
	    })
          })
          .then(response => response.json())
          .catch(err => console.log(err))

        new_state.data[idx]={...new_state.data[idx], content: arr[0]}
	this.setState(new_state)
    };

    deleteComment(id) {
	fetch('http://flip2.engr.oregonstate.edu:1135/comments?id=' + id, {
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
        console.log(arr)
        for (var i=0; i<arr.length; i++) {
	    if (arr[i].comment_id == id) {
		arr.splice(i,1);
		console.log(arr)
		this.setState({data: arr})
	        break;
        }}
        
    };

render() {
    console.log(this.state.data)
    return (
        <div style = {{margin:"40px"}}>
            <WriteComment update = {this.createComment} username = {this.props.username}/>

            {this.state.data.length ? this.state.data.map((state, idx) => {
                return (<Comment
                author={state.user_name} 
                content={state.content} 
                create_date = {state.create_date}
		idx = {idx}
                comment_id  = {state.comment_id}
	        post_id = {state.post_id}
                editFunc = {this.editComment}
                deleteFunc = {this.deleteComment}
                />
                )
            }): null }
        </div> 
    );
}}
export default Comments;
