import React, { Component } from 'react';

interface FreeTextSearcProps {
  tabIndex: number;
  getSelctedJData: Function;
}
interface FreeTextSearcState {
  txtSearch: string;
}

class FreeTextSearch extends Component <FreeTextSearcProps, FreeTextSearcState> {
  constructor(props: FreeTextSearcProps) {
    super(props);
    this.state = {
      txtSearch: '',
    };
    this.onChange = this.onChange.bind(this); 
  }
  onChange(e:any) {  
    const newText = e.target.value;  
    this.setState({txtSearch : newText}); 
    this.props.getSelctedJData(newText); 
  } 
    render(){
        return(
          <div className="searchbar-input">
            <input 
              id="search" 
              type="search" 
              autoComplete="off"
              value={this.state.txtSearch} 
              onChange={this.onChange}
              placeholder="free text search" 
            /> 
          </div> 
        )
    }
}
export default FreeTextSearch;