import './style.scss';
import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }
  }

  handeValue = (e) => {
    const value = e.target.value;
    this.setState({
      text: value
    });
  }

  handlerSubmit = e => {
    const { text } = this.state;
    e.preventDefault();
    if (text.trim() !== "") {
      this.props.handlerValue(text)
      this.setState({
        text: ""
      });
    } else {
      this.setState({
        text: ""
      });
    }
  }
  render() {
    const { text } = this.state;
    return (
      <>
        <form onSubmit={this.handlerSubmit} className="submit_form" >
          <input type="text" placeholder="Mời nhập..." className="ip_submit" name="ip" required value={text} onChange={this.handeValue} />
        </form>
      </>
    );
  }
}

export default Header;
