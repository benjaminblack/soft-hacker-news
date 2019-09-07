import PropTypes from 'prop-types';
import React from 'react';
import '../stylesheets/Post.css';
import ItemList from './ItemList';

const CommentList = ({ comments }) => <ItemList items={comments} />;

CommentList.propTypes = {
  comments: PropTypes.array,
};

export default CommentList;
