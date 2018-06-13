import React, { Component } from 'react';


class LISelect extends Component {
  constructor(props) {
    super(props);
    this.optionSelected = this.optionSelected.bind(this);
  }
  /* printing it’s name and id to console */
  optionSelected (event){
    this.props.functionOptionSelected(event, this.props.idLI, this.props.nameLI);
  }

  render() {
    /* We check whether the text is framed in the frame of a div 5*/
    let nameLI = ((this.props.nameLI.length*7) > (+this.props.widthObj)) ? (
      this.props.nameLI.substring(0,this.props.widthObj/10) + "..."
    ) : (
      this.props.nameLI
    );
    return (
      <div onClick={this.optionSelected}>
        { nameLI }
      </div>
    )
  }
}
export default LISelect