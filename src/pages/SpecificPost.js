import React from 'react';
import Buttons from '../components/Buttons';
import Comments from '../components/Comments';
import Header from '../components/Header';
class SpecificPost extends React.Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (

      <div>
        <Header />
        <div style={{ border: '2px solid', margin: '8px', marginRight: '30%', marginTop: '115px' }}>

          <h1>{this.props.location.state.title}</h1>

          <h5>{"Posted By: " + this.props.location.state.author}</h5>
          {this.props.location.state.group ?
            <h6>{"Posted In: " + this.props.location.state.group}</h6>
            : null}
          <p>{this.props.location.state.content}</p>
          <p>Posted On: {this.props.location.state.create_date}</p>
          <Comments post_id={this.props.location.state.post_id} />
        </div>
      </div>
    );
  }
};

export default SpecificPost;