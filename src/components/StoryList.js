import PropTypes from 'prop-types';
import React from 'react';
import Item from './Item';
import ItemIterator from './ItemIterator';

const filter = (item) => {
  return item !== null && !item.deleted && item.type === 'story';
};

const StoryList = ({ stories }) => {
  return (
    <ItemIterator ids={stories} batchSize={15} filter={filter}>
      {({ items, loading, allItemsLoaded, loadMore }) => (
        <React.Fragment>
          <ul className="stories">
            {items.map((item) => {
              if (item === null) {
                return null;
              }

              const { by, descendants, id, time, title, url } = item;

              return <Item key={id} by={by} descendants={descendants} id={id} time={time} title={title} url={url} />;
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
  );
};

StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
};

export default StoryList;
