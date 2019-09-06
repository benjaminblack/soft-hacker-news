import React from 'react';
import { getStoriesIterator } from '../utils/api';

class TopStories extends React.Component {
  state = {
    storiesIterator: null,
    stories: [],
  };

  appendStories = (newStories) => {
    this.setState(
      ({ stories }) => ({
        stories: [...stories, ...newStories],
      }),
      () => console.log(this.state)
    );
  };

  async componentDidMount() {
    const storiesIterator = getStoriesIterator('top');

    this.setState({ storiesIterator });

    this.appendStories((await storiesIterator.next()).value);
  }

  render() {
    return <h1>Top</h1>;
  }
}

export default TopStories;
