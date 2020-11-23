import React from 'react';
import Buttons from './Buttons';
import {Link} from 'react-router-dom';


class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: this.props.id}
     }

render() {
    return (
        <div style = {{border: '2px solid', margin: '8px', marginRight: '30%'}}>
            <Link style = {{color: "black", textDecoration: "none"}} to={{pathname:'/specificpost', state: {title:this.props.title, content:this.props.content, group_name:this.props.group_name, post_id:this.props.post_id}}} >

            <h1>{this.props.title}</h1>

            <h5>{"Posted By: " + this.props.author}</h5>
            {this.props.group_name ?
            <h6>{"Posted In: " + this.props.group_name}</h6>
            : null}
            <p>{this.props.content}</p>
            <p>{this.props.create_date}</p>
            </Link>
            <Buttons title={this.props.title} content={this.props.content} group={this.props.group} post_id={this.props.post_id} idx={this.props.idx} editfunc={this.props.editfunc} deletefunc={this.props.deletefunc}/>
        </div> 
    );
} }
export default Post;
