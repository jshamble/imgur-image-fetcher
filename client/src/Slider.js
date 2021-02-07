import React from "react";
import './App.css';

class Slider extends React.Component{ 

constructor(props) {
    super(props);
    this.state = {
		sliderValue: this.props.value,
		sliderValuePrevious: this.props.value
	};
  }
  
	updateChildAndParent(event,checkForNeg) {
		const val = event.target.value;
		this.setState({ sliderValue: val });
		this.props.action(val,this.props.stateLabel);
	}
	
	onkeypress='validate(event)'

	render(){ 
		return (
		<div className="flex-container-input">
		
			<div className="label">
				{this.props.label}
			</div>
		
			{this.props.hideSlider === null &&
				<input type="range" className="custom-range" id="customRange" 
					min={this.props.min} 
					max={this.props.max} 
					step={this.props.step}
					value={this.state.sliderValue}
					onChange={event => this.updateChildAndParent(event)}
					>
				</input>
			}
			
			<input type="text" 
				min={this.props.min} 
				max={this.props.max} 
				value={this.state.sliderValue}
				onBlur={event => this.updateChildAndParent(event,true)}
				onChange={event => this.updateChildAndParent(event)}
				>
			</input>
			
			<div>
				{this.props.units}
			</div>
		
		</div>
		);
	}
}

export default Slider;
