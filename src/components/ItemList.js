import PropTypes from 'prop-types';
import React from 'react';
import '../stylesheets/ItemList.css';
import Item from './Item';
import ItemIterator from './ItemIterator';

const LoadMoreButton = ({ loading, loadMore }) => (
  <button className="load-more" onClick={loadMore} disabled={loading}>
    {loading ? 'Loading...' : 'Load more'}
  </button>
);

LoadMoreButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
};

const ItemList = ({ items, batchSize, filter, nester }) => {
  return (
    <ItemIterator ids={items} batchSize={batchSize} filter={filter}>
      {({ items, loading, allItemsLoaded, loadMore }) => (
        <React.Fragment>
          <ul className="item-list">
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <Item item={item} />
                {item.kids && nester(item.kids)}
              </React.Fragment>
            ))}
          </ul>

          {!allItemsLoaded && <LoadMoreButton loadMore={loadMore} loading={loading} />}
        </React.Fragment>
      )}
    </ItemIterator>
  );
};

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  batchSize: PropTypes.number,
  filter: PropTypes.func,
  nester: PropTypes.func,
};

ItemList.defaultProps = {
  nester: () => null,
};

export default ItemList;
