import PropTypes from 'prop-types';
import React from 'react';
import '../stylesheets/Post.css';
import CommentList from './CommentList';
import Item from './Item';
import ItemQuery from './ItemQuery';

class Post extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  render() {
    return (
      <ItemQuery search={this.props.location.search}>
        {({ loading, item: post, error }) => {
          if (loading) {
            return <h1>Loading</h1>;
          }

          if (error) {
            return <h1>Error</h1>;
          }

          return (
            <article className="post">
              <Item key={post.id} item={post} el="header" />
              <CommentList comments={post.kids} />
            </article>
          );
        }}
      </ItemQuery>
    );
  }
}

export default Post;
