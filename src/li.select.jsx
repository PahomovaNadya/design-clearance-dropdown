import React, { Component } from 'react';

interface LISelectProps {
  functionOptionSelected: Function;
}
class LISelect extends Component<LISelectProps> {
  constructor(props: LISelectProps) {
    super(props);
    this.optionSelected = this.optionSelected.bind(this);
  }

  /* printing it’s name and id to console */
  optionSelected (event: any){
    this.props.functionOptionSelected(this.props.idLI, this.props.nameLI);
  }

  render() {
    /* We check whether the text is framed in the frame of a div */
    const nameLI = ((this.props.nameLI.length*10) > (+this.props.widthObj)) ? (
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