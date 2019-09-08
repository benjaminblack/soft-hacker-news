import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Item.css';
import formatDate from '../utils/formatDate';

const Item = ({ el = 'li', className = 'item', item }) => {
  const { by, descendants, id, time, title, url, text } = item;

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

        {formatDate(time)}

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
  className: PropTypes.string,
  item: PropTypes.object,
};

export default Item;
