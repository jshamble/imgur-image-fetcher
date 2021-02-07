import React from 'react';
import './App.css';
import Slider from './Slider.js';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			section	: 'hot',
			sort : 'viral',
			page : '1',
			window : 'day'
		};

		// Bind the this context to the handler function
		this.handler = this.handler.bind(this);

	}


	fetchImgData = () => {
		fetch('http://localhost:1234', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Client-ID fb5c7dd2a2711f0',
				'User-Agent':'Epicture',
			},
			body: JSON.stringify({...this.state}),
		})
			.then(response => response.json())
			.then(data => { this.setState({ 
				imgData: data.imageData
			}) })
			.catch(function(err) {
				alert('error: ' + err)
			});
	}

	componentDidMount() {
		this.fetchImgData();
	}

	// This method will be sent to the child component
	handler(val,stateLabel) {
		this.setState({
			[stateLabel] : val
		});
	}

	render() {
		return (

			<div className="flex-container">

				<div className="flex-child flex-child-left">

					<h1> Imgur Data Fetch Settings </h1>

					<h2> Query Params </h2>

					<Slider	
					label={"Section"}
					stateLabel={"section"}
					units={"(hot | top | user)"}
					hideSlider={true}
					step={1}
					value={this.state.section}
					action={this.handler} />
					
					<Slider	
					label={"Sort"}
					stateLabel={"sort"}
					units={"(viral | top | time | rising)"}
					hideSlider={true}
					step={1}
					value={this.state.sort}
					action={this.handler} />
					
					<Slider	
					label={"Window"}
					stateLabel={"window"}
					units={"(day | week | month | year | all)"}
					hideSlider={true}
					value={this.state.window}
					action={this.handler} />
					
					<Slider	
					label={"Page"}
					stateLabel={"page"}
					units={"(enter a positive integer value)"}
					hideSlider={true}
					min={0}
					max={10000}
					step={1}
					value={this.state.page}
					action={this.handler} />
					

					<button onClick={this.fetchImgData}>
						Get Data
					</button>

					</div>

						<div className="flex-child flex-child-right">

							<div className="flex-container-right-bottom">

							<h2> Image Data </h2>
							
							<div className="tableContainer">

								{this.state.imgData != null && this.state.imgData.map((item) =>
									<img key={item} src={item} alt="img" />
								)}
							
							</div>

					</div>

				</div>

			</div>


		);
	}
}

export default App;
