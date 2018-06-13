import React, { Component } from 'react';
import LISelect from './li.select.jsx';
import './App.css';

let flagFocus = false;

class UISelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtOptionid: this.props.options[0].id,
      txtOptionname: this.props.options[0].name,
      keyText: "",
      tabIndex: -1,
      widthObj: 100,
      indLi: 0
    };
    this.keyPressed = this.keyPressed.bind(this);
    this.inputFocusFunc = this.inputFocusFunc.bind(this);
    this.objectBlurFunc = this.objectBlurFunc.bind(this);
    this.objectOpenCloseFunc = this.objectOpenCloseFunc.bind(this);
    this.bustList = this.bustList.bind(this);
    this.selectLineData = this.selectLineData.bind(this);
    this.printData = this.printData.bind(this);
    this.OptionSelectedFn = this.OptionSelectedFn.bind(this);
  }
  
  keyPressed(e) {
    var keyCode;
    
    if (window.event)
    {
      keyCode = e.keyCode;
    }
    else if (e)
    {
      keyCode = e.which;
    }

    if(keyCode===9) {
      /*===== reaction to pressing TAB =====*/
    } else if(keyCode===38) {
      /*===== reaction to pressing arrow UP =====*/
      let numI = this.state.indLi;
      let objUL = document.getElementsByTagName("ul");
      let obj = objUL[this.state.tabIndex].getElementsByTagName("li")
      if( numI === 0 ) {
        numI = this.props.options.length-1;
      } else {
        numI--;
      }
      for(let i = 0; i < this.props.options.length; i++){
        if( i === numI ) {
          obj[numI].className = "actionSelect";
          obj[this.state.tabIndex].parentElement.parentElement.scrollTop = numI*20;
        } else {
          obj[i].className = "";
        }
      }
      this.printData(this.props.options[numI].id,this.props.options[numI].name);
      this.setState({
        indLi: numI,
        txtOptionid: this.props.options[numI].id,
        txtOptionname: this.props.options[numI].name
      });
    } else if(keyCode===40) {
      /*===== reaction to pressing arrow DOWN =====*/
      let numI = this.state.indLi;
      let objUL = document.getElementsByTagName("ul");
      let obj = objUL[this.state.tabIndex].getElementsByTagName("li")
      if( numI === this.props.options.length-1 ) {
        numI = 0;
      } else {
        numI++;
      }
      for(let i = 0; i < this.props.options.length; i++){
        if( i === numI ) {
          obj[numI].className = "actionSelect";
          obj[numI].parentElement.parentElement.scrollTop = numI*20;
        } else {
          obj[i].className = "";
        }
      }
      this.printData(this.props.options[numI].id,this.props.options[numI].name);
      this.setState({
        indLi: numI,
        txtOptionid: this.props.options[numI].id,
        txtOptionname: this.props.options[numI].name
      });
    } else if(keyCode===13) {
      /*===== reaction to pressing ENTER =====*/
      if(this.state.tabIndex !== -1) {
        //let myObj = document.getElementsByTagName("input");
        this.objectOpenCloseFunc();
      }
    } else {
      let arrCode = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 186, 188, 190, 219, 221, 222];
      let numDop = 0;
      for(let i=0; i<=arrCode.length;i++) {
        if(arrCode[i] === keyCode) {
          numDop = keyCode;
        }
      }
      if(numDop !== 0) {
        let keyText = this.state.keyText + e.key;
        this.setState({
          keyText: keyText
        });
        let myObjChild = document.getElementsByClassName("select");
        for (let i = 0; i < this.props.options.length; i++) {
          if( i === (+this.state.tabIndex) ) {
            this.setState({
              indLi: this.selectLineData(myObjChild[i]),
              tabIndex: i
            });
          }
        }
      }
    }
  }
