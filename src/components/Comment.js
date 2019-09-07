import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import '../stylesheets/Comment.css';

const Comment = (props) => {
  const { el = 'li', by, time, text = '(empty)' } = props;

  const createItemText = () => ({ __html: text });

  return React.createElement(
    el,
    { className: 'comment' },
    <React.Fragment>
      <p className="item-metadata">
        {'by '}
        {by ? (
          <Link className="item-by" to={`/user/?id=${by}`}>
            {by}
          </Link>
        ) : (
          <span className="item-by">(unknown)</span>
        )}
        {' on '}
        {moment(time * 1000).format('M/D/Y, h:mm A')}
      </p>

      <p className="item-text" dangerouslySetInnerHTML={createItemText()} />
    </React.Fragment>
  );
};

Comment.propTypes = {
  el: PropTypes.string,
  by: PropTypes.string,
  time: PropTypes.number.isRequired,
  text: PropTypes.string,
};

export default Comment;
