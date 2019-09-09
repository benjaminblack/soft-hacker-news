import React from 'react';
import PropTypes from 'prop-types';

const LoadMoreButton = ({ loading, loadMore }) => (
  <button className="load-more" onClick={loadMore} disabled={loading}>
    {loading ? 'Loading...' : 'Load more'}
  </button>
);

LoadMoreButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
};

export default LoadMoreButton;
