import React, { Component } from 'react';
import LISelect from './li.select.jsx';
import './App.css';

interface UIselectProps {
  options: any;
  widthObj: number;
  tabIndex: number;
  firstoption: string;
  flagOpen: boolean;
  getOptionSelected: Function;
  getOpenCloseDropdown: Function;
}

interface UIselectState {
  flagArrow: boolean;
  optionSel: string;
}
let flagFocus=false;

class UISelect extends Component<UIselectProps, UIselectState> {
  constructor(props: UIselectProps) {
    super(props);
    this.objectFocusFunc = this.objectFocusFunc.bind(this);
    this.OptionSelectedFn = this.OptionSelectedFn.bind(this);
  }

  objectFocusFunc(){
    flagFocus = !flagFocus;
    setTimeout(() => {
      this.props.getOpenCloseDropdown(!this.props.flagOpen, this.props.tabIndex, this.props.options);
    }, 200);
  }
  
  /* printing it’s name and id to console */
  OptionSelectedFn(idLI:number, nameLI:string) {
    this.props.getOptionSelected(idLI, nameLI, this.props.tabIndex, this.props.options);
  }

  render() {
    return (
      <div>
        <div 
          className="textSelect" 
          onClick={this.objectFocusFunc} 
          onBlur={this.objectFocusFunc}
        >
          <i className={( this.props.flagOpen === false ) ? "fa fa-caret-down caret-down-icon" : "fa fa-caret-up caret-down-icon"}></i>
          <input 
            type="text" 
            value={this.props.firstoption} 
            tabIndex={this.props.tabIndex} 
            readOnly 
          />
        </div>
        <div className={( this.props.flagOpen === false ) ? "listSelect" : "listSelect active"}>
          <div>
            <ul className="select">
            {
              this.props.options.map((option: DataProps, index: number) => 
              <li key={option.id} className={(this.props.firstoption === option.name) ? "actionSelect" : ""}>
              <LISelect 
                nameLI = {option.name}
                idLI = {option.id}
                widthObj = {this.props.widthObj}
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