import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  // immediately run after component renders
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    // mapping over objects, using lodash
    // when returning jsx, use () instead of {}
    const postList = _.map(this.props.posts, post => (
      <li className="list-group-item" key={post.id} >
        {post.title}
      </li>
    ),
    );

    return postList;
  }

  render() {
    return (
      <div>
        <h3>Posts</h3>
        <ul className="list-group" >
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

// set state to PostsIndex;
function mapStateToProps(state) {
  return { posts: state.posts };
}

// first param is if changing state, second is mapping to props
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
