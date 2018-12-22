import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes'; 
import Fish from "./Fish";
import base from '../base';


class App extends React.Component{
	state = { 
		fishes :{},
		order: {} 
	};

	componentDidMount() {
		//Must reinstate local storage
		const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
		if(localStorageRef){
			this.setState({
				order : JSON.parse(localStorageRef)
			});
		};

			
		this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
			context : this,
			state : "fishes"
		});
	}


	componentDidUpdate(){
		localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));	
	}

	componentWillUnmount()  {
		console.log('Unmounting');
		base.removeBinding(this.ref);
	}

	addFish = (fish) =>{
		const fishes = {...this.state.fishes};
		fishes[`fish${Date.now()}`] = fish;
		this.setState({
			fishes : fishes
		});
	}

	loadSampleFishes = () =>{
		this.setState({
			fishes : sampleFishes
		});
	}

	addToOrder = (key) =>{
		const order = {...this.state.order};
		order[key] = order[key] +1 || 1;
		this.setState({
			order : order
		});
	}

	removeFromOrder = (key) =>{
		const order = {...this.state.order};
		delete order[key];
		this.setState({
			order : order
		});
	}


	deleteFish = (key) =>{
		const fishes = {...this.state.fishes};
		fishes[key] = null;
		this.setState({fishes});
	}

	updateFish = (key, updatedFish) =>{
		const fishes = {...this.state.fishes};
		fishes[key]= updatedFish;
		this.setState({fishes});
	}

	render(){
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh SeaFood Market"/>
					<ul className="fishes">
						{
							Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} index={key} />)
						}
					</ul>
				</div>
				<Order removeFromOrder={this.removeFromOrder} fishes={this.state.fishes} order={this.state.order} />				
				<Inventory deleteFish={this.deleteFish} fishes={this.state.fishes} addFish = {this.addFish} updateFish = {this.updateFish} loadSampleFishes = {this.loadSampleFishes}/>
			</div>
		)
	}

}

export default App;