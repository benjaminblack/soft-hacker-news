import PropTypes from 'prop-types';
import React from 'react';
import '../stylesheets/StoryList.css';
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
          <ul className="story-list">{items.map((item) => (item ? <Item key={item.id} item={item} /> : null))}</ul>

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
