import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import '../stylesheets/Comment.css';

const Comment = (props) => {
  const { el = 'li', by, time, text } = props;

  const createItemText = () => ({ __html: text });

  return React.createElement(
    el,
    { className: 'comment' },
    <React.Fragment>
      <p className="item-metadata">
        {'by '}
        <a className="item-by-link" href={`/user/?id=${by}`}>
          {by}
        </a>
        {' on '}
        {moment(time * 1000).format('M/D/Y, h:mm A')}
      </p>

      <p className="item-text" dangerouslySetInnerHTML={createItemText()} />
    </React.Fragment>
  );
};

Comment.propTypes = {
  el: PropTypes.string,
  by: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default Comment;
