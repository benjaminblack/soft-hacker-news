import PropTypes from 'prop-types';
import React from 'react';
import '../stylesheets/Post.css';
import ItemIterator from './ItemIterator';
import Item from './Item';
import LoadMoreButton from './LoadMoreButton';

class NestedComments extends React.Component {
  state = {
    showNested: false,
  };

  static propTypes = {
    comments: PropTypes.array.isRequired,
  };

  render() {
    if (!this.state.showNested) {
      return (
        <button className="show-replies" onClick={() => this.setState({ showNested: true })}>
          Show Replies&hellip;
        </button>
      );
    } else {
      return <CommentList comments={this.props.comments} />;
    }
  }
}

class CommentList extends React.Component {
  static propTypes = {
    comments: PropTypes.array,
  };

  render() {
    const { comments } = this.props;

    return (
      <ItemIterator ids={comments}>
        {({ items, loading, allItemsLoaded, loadMore }) => (
          <React.Fragment>
            <ul className="item-list">
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <Item item={item} />
                  {item.kids && <NestedComments comments={item.kids} />}
                </React.Fragment>
              ))}
            </ul>

            {!allItemsLoaded && <LoadMoreButton loadMore={loadMore} loading={loading} />}
          </React.Fragment>
        )}
      </ItemIterator>
    );
  }
}

export default CommentList;
