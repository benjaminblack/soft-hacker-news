import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import '../stylesheets/User.css';
import ItemQuery from './ItemQuery';
import StoryList from './StoryList';

const UserProfile = ({ user: { id, created, karma, about } }) => (
  <header className="user-profile">
    <h1 className="user-id">{id}</h1>
    <p className="user-metadata">
      {created && (
        <React.Fragment>
          {'joined '}
          <span className="user-joined">{moment(created * 1000).format('M/D/Y, h:mm A')}</span>{' '}
        </React.Fragment>
      )}
      {karma && (
        <React.Fragment>
          {'has '}
          <span className="user-karma">{karma}</span>
          {' karma'}
        </React.Fragment>
      )}
    </p>
    {about && <p className="user-about">{about}</p>}
  </header>
);

UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
    karma: PropTypes.number.isRequired,
    about: PropTypes.string,
    submitted: PropTypes.array,
    delay: PropTypes.number,
  }),
};

class User extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  render() {
    return (
      <ItemQuery search={this.props.location.search} endpoint="user">
        {({ loading, item: user, error }) => {
          if (loading) {
            return <h1>Loading</h1>;
          }

          if (error) {
            return <h1>Error</h1>;
          }

          return (
            <article className="user">
              <UserProfile user={user} />
              <h2 className="user-posts">Posts</h2>
              <StoryList stories={user.submitted} />
            </article>
          );
        }}
      </ItemQuery>
    );
  }
}

export default User;
