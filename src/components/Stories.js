import PropTypes from 'prop-types';
import React from 'react';
import '../stylesheets/Stories.css';
import { getStories } from '../utils/api';
import StoryList from './StoryList';

class Stories extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
  };

  state = {
    loading: true,
    storyIds: null,
  };

  async componentDidMount() {
    const { type } = this.props;

    const storyIds = await getStories(type);

    this.setState({ storyIds, loading: false });
  }

  render() {
    const { loading, storyIds } = this.state;

    if (loading) {
      return <h1>Loading&hellip;</h1>;
    }

    return <StoryList stories={storyIds} />;
  }
}

export default Stories;
