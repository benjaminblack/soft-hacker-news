import PropTypes from 'prop-types';
import React from 'react';
import { getItem } from '../utils/api';

class ItemQuery extends React.Component {
  static propTypes = {
    search: PropTypes.string.isRequired,
    endpoint: PropTypes.string,
    children: PropTypes.func.isRequired,
  };

  state = {
    loading: true,
    item: null,
    error: false,
  };

  async componentDidMount() {
    try {
      const { search, endpoint = 'item' } = this.props;

      const itemId = new URLSearchParams(search).get('id');

      if (!itemId) {
        throw new Error('id not specified');
      }

      const item = await getItem(itemId, endpoint);

      if (!item) {
        throw new Error('item not found');
      }

      this.setState({ item, loading: false });
    } catch (e) {
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    return this.props.children(this.state);
  }
}

export default ItemQuery;
