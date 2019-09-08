import PropTypes from 'prop-types';
import React from 'react';
import '../stylesheets/Post.css';
import ItemList from './ItemList';

const ShowRepliesButton = ({ showReplies }) => (
  <button className="show-replies" onClick={showReplies}>
    Show Replies
  </button>
);

ShowRepliesButton.propTypes = {
  showReplies: PropTypes.func.isRequired,
};

class CommentList extends React.Component {
  static propTypes = {
    comments: PropTypes.array,
  };

  state = {
    showReplies: false,
  };

  showReplies = () => this.setState({ showReplies: true });

  nester = (comments) =>
    this.state.showReplies ? <CommentList comments={comments} /> : <ShowRepliesButton showReplies={this.showReplies} />;

  render() {
    const { comments } = this.props;

    return <ItemList items={comments} nester={this.nester} />;
  }
}

CommentList.propTypes = {
  comments: PropTypes.array,
};

export default CommentList;
