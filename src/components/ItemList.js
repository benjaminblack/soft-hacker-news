import React from 'react';
import PropTypes from 'prop-types';
import { itemsIterator } from '../utils/api';

const DEFAULT_BATCH_SIZE = 5;

class ItemList extends React.Component {
  static propTypes = {
    ids: PropTypes.array.isRequired,
    batchSize: PropTypes.number,
    children: PropTypes.func.isRequired,
  };

  state = {
    iterator: null,
    items: [],
    loading: true,
    allItemsLoaded: false,
  };

  loadMore = async () => {
    await new Promise((resolve) => this.setState({ loading: true }, resolve));

    const { iterator } = this.state;

    const { value: moreItems, done: allItemsLoaded } = await iterator.next();

    this.setState(({ items }) => ({
      items: [...items, ...moreItems],
      allItemsLoaded,
      loading: false,
    }));
  };

  async componentDidMount() {
    const { ids, batchSize = DEFAULT_BATCH_SIZE } = this.props;
    this.setState({ iterator: await itemsIterator(ids, batchSize) }, () => this.loadMore());
  }

  render() {
    const { items, loading, allItemsLoaded } = this.state;
    const loadMore = this.loadMore;
    return this.props.children({ items, loading, allItemsLoaded, loadMore });
  }
}

export default ItemList;
