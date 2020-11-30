import React from 'react';

class WriteGroupPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: "", content: "", showPost: false }
        this.update_posts = this.update_posts.bind(this);
    };
    show_post_input() {
        this.setState({ showPost: true })
    };

    hide_post_input() {
        this.setState({ showPost: false })
    };

    title_change(e) {
        this.setState({ title: e.target.value })
    };

    content_change(e) {
        this.setState({ content: e.target.value })
    };


    update_posts(e) {
        const arr = [];
        arr.push(this.state.title);
        arr.push(this.state.content);
        arr.push(this.props.username ? this.props.username : "Anonymous");
        arr.push(this.props.group)
        this.props.update(arr);
        //console.log(this.state)
        this.hide_post_input();
    };

    render() {
        return (
            <div>
                <button onClick={this.show_post_input.bind(this)}>
                    Write A Post
              </button>
                {this.state.showPost ?
                    <form onSubmit={this.update_posts}>
                        <label style={{ marginLeft: "10px" }}>
                            <input type="text" placeholder="Enter Title" style={{ width: "400px" }} onChange={this.title_change.bind(this)} />
                        </label>
                        <label style={{ marginLeft: "10px" }}>
                            <input type="text" placeholder="Enter Post Body" style={{ width: "400px" }} onChange={this.content_change.bind(this)} />
                        </label>
                        <input type="button" value="Submit" onClick={this.update_posts} />
                    </form>
                    : null}
            </div>
        );
    }
};

export default WriteGroupPost;

