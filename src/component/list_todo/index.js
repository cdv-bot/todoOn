import Footer from '../footer';
import Header from '../header';
import './style.scss';

import React, { Component } from 'react';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.focusRef = React.createRef();
    let list = JSON.parse(localStorage.getItem("list"));
    this.state = {
      num: list || [],
      toggle: {
        check: true,
        id: null
      },
      valueFix: ""

    }
  }

  pushArr = arrs => {
    let a = JSON.stringify(arrs);
    localStorage.setItem('list', a);
  }

  // thêm value
  handlerValues = x => {
    const { num } = this.state;
    let c = JSON.parse(localStorage.getItem("list"));

    if (num.length === 0) {
      let arr = [];
      let id = 1;
      let obj = {
        id: id,
        value: x,
        check: false
      }
      arr.push(obj);

      this.pushArr(arr);

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

      this.pushArr(arr);

      this.setState({
        num: arr
      });

    }
  }

  //hoàn thành
  handlerCheck = id => {
    let c = JSON.parse(localStorage.getItem("list"));

    const { num } = this.state;
    let index = num.findIndex(x => {
      return x.id === id;
    });


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

    this.pushArr(arrs);

  }

  // _---------------------
  //double click show input
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
  //value fix
  onValueFix = e => {
    let value = e.target.value;
    this.setState({
      valueFix: value
    });
  }

  //submit Fix
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

      this.pushArr(arr);
    }

    this.setState({
      toggle: {
        check: false,
        id: null
      }
    })

    // ẩn input
  }

  //outfocus 
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
  //đã hoàn thành
  handeDone = () => {
    let c = JSON.parse(localStorage.getItem("list"));
    let arr = c.filter(x => {
      return x.check === true;
    });

    this.setState({
      num: arr
    })
  }

  //chưa xong
  handeUfinished = () => {
    let c = JSON.parse(localStorage.getItem("list"));
    let arr = c.filter(x => {
      return x.check === false;
    });

    this.setState({
      num: arr
    })
  }

  //xóa
  handeDelete = () => {
    let c = JSON.parse(localStorage.getItem("list"));
    let arr = c.filter(x => {
      return x.check === false;
    });

    this.setState({
      num: arr
    });

    this.pushArr(arr);
  }

  //show all
  handeAll = () => {
    let c = JSON.parse(localStorage.getItem("list"));
    this.setState({
      num: c
    })
  }


  //delete one
  handeDeleteOne = (id) => {
    let c = JSON.parse(localStorage.getItem("list"));
    let index = c.findIndex(x => x.id === id);
    let arr = [...c];
    arr.splice(index, 1)
    this.setState({
      num: arr
    });

    this.pushArr(arr);
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
          <div id={key.id} onClick={() => this.handlerCheck(key.id)} >
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
          <i className="fas fa-times" onClick={() => this.handeDeleteOne(key.id)}></i>
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




