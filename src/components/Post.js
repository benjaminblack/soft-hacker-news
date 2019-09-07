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

          const { by, descendants, id, time, title, url, kids } = post;

          return (
            <article className="post">
              <Item
                el="header"
                key={id}
                by={by}
                descendants={descendants}
                id={id}
                time={time}
                title={title}
                url={url}
              />

              <CommentList comments={kids} />
            </article>
          );
        }}
      </ItemQuery>
    );
  }
}

export default Post;
