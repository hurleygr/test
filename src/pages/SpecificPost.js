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
<<<<<<< HEAD

      <div>
        <Header />
        <div style={{ border: '2px solid', margin: '8px', marginRight: '30%', marginTop: '115px' }}>

          <h1>{this.props.location.state.title}</h1>
=======
	
        <div style = {{border: '2px solid', margin: '8px', marginRight: '30%'}}>
	< Header/ > 
            <h1>{this.props.location.state.title}</h1>
>>>>>>> 1d2d786608391f2097638fcf140c1acf024f1e69

          <h5>{"Posted By: " + this.props.location.state.author}</h5>
          {this.props.location.state.group ?
            <h6>{"Posted In: " + this.props.location.state.group}</h6>
            : null}
<<<<<<< HEAD
          <p>{this.props.location.state.content}</p>
          <p>Posted On: {this.props.location.state.create_date}</p>
          <Comments post_id={this.props.location.state.post_id} />
        </div>
      </div>
=======
            <p>{this.props.location.state.content}</p>
            <p>{this.props.location.state.create_date}</p>
            //<Buttons title={this.props.location.state.title} content={this.props.location.state.content} group={this.props.location.state.group} id={this.props.location.state.id} editfunc={this.props.location.state.editfunc} deletefunc={this.props.location.state.deletefunc} idx={this.props.location.state.idx}/>
            <Comments post_id={this.props.location.state.post_id} />
        </div> 
>>>>>>> 1d2d786608391f2097638fcf140c1acf024f1e69
    );
  }
};

export default SpecificPost;