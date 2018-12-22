import React from 'react';
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class Inventory extends React.Component{
	render(){
		return(
			<div className="Inventory">
				<h2>Inventory</h2>
				{Object.keys(this.props.fishes).map(key => <EditFishForm fish={this.props.fishes[key]} key={key} updateFish= {this.props.updateFish} index={key} />)}
				<AddFishForm addFish = {this.props.addFish}/>
				<button onClick={this.props.loadSampleFishes}>Load Sample State</button>
			</div>
		)
	}
}

export default Inventory;