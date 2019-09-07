import PropTypes from 'prop-types';
import React from 'react';
import ItemList from './ItemList';

const filter = (item) => {
  return item !== null && !item.deleted && item.type === 'story';
};

const StoryList = ({ stories }) => <ItemList items={stories} batchSize={15} filter={filter} />;

StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
};

export default StoryList;
