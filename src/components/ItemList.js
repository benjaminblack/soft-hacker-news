import PropTypes from 'prop-types';
import React from 'react';
import '../stylesheets/ItemList.css';
import Item from './Item';
import ItemIterator from './ItemIterator';
import LoadMoreButton from './LoadMoreButton';

const ItemList = ({ items, batchSize, filter }) => {
  return (
    <ItemIterator ids={items} batchSize={batchSize} filter={filter}>
      {({ items, loading, allItemsLoaded, loadMore }) => (
        <React.Fragment>
          <ul className="item-list">
            {items.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </ul>

          {!allItemsLoaded && (
            <LoadMoreButton loadMore={loadMore} loading={loading} />
          )}
        </React.Fragment>
      )}
    </ItemIterator>
  );
};

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  batchSize: PropTypes.number,
  filter: PropTypes.func,
};

export default ItemList;
