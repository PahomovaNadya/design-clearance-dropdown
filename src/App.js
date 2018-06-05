import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UISelect from './ui.select.jsx';
import FreeTextSearch from './freeTextSearch.jsx';

import data1 from './data/select1.json'
import data2 from './data/select1.json'

let newName: string="";
let newID: number;

class App extends Component {
  constructor(props: DataProps) {
    super();
    this.state = {
      txtOptiondata1: data1[0].name,
      txtOptiondata2: data2[0].name,
      txtOptiondata3: data1[0].name,
      flagCls: [false,false,false],
      flagFocus: [false,false,false],
      selectElem: [null,null,null],
      dataFocus: []
    };
    this.keyPressed = this.keyPressed.bind(this);
    this.FuncFreeTextSearch = this.FuncFreeTextSearch.bind(this);
    this.OpenCloseDropdown = this.OpenCloseDropdown.bind(this);
    this.OptionSelected = this.OptionSelected.bind(this);
    this.SelectListRelArrow = this.SelectListRelArrow.bind(this);
    this.SaveDate = this.SaveDate.bind(this);
  }
  
  /* checks which key is typed on the keyboard */
  keyPressed(e)
  {
    var keyCode;
    
    if (window.event)
    {
      keyCode = e.keyCode;
    }
    else if (e)
    {
      keyCode = e.which;
    }

    let numAct: number;
    let txtOptDT1 = this.state.txtOptiondata1;
    let txtOptDT2 = this.state.txtOptiondata2;
    let txtOptDT3 = this.state.txtOptiondata3;
    let idOptDT = this.state.selectElem;

    for(let i=0; i<this.state.flagFocus.length; i++) {
      if( this.state.flagFocus[i] === true ){
        numAct = i
      }
    }
    if(numAct !== undefined) {
      if(keyCode===38) {
/*===== reaction to pressing arrow UP =====*/
        this.SelectListRelArrow(this.state.selectElem[numAct],'-1');
      } else if(keyCode===40) {
/*===== reaction to pressing arrow DOWN =====*/
    this.SelectListRelArrow(this.state.selectElem[numAct],'1');
      } else if(keyCode===13) {
/* reaction to pressing ENTER. When double ckick does not work, the focus is lost. */
        this.SelectListRelArrow(this.state.selectElem[numAct],'0');
        this.OptionSelected (this.state.selectElem[numAct], newName, numAct, this.state.dataFocus);
      }
      switch(numAct) {
        case 0: {
          txtOptDT1 = newName;
          idOptDT[0] = newID;
          break;
        }
        case 1: {
          txtOptDT2 = newName;
          idOptDT[1] = newID;
          break;
        }
        case 2: {
          txtOptDT3 = newName;
          idOptDT[2] = newID;
          break;
        }
      }
      this.SaveDate(txtOptDT1, txtOptDT2, txtOptDT3, this.state.flagFocus, this.state.flagCls, idOptDT, this.state.dataFocus);
    }
  }

  /* printing it’s name and id to console */
  OptionSelected (evId:number, evName:string, indDrD: number, dataReturned:DataProps){
    console.log("id:    "+evId+"\nname:  "+evName);
    let txtOptDT1 = this.state.txtOptiondata1;
    let txtOptDT2 = this.state.txtOptiondata2;
    let txtOptDT3 = this.state.txtOptiondata3;
    let flagFocDr = [false,false,false];
    flagFocDr[indDrD-1] = true;
    let flagFocus = [false,false,false];
    flagFocus[indDrD-1] = true;
    switch(indDrD){
      case 1: {
        txtOptDT1 = evName;
        break;
      }
      case 2: {
        txtOptDT2 = evName;
        break;
      }
      case 3: {
        txtOptDT3 = evName;
        break;
      }
    }
    let flagSelElem = [];
    for(let i=0; i<this.state.selectElem.length; i++) {
      if( i===(indDrD-1) ) {
        flagSelElem[i] = evId;
      }
      else{
        flagSelElem[i] = this.state.selectElem[i];
      }
    }
    this.SaveDate(txtOptDT1, txtOptDT2, txtOptDT3, flagFocus, flagFocDr, flagSelElem, dataReturned);
  }

