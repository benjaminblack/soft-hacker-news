import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import '../stylesheets/Story.css';

const Story = (props) => {
  const { el = 'li', by, descendants, id, time, title, url } = props;

  return React.createElement(
    el,
    { className: 'story' },
    <React.Fragment>
      <h4 className="story-title">
        <a className="story-link" href={url}>
          {title}
        </a>
      </h4>
      <p className="story-metadata">
        {'by '}
        <a className="story-by" href={`/user/?id=${by}`}>
          {by}
        </a>
        {' on '}
        {moment(time * 1000).format('M/D/Y, h:mm A')}
        {descendants !== undefined && (
          <React.Fragment>
            {' with '}
            <a className="story-comments" href={`/post?id=${id}`}>
              {descendants}
            </a>
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
};

export default Story;
