/* eslint no-unused-vars: off */
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import '../stylesheets/User.css';
import { getItem } from '../utils/api';
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
      {about && <p className="user-about">{about}</p>}
    </p>
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

class QueryUser extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
  };

  state = {
    loading: true,
    item: null,
    error: false,
  };

  async componentDidMount() {
    try {
      const itemId = new URLSearchParams(this.props.location.search).get('id');

      if (!itemId) {
        throw new Error('id not specified');
      }

      const item = await getItem(itemId, 'user');

      if (!item) {
        throw new Error('item not found');
      }

      this.setState({ item, loading: false });
    } catch (e) {
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    return this.props.children(this.state);
  }
}

class User extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  render() {
    return (
      <QueryUser location={this.props.location}>
        {({ loading, item: user, error }) => {
          if (loading) {
            return <h1>Loading</h1>;
          }

          if (error) {
            return <h1>Error</h1>;
          }

          return (
            <React.Fragment>
              <UserProfile user={user} />
              <h2 className="user-posts">Posts</h2>
              <StoryList stories={user.submitted} />
            </React.Fragment>
          );
        }}
      </QueryUser>
    );
  }
}

export default User;
