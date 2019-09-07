import React from 'react';
import PropTypes from 'prop-types';
import Story from './Story';
import { getAllStoryIds } from '../utils/api';
import '../stylesheets/Stories.css';
import ItemList from './ItemList';

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

    const storyIds = await getAllStoryIds(type);

    this.setState({ storyIds, loading: false });
  }

  render() {
    const { loading, storyIds } = this.state;

    if (loading) {
      return <h1>Loading&hellip;</h1>;
    }

    return (
      <ItemList ids={storyIds} batchSize={15}>
        {({ items, loading, allItemsLoaded, loadMore }) => (
          <React.Fragment>
            <ul className="stories">
              {items.map((item) => {
                const { by, descendants, id, time, title, url } = item;

                return <Story key={id} by={by} descendants={descendants} id={id} time={time} title={title} url={url} />;
              })}
            </ul>

            {!allItemsLoaded && (
              <button className="load-more" onClick={loadMore} disabled={loading}>
                {loading ? 'Loading...' : 'Load more'}
              </button>
            )}
          </React.Fragment>
        )}
      </ItemList>
    );
  }
}

export default Stories;
