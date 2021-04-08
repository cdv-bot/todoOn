import Footer from '../footer';
import Header from '../header';
import './style.scss';

import React, { Component } from 'react';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.focusRef = React.createRef();
    this.c = JSON.parse(localStorage.getItem("list"));

    this.state = {
      num: this.c || [],
      toggle: {
        check: true,
        id: null
      },
      valueFix: ""

    }
  }


  handlerValues = x => {
    let c = JSON.parse(localStorage.getItem("list"));

    if (c === null) {
      let arr = [];
      let id = 1;
      let obj = {
        id: id,
        value: x,
        check: false
      }
      arr.push(obj);

      let a = JSON.stringify(arr);
      localStorage.setItem('list', a);

      this.setState({
        num: arr
      });

    } else {
      let numId = c.length;
      let id = c[numId - 1].id + 1;
      let arr = [...c];
      let obj = {
        id: id,
        value: x,
        check: false
      }
      arr.push(obj);
      let a = JSON.stringify(arr);
      localStorage.setItem('list', a);
      this.setState({
        num: arr
      });

    }
  }

  handlerCheck = id => {
    let c = JSON.parse(localStorage.getItem("list"));

    const { num } = this.state;
    let index = num.findIndex(x => {
      return x.id === id;
    })
    let arr = [...num];

    arr[index] = {
      ...arr[index],
      check: !arr[index].check
    }

    this.setState({
      num: arr
    })

    let indexs = c.findIndex(x => {
      return x.id === id;
    })
    let arrs = [...c];

    arrs[indexs] = {
      ...arrs[indexs],
      check: !arrs[indexs].check
    }
    let a = JSON.stringify(arrs);
    localStorage.setItem('list', a);
  }

  // _---------------------
  handTogger = async (id, value) => {
    await this.setState({
      toggle: {
        check: false,
        id
      }
    });

    this.setState({
      valueFix: value
    })

    this.focusRef.current.focus();

  }

  // -------------
  onValueFix = e => {
    let value = e.target.value;
    this.setState({
      valueFix: value
    });
  }

  submitFix = e => {
    const { valueFix, num, toggle } = this.state;
    e.preventDefault();
    if (valueFix.trim() !== "") {
      let index = num.findIndex(x => {
        return x.id === toggle.id;
      });

      let arr = [...num];
      arr[index] = {
        ...arr[index],
        value: valueFix,
        check: false
      }

      this.setState({
        num: arr
      });

      let a = JSON.stringify(arr);
      localStorage.setItem('list', a);
    }

    this.setState({
      toggle: {
        check: false,
        id: null
      }
    })

    // ẩn input
  }

  an = x => {
    const { valueFix, num, toggle } = this.state;
    if (valueFix.trim() !== "") {
      let index = num.findIndex(x => {
        return x.id === toggle.id;
      });

      let arr = [...num];
      arr[index] = {
        ...arr[index],
        value: valueFix,
        check: false
      }
      this.setState({
        num: arr
      })
      let a = JSON.stringify(arr);
      localStorage.setItem('list', a);
    }

    this.setState({
      toggle: {
        check: false,
        id: null
      }
    });

  }

  // -----------footer

  handeDone = () => {
    let c = JSON.parse(localStorage.getItem("list"));
    let arr = c.filter(x => {
      return x.check === true;
    });

    this.setState({
      num: arr
    })
  }

  handeUfinished = () => {
    let c = JSON.parse(localStorage.getItem("list"));
    let arr = c.filter(x => {
      return x.check === false;
    });

    this.setState({
      num: arr
    })
  }

  handeDelete = () => {
    let c = JSON.parse(localStorage.getItem("list"));
    let arr = c.filter(x => {
      return x.check === false;
    });

    this.setState({
      num: arr
    });

    let a = JSON.stringify(arr);
    localStorage.setItem('list', a);
  }

  handeAll = () => {
    let c = JSON.parse(localStorage.getItem("list"));
    this.setState({
      num: c
    })
  }

  show = () => {
    const { valueFix, num, toggle } = this.state;
    let sort = [...num];
    sort.sort(function (a, b) {
      return b.id - a.id;
    });
    let arr = [];
    arr = sort.map((key, index) => {
      return (
        <div key={index} className="show_check" >
          <div id={key.id} onChange={() => this.handlerCheck(key.id)} onClick={() => this.handlerCheck(key.id)} >
            {
              (key.check) ?
                <i className="fas fa-check-square icon icon_top" ></i>
                : <i className="fas fa-check-square icon " ></i>
            }
          </div>
          <div className="list_data" onDoubleClick={() => this.handTogger(key.id, key.value)} >
            {
              (toggle.id !== key.id) ?
                // onClick = {() => this.handlerCheck(key.id)}
                <label onDoubleClick={() => this.handTogger(key.id, key.value)} className={`text_data ${key.check ? 'unfinished' : ''}`}>{key.value}</label>
                : <form onSubmit={this.submitFix}>
                  <input className="ip_hide" type="text" ref={this.focusRef} value={valueFix} onBlur={() => this.an(key.id)} onChange={this.onValueFix} />
                </form>
            }
          </div>
        </div >
      )
    })
    return arr;
  }


  render() {
    return (
      <div className="container">
        <Header handlerValue={this.handlerValues} />
        <div className="content" >
          <div className="positon">
            {
              this.show()
            }
          </div>
        </div>
        <Footer done={this.handeDone} unfinished={this.handeUfinished} deletes={this.handeDelete} all={this.handeAll} />
      </div>
    );
  }
}

export default Todo;