  /* It does not work on the ENTER, because the search goes on several JSON and ID may not coincide */
  FuncFreeTextSearch(txtSearch: string){
    let txtSearch1: string = this.state.txtOptiondata1;
    let txtSearch2: string = this.state.txtOptiondata2;
    let txtSearch3: string = this.state.txtOptiondata3;
    if (txtSearch) {
      for(var i=0; i<data1.length; i++) {
        if( data1[i].name.toLowerCase().includes(txtSearch.toLowerCase()) ){
          //if(txtSearch1===data1[0].name) {
            txtSearch1 = data1[i].name;
          //}
          //if(txtSearch3===data1[0].name) {
            txtSearch3 = data1[i].name;
          //}
        }
      }
      for(var i=0; i<data2.length; i++) {
        if( data2[i].name.toLowerCase().includes(txtSearch.toLowerCase()) ){
          //if(txtSearch2===data2[0].name) {
            txtSearch2 = data2[i].name;
          //}
        }
      }
    }
    this.SaveDate(txtSearch1, txtSearch2, txtSearch3, this.state.flagCls, this.state.selectElem, this.state.dataFocus);

  }

  /* determines which of the dropdown in focus */
  OpenCloseDropdown(flg:boolean, indDr:number, data:any) {
    let flagFocDr = [];
    let flagFocus = [];
    let txtSearch1: string = this.state.txtOptiondata1;
    let txtSearch2: string = this.state.txtOptiondata2;
    let txtSearch3: string = this.state.txtOptiondata3;
    
    for(let i=0; i<this.state.flagCls.length; i++) {
      if( i===(indDr-1) ) {
        flagFocDr[i] = flg;
        flagFocus[i] = true;
      }
      else {
        flagFocDr[i] = false;
        flagFocus[i] = false;
      }
    }
    this.SaveDate(txtSearch1, txtSearch2, txtSearch3, flagFocus, flagFocDr, this.state.selectElem, data);
  }

  /* from the list, relative to the arrows UP and DOWN */
  SelectListRelArrow(idDataSel: number, chOpe: string) {
    let iDop: number
    for(let i=0; i<this.state.dataFocus.length; i++) {
      if( this.state.dataFocus[i].id === idDataSel ){
        iDop = i
      }
    }
    if(iDop+(+chOpe)<0) {
      newName = this.state.dataFocus[this.state.dataFocus.length-1].name;
      newID = this.state.dataFocus[this.state.dataFocus.length-1].id;
    } 
    else if(iDop+(+chOpe)>this.state.dataFocus.length-1) {
      newName = this.state.dataFocus[0].name;
      newID = this.state.dataFocus[0].id;
    }
    else {
      newName = this.state.dataFocus[iDop+(+chOpe)].name;
      newID = this.state.dataFocus[iDop+(+chOpe)].id;
    }
  }

  SaveDate(newTxtOpt1: string, newTxtOpt2: string, newTxtOpt3: string, newFlagFocus: Array, newFlagFocDr: Array, newFlagSelElem: Array, newDataReturned: DataProps) {
    this.setState({
      txtOptiondata1: newTxtOpt1, 
      txtOptiondata2: newTxtOpt2,
      txtOptiondata3: newTxtOpt3,  
      flagFocus: newFlagFocus,        
      flagCls: newFlagFocDr,
      selectElem: newFlagSelElem,
      dataFocus: newDataReturned
    });
  }
  
  render() {
    document.onkeydown = this.keyPressed;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to my React Project</h1>
        </header>
        <div className="test-app">
          <div className="row">
            <FreeTextSearch
              getSelctedJData={this.FuncFreeTextSearch} 
              tabIndex={4} 
            />
          </div>
          <div className="col col3">
            <div className="row">
{/* When defining the class: col1, col2, col3, 
* send the parameter widthObj-width to the Component UISelect, 
* defined in the class: 100, 150, 200 respectively */}
              <UISelect 
                options={data1} 
                firstoption={this.state.txtOptiondata1} 
                widthObj={200} 
                flagOpen={this.state.flagCls[0]}  
                getOpenCloseDropdown={this.OpenCloseDropdown}
                getOptionSelected={this.OptionSelected}
                tabIndex={1} 
              />
            </div>
          </div>
          <div className="row">
            <UISelect 
              options={data2} 
              firstoption={this.state.txtOptiondata2} 
              flagOpen={this.state.flagCls[1]} 
              getOpenCloseDropdown={this.OpenCloseDropdown}
              getOptionSelected={this.OptionSelected}
              tabIndex={2} 
            />
          </div>
          <div className="row">
            <UISelect 
              options={data1} 
              firstoption={this.state.txtOptiondata3} 
              flagOpen={this.state.flagCls[2]}
              getOpenCloseDropdown={this.OpenCloseDropdown}
              getOptionSelected={this.OptionSelected}
              tabIndex={3} 
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;