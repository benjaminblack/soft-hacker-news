import PropTypes from 'prop-types';
import React from 'react';
import '../stylesheets/Post.css';
import Item from './Item';
import ItemIterator from './ItemIterator';

const CommentList = ({ comments }) =>
  comments ? (
    <ItemIterator ids={comments}>
      {({ items, loading, allItemsLoaded, loadMore }) => (
        <React.Fragment>
          <ul className="comments">
            {items.map((comment) => (
              <Item key={comment.id} item={comment} el="li" />
            ))}
          </ul>

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
  );

CommentList.propTypes = {
  comments: PropTypes.array,
};

export default CommentList;
