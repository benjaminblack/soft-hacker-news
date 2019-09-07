import PropTypes from 'prop-types';
import React from 'react';
import '../stylesheets/Post.css';
import Item from './Item';
import ItemIterator from './ItemIterator';
import ItemQuery from './ItemQuery';

const CommentList = ({ comments }) => (
  <ul className="comments">
    {comments.map((comment) => {
      const { id, by, time, text } = comment;

      return <Item el="li" key={id} id={id} by={by} time={time} text={text} />;
    })}
  </ul>
);

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

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

              {kids ? (
                <ItemIterator ids={kids}>
                  {({ items, loading, allItemsLoaded, loadMore }) => (
                    <React.Fragment>
                      <CommentList comments={items} />

                      {!allItemsLoaded && (
                        <button className="load-more" onClick={loadMore} disabled={loading}>
                          {loading ? 'Loading...' : 'Load more'}
                        </button>
                      )}
                    </React.Fragment>
                  )}
                </ItemIterator>
              ) : (
                <h2>No comments</h2>
              )}
            </article>
          );
        }}
      </ItemQuery>
    );
  }
}

export default Post;
