import React from 'react';
import Buttons from './Buttons';
import { Link } from 'react-router-dom';


class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: this.props.id }
    }

<<<<<<< HEAD
    render() {
        return (
            <div style={{ border: '2px solid', margin: '8px', marginRight: '30%' }}>
                <Link style={{ color: "black", textDecoration: "none" }} to={{ pathname: '/specificpost', state: { create_date: this.props.create_date, author: this.props.author, title: this.props.title, content: this.props.content, group_name: this.props.group_name, post_id: this.props.post_id, idx: this.props.idx } }} >
=======
render() {
    return (
        <div style = {{border: '2px solid', margin: '8px', marginRight: '30%'}}>
            <Link style = {{color: "black", textDecoration: "none"}} to={{pathname:'/specificpost', state: {create_date: this.props.create_date, author: this.props.author, title:this.props.title, content:this.props.content, group_name:this.props.group_name, post_id:this.props.post_id, idx: this.props.idx}}} >
>>>>>>> 1d2d786608391f2097638fcf140c1acf024f1e69

                    <h1>{this.props.title}</h1>

<<<<<<< HEAD
                    <h5>{"Posted By: " + this.props.author}</h5>
                    {this.props.group_name ?
                        <h6>{"Posted In: " + this.props.group_name}</h6>
                        : null}
                    <p>{this.props.content}</p>
                    <p>{this.props.create_date}</p>
                </Link>
                <Buttons title={this.props.title} content={this.props.content} group_name={this.props.group_name} post_id={this.props.post_id} idx={this.props.idx} editfunc={this.props.editfunc} deletefunc={this.props.deletefunc} />
            </div>
        );
    }
}
export default Post;
=======
            <h5>{"Posted By: " + this.props.author}</h5>
            {this.props.group_name ?
            <h6>{"Posted In: " + this.props.group_name}</h6>
            : null}
            <p>{this.props.content}</p>
            <p>{this.props.create_date}</p>
            </Link>
            <Buttons title={this.props.title} content={this.props.content} group_name={this.props.group_name} post_id={this.props.post_id} idx={this.props.idx} editfunc={this.props.editfunc} deletefunc={this.props.deletefunc}/>
        </div> 
    );
} }
export default Post;
>>>>>>> 1d2d786608391f2097638fcf140c1acf024f1e69
