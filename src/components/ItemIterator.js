import PropTypes from 'prop-types';
import React from 'react';
import { getItemIterator, DEFAULT_BATCH_SIZE } from '../utils/api';

class ItemIterator extends React.Component {
  static propTypes = {
    ids: PropTypes.array.isRequired,
    batchSize: PropTypes.number,
    children: PropTypes.func.isRequired,
    filter: PropTypes.func,
  };

  static defaultProps = {
    filter: (item) => item !== null && !item.deleted,
    batchSize: DEFAULT_BATCH_SIZE,
  };

  state = {
    iterator: null,
    items: [],
    loading: true,
    allItemsLoaded: false,
  };

  loadMore = async () => {
    this.setState({ loading: true });

    const { iterator } = this.state;
    const { filter, batchSize } = this.props;

    let moreItems = [];
    let allItemsLoaded = false;

    for (;;) {
      const { value: nextBatch, done } = await iterator.next();

      moreItems = [...moreItems, ...nextBatch.filter(filter)];
      allItemsLoaded = done;

      if (allItemsLoaded || moreItems.length >= batchSize) {
        break;
      }
    }

    this.setState(({ items }) => ({
      items: [...items, ...moreItems],
      allItemsLoaded,
      loading: false,
    }));
  };

  async componentDidMount() {
    const { ids, batchSize = DEFAULT_BATCH_SIZE } = this.props;
    this.setState({ iterator: await getItemIterator({ itemIds: ids, batchSize, endpoint: 'item' }) }, () =>
      this.loadMore()
    );
  }

  render() {
    const { items, loading, allItemsLoaded } = this.state;
    const loadMore = this.loadMore;
    return this.props.children({ items, loading, allItemsLoaded, loadMore });
  }
}

export default ItemIterator;
