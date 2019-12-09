import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import Config from '../Config'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ChartRevenue extends Component {
	constructor(props){
		super(props);
		this.state = {
			data:[]
		}
	}
	async componentDidMount(){
		let autheticate = {
			method: "GET",
			mode: "cors",
			credentials: "include",
			headers: {
			  Accept: "application/json"
			}
		  };
		  const response = await fetch(
			Config.api_url + "statistic/totalRevenue",
			autheticate
		  );
		
		  if (!response.ok) {
			throw Error(response.status + ": " + response.statusText);
		  }
		  
		  const data = await response.json();
		  let chartData = [];
		  for(let i = 0; i < data.length; i++) {
			let row = data[i];
			chartData.push({
				x: new Date(row.year, row.month), y: row.revenue
			});
		  }
		  
		  console.log({ x: new Date(2017, 0), y: 2506 });
		  
		  this.setState({data:chartData});
	}
	render() {
		let {data} = this.state;
		const options = {
			animationEnabled: true,
			title:{
				text: "Statistic of revenue by month - 2019"
			},
			axisX: {
				valueFormatString: "MMM"
			},
			axisY: {
				title: "Sales (in USD)",
				prefix: "$",
				includeZero: false
			},
			data: [{
				yValueFormatString: "$#,###",
				xValueFormatString: "MMMM",
				type: "spline",
				dataPoints: data
			}]
		}
		
		return (
		<div className="splineChart" style={{marginTop:'6%'}}>
			<h1>React Spline Chart</h1>
			<CanvasJSChart options = {options} 

			/>
		</div>
		);
	}
}

export default ChartRevenue;       