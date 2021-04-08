
import './style.scss';

import React, { Component } from 'react';

class Footer extends Component {
  handeDone = () => {
    this.props.done();
  }
  handeUnfinished = () => {
    this.props.unfinished();
  }
  handeDelete = () => {
    this.props.deletes();
  }
  handeAll = () => {
    this.props.all();
  }
  render() {
    return (
      <div className="bt">
        <button onClick={this.handeDone}>Đã hoàn thành</button>
        <button onClick={this.handeUnfinished}>Chưa hoàn thành</button>
        <button onClick={this.handeDelete}>Xóa đã hoàn thành</button>
        <button onClick={this.handeAll}>Show All</button>
      </div>
    );
  }
}
export default Footer;

