import PropTypes from 'prop-types';
import React from 'react';
import '../stylesheets/Post.css';
import Item from './Item';
import ItemIterator from './ItemIterator';

const CommentList = ({ comments }) => {
  return comments ? (
    <ItemIterator ids={comments}>
      {({ items, loading, allItemsLoaded, loadMore }) => (
        <React.Fragment>
          <ul className="comments">
            {items.map((comment) => {
              const { id, by, time, text } = comment;

              return <Item el="li" key={id} id={id} by={by} time={time} text={text} />;
            })}
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
};

CommentList.propTypes = {
  comments: PropTypes.array,
};

export default CommentList;
