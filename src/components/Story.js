import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Story.css';

const Story = (props) => {
  const { el = 'li', by, descendants, id, time, title, url, className = 'story' } = props;

  return React.createElement(
    el,
    { className },
    <React.Fragment>
      <h4 className="story-title">
        <a className="story-link" href={url}>
          {title}
        </a>
      </h4>

      <p className="story-metadata">
        {'by '}

        <Link className="story-by" to={`/user/?id=${by}`}>
          {by}
        </Link>

        {' on '}

        {moment(time * 1000).format('M/D/Y, h:mm A')}

        {descendants !== undefined && (
          <React.Fragment>
            {' with '}

            <Link className="story-comments" to={`/post?id=${id}`}>
              {descendants}
            </Link>

            {' comments'}
          </React.Fragment>
        )}
      </p>
    </React.Fragment>
  );
};

Story.propTypes = {
  el: PropTypes.string,
  by: PropTypes.string.isRequired,
  descendants: PropTypes.number,
  id: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  className: PropTypes.string,
};

export default Story;
