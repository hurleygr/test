import React from 'react';

class WriteComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: "", showComment: false}
        this.update_comments = this.update_comments.bind(this);
    };
    show_comment_input () {
        this.setState({showComment : true})
    };

    hide_comment_input () {
        this.setState({showComment: false})
    };

    content_change (e) {
        this.setState({content: e.target.value})
    };

    update_comments (e) {
        e.preventDefault();

        const arr = [];
        arr.push(this.state.content);
        this.props.update(arr);
        this.hide_comment_input();
    };

    render() {
        return (
            <div>
                <button onClick={this.show_comment_input.bind(this)}>
                 Write A Comment
              </button>
            {this.state.showComment ?
            <form onSubmit={this.update_comments}>
                <label style = {{marginLeft: "10px"}}>
                    <input type="text" placeholder="Enter Comment Body" style = {{width: "400px"}} onChange ={this.content_change.bind(this)}/>
                </label>
                
                <input type="submit" value="Submit" />
            </form>
            : null }
            </div>
        );
    }};

export default WriteComment;

