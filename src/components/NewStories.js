import React from 'react';
import Story from './Story';
import { getStoriesIterator } from '../utils/api';
import '../stylesheets/Stories.css';

class Stories extends React.Component {
  constructor(props) {
    super(props);
    console.log(`newstories`);
  }
  state = {
    isLoadingStories: true,
    storiesIterator: null,
    stories: [],
    allStoriesLoaded: false,
  };

  loadMoreStories = async () => {
    await new Promise((resolve) => this.setState({ isLoadingStories: true }, resolve));

    const { storiesIterator } = this.state;

    const { value: moreStories, done: allStoriesLoaded } = await storiesIterator.next();

    this.setState(({ stories }) => ({
      stories: [...stories, ...moreStories],
      allStoriesLoaded,
      isLoadingStories: false,
    }));
  };

  async componentDidMount() {
    if (!this.state.storiesIterator) {
      this.setState({ storiesIterator: getStoriesIterator('new') }, () => this.loadMoreStories());
    }
  }

  render() {
    const { stories, allStoriesLoaded, isLoadingStories } = this.state;

    return (
      <React.Fragment>
        <ul className="stories">
          {stories.map((story) => {
            const { by, descendants, id, time, title, url } = story;

            return <Story key={id} by={by} descendants={descendants} id={id} time={time} title={title} url={url} />;
          })}
        </ul>

        {!allStoriesLoaded && !isLoadingStories && <button onClick={this.loadMoreStories}>Load more...</button>}
      </React.Fragment>
    );
  }
}

export default Stories;
