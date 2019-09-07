import React from 'react';
import PropTypes from 'prop-types';
import ItemList from './ItemList';
import Comment from './Comment';
import Story from './Story';
import { getItem } from '../utils/api';
import '../stylesheets/Post.css';

class Post extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  state = {
    loading: true,
    post: null,
    error: false,
  };

  async componentDidMount() {
    try {
      const params = new URLSearchParams(location.search);
      const id = params.get('id');

      if (!id) {
        throw new Error('id not specified');
      }

      const post = await getItem(id);

      if (!post) {
        throw new Error('post not found');
      }

      this.setState({ post, loading: false });
    } catch (e) {
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    const { error, loading, post } = this.state;

    if (error) {
      return <h1>Error</h1>;
    }

    if (loading) {
      return <h1>Loading</h1>;
    }

    const { by, descendants, id, time, title, url, kids } = post;

    return (
      <article className="post">
        <Story el="header" key={id} by={by} descendants={descendants} id={id} time={time} title={title} url={url} />
        {kids ? (
          <ItemList ids={kids}>
            {({ items, loading, allItemsLoaded, loadMore }) => (
              <React.Fragment>
                <ul className="comments">
                  {items.map((comment) => {
                    const { id, by, time, text } = comment;

                    return <Comment el="li" key={id} by={by} time={time} text={text} />;
                  })}
                </ul>
                {!allItemsLoaded && (
                  <button className="load-more" onClick={loadMore} disabled={loading}>
                    {loading ? 'Loading...' : 'Load more'}
                  </button>
                )}
              </React.Fragment>
            )}
          </ItemList>
        ) : (
          <h2>No comments</h2>
        )}
      </article>
    );
  }
}

export default Post;
