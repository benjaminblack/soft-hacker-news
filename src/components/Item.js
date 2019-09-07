/* eslint no-unused-vars: off */
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Item.css';

const Item = (props) => {
  const { el = 'li', by, descendants, id, time, title, url, text, className = 'item' } = props;

  return React.createElement(
    el,
    { className },
    <React.Fragment>
      {title && (
        <h4 className="item-title">
          <a className="item-link" href={url}>
            {title}
          </a>
        </h4>
      )}

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

        {descendants !== undefined && (
          <React.Fragment>
            {' with '}

            <Link className="item-comments" to={`/post?id=${id}`}>
              {descendants}
            </Link>

            {' comments'}
          </React.Fragment>
        )}
      </p>
      {text && <div className="item-text" dangerouslySetInnerHTML={{ __html: text }} />}
    </React.Fragment>
  );
};

Item.propTypes = {
  el: PropTypes.string,
  by: PropTypes.string,
  descendants: PropTypes.number,
  id: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  title: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string,
};

export default Item;
