import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: 0,
    right: 0,
    marginTop: '20px',
    textAlign: 'center',
  },
};

class Loading extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number,
  };

  state = {
    content: this.props.text,
  };

  static defaultProps = {
    speed: 100,
    text: 'Loading',
  };

  componentDidMount() {
    const { text, speed } = this.props;

    this.interval = window.setInterval(() => {
      this.state.content === text + '...'
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + '.' }));
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return <p style={styles.content}>{this.state.content}</p>;
  }
}

export default Loading;
