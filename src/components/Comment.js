import React from 'react';


class Comment extends React.Component {
    constructor(props) {
        super(props);
<<<<<<< HEAD
        this.state = { id: this.props.comment_id, content: this.props.content, author: this.props.author, comment_id: this.props.comment_id, showEdit: false }
        this.update_comments = this.update_comments.bind(this);
        this.toggle_edit = this.toggle_edit.bind(this);
        this.delete_comment = this.delete_comment.bind(this);

    }

    toggle_edit() {
        this.setState({ showEdit: !(this.state.showEdit) })
=======
        this.state = {id: this.props.comment_id, content: this.props.content, author: this.props.author, comment_id: this.props.comment_id, showEdit: false}
        this.update_comments = this.update_comments.bind(this);
	this.toggle_edit = this.toggle_edit.bind(this);
	this.delete_comment = this.delete_comment.bind(this);
	
     }

     toggle_edit () {
        this.setState({showEdit : !(this.state.showEdit)})
>>>>>>> 1d2d786608391f2097638fcf140c1acf024f1e69
    };

    content_change(e) {
        this.setState({ content: e.target.value })
    };

    update_comments(e) {
<<<<<<< HEAD
        e.preventDefault();

        const arr = [];
        arr.push(this.state.content);
        arr.push(this.state.comment_id);
        var today = new Date();

        arr.push(today);
        this.props.editFunc(arr, this.props.idx)
        this.toggle_edit();
    };
=======
            e.preventDefault();
    
            const arr = [];
            arr.push(this.state.content);
	    arr.push(this.state.comment_id);
            var today = new Date();
           
            arr.push(today);
        this.props.editFunc(arr, this.props.idx)
        this.toggle_edit();
    };

    delete_comment() {
	this.props.deleteFunc(this.state.id)
    };
>>>>>>> 1d2d786608391f2097638fcf140c1acf024f1e69

    delete_comment() {
        this.props.deleteFunc(this.state.id)
    };

    render() {
        return (
            <div style={{ border: '2px solid', margin: '8px', marginRight: '30%' }}>


                <h5>{"Commented By: " + this.props.author}</h5>
                <h7>{"Commented On: " + this.props.create_date}</h7>

<<<<<<< HEAD
                <p>{this.props.content}</p>
                <button onClick={this.toggle_edit}>
                    Edit
            </button>
                <button onClick={this.delete_comment}>
                    Delete
=======
            <p>{this.props.content}</p>
            <button onClick={this.toggle_edit}>
                Edit
            </button>
            <button onClick={this.delete_comment}>
                Delete
>>>>>>> 1d2d786608391f2097638fcf140c1acf024f1e69
            </button>
                {this.state.showEdit ?
                    <form onSubmit={this.update_comments}>

                        <label style={{ marginLeft: "10px" }}>
                            <input type="text" placeholder="Enter Comments" defaultValue={this.props.content} style={{ width: "400px" }} onChange={this.content_change.bind(this)} />
                        </label>
                        <input type="button" onClick={this.update_comments} value="Submit" />

                    </form>
                    : null}
            </div>
        );
    }
}
export default Comment;