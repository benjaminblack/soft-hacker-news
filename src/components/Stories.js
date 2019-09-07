import PropTypes from 'prop-types';
import React from 'react';
import '../stylesheets/Stories.css';
import { getStories } from '../utils/api';
import Loading from './Loading';
import StoryList from './StoryList';

class Stories extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
  };

  state = {
    loading: true,
    storyIds: null,
  };

  async componentDidMount() {
    const { endpoint } = this.props;

    const storyIds = await getStories(endpoint);

    this.setState({ storyIds, loading: false });
  }

  render() {
    const { loading, storyIds } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <article className="stories">
        <StoryList stories={storyIds} />
      </article>
    );
  }
}

export default Stories;
