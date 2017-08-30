import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';


class PostsShow extends Component {
  constructor() {
    super();

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    // fetch only if we do not have a post already loaded
    if (!this.props.post) {
      // access url wildcard parameter provided my react-router-dom
      // params will have all the named wildcard from teh url
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deletePost(id)
      .then(() => this.props.history.push('/'));
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.catergories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// second argument is the props object headed to the component PostsShow
// ownProps is equivalent to this.props in the component line 10
// fyi { posts } in arguments is equivalent to state.posts
function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