/* checking the focus. */
  inputFocusFunc(event) {
    this.objectBlurFunc();
    let evn = document.activeElement;
    let tabIndex;

    if (!evn || evn === document.body)
    evn = null;
    else if (document.querySelector)
    evn = document.querySelector(":focus");
    
    let myObj = document.getElementsByTagName("input");
    let widthEl;
    for (let i = 0; i < myObj.length; i++) {
      if( myObj[i] === evn ) {
        myObj[i].className = "actionSelect";
        tabIndex = i;
        this.state.tabIndex = i;
        this.state.widthObj = myObj[i].offsetWidth;
        widthEl = myObj[i].offsetWidth;
      } 
    }
    this.setState({
      tabIndex: tabIndex,
      widthObj: widthEl
    });
  }
/* loss of focus. */
  objectBlurFunc() {
    let myObj = document.getElementsByTagName("input");
    let myObjList = document.getElementsByClassName("listSelect");
    for(let i = 0; i < myObj.length; i++) {
      myObjList[i].className = "listSelect";
      myObj[i].className = "";
    }
  }
/* reaction to pressing ENTER. Opens and closes DropDown. */
  objectOpenCloseFunc(){
    let myObj = document.getElementsByTagName("input");
    let myObjList = document.getElementsByClassName("listSelect");
    if( myObjList[this.state.tabIndex].className === "listSelect")  {
      myObjList[this.state.tabIndex].className += " active";
      myObj[this.state.tabIndex].className = "activeInp";
      this.bustList(myObj[this.state.tabIndex].value);
      let obj = document.getElementsByTagName("li");
      obj[this.state.indLi].className = "actionSelect";
      obj[this.state.indLi].parentElement.parentElement.scrollTop = this.state.indLi*20;
    } else {
      myObjList[this.state.tabIndex].className = "listSelect";
      myObj[this.state.tabIndex].className = "";
    }
  }
  /* Bust list. Determine the selected item. */
  bustList(item) {
    let indLi; 
    for(let i = 0; i < this.props.options.length; i++){
      indLi = (this.props.options[i].name).includes(item) ? i : 0;
    }
    this.setState({
      indLi: indLi
    });
  }
  OptionSelectedFn(event, idLI, nameLI) {
    this.printData(idLI,nameLI);
    this.bustList(nameLI);
    this.setState({
      txtOptionid: idLI,
      txtOptionname: nameLI
    });
    this.objectBlurFunc();
  }
  selectLineData(elem) {
    let obj = elem.getElementsByTagName("li");
    let numId = 0;
    for(let i = 0; i < this.props.options.length; i++){
      obj[i].className = "";
    }
    for(let i = 0; i < this.props.options.length; i++){
      if(+numId === 0) {
        if( (this.props.options[i].name).substr(0,this.state.keyText.length).indexOf(this.state.keyText) > -1 ){
          numId = i;
          obj[numId].className = "actionSelect";
          elem.parentElement.scrollTop = numId*2;
          this.setState({
            txtOptionname: this.props.options[i].name,
            txtOptionid: this.props.options[i].id,
            indLi: i
          });
          break;
        }
      }
    }
    return numId;
  }
  /* printing it’s name and id to console */
  printData(idSel,nameSel){
    console.clear();
    console.log("id:  "+idSel+"\nname:  "+nameSel);
  }
  render() {
    document.onkeydown = this.keyPressed;
    return (
      <div className="dropdownCls">
        <div className="textSelect" >
          <input 
            type="text" 
            value={this.state.txtOptionname} 
            onClick={this.objectOpenCloseFunc} 
            onFocus={this.inputFocusFunc}
            onBlur={this.objectBlurFunc} 
            readOnly 
          />
        </div>
        <div className="listSelect">
         <div>
            <ul className="select">
             {
              this.props.options.map((option, index) => 
              <li key={option.id} className={(this.props.firstoption === option.name) ? "actionSelect" : ""}>
              <LISelect 
                nameLI = {option.name}
                idLI = {option.id}
                widthObj = {this.state.widthObj}
                functionOptionSelected = {this.OptionSelectedFn}
              />
              </li>
            )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default UISelect