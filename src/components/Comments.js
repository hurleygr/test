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
        fetch('http://flip3.engr.oregonstate.edu:1135/comments?id=', this.props.post_id)
        .then(response => response.json())
        .then(json => this.setState({data: json}));
      };

    id_from_user(user){
        return fetch('http://flip3.engr.oregonstate.edu:1135/userid?username=' + user )
        .then((response) => response.json())
        .catch((err) => console.log(err))
  };
    createComment(arr) {
        this.id_from_user(this.props.username)
        .then(u => 
        fetch('http://flip3.engr.oregonstate.edu:1135/comments', {
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
	      .then(data => console.log(data))
          .catch(err => console.log(err))
        
)
       // new_state.data.push({post_id:post_id, content: arr[1] , title: arr[0], group_id: group_id, group_name: arr[3], user_name: arr[2], user_id: user_id})
//        .then(() => this.setState(new_state))
    };

    editComment(arr, idx) {
        return
    };

    deleteComment(idx) {
        return
        
    };

render() {
    return (
        <div style = {{margin:"40px"}}>
            <WriteComment update = {this.createComment} username = {this.props.username}/>

            {this.state.data.length ? this.state.data.map((state, idx) => {
                return (<Comment
                author={state.author} 
                content={state.content} 
                create_date = {state.create_date}
                idx = {idx}
	            id = {state.post_id}
                editfunc = {this.editPost}
                deletefunc = {this.deletePost}
                />
                )
            }): null }
        </div> 
    );
}}
export default Comments;
