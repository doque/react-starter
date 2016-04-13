import React from 'react';
import moment from 'moment';

/*eslint-disable */
import styles from './Time.scss';
/*eslint-enable */

moment.locale(navigator.language.substr(0, 2));

export default class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: props.currentTime || new Date().getTime(),
    };
  }

  componentDidMount() {
    this.tick();
  }

  tick(interval = 1000) {
    setInterval(() => {
      const currentTime = new Date().getTime();
      this.setState({ currentTime });
    }, interval);
  }

  render() {
    const now = moment(this.state.currentTime);

    return (
      <div className="time">
        <div className="time__currentTime">{ now.format('LL, LTS') }</div>
      </div>
    );
  }

}

Time.displayName = 'Time';
Time.propTypes = {
  currentTime: React.PropTypes.Object,
};
