import React from 'react';
import base, { firebaseApp } from '../base';
import firebase from 'firebase';
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";


class Inventory extends React.Component{
	state = {
		uid : null,
		owner: null
	}

	componentDidMount(){
		firebase.auth().onAuthStateChanged(user =>{
			if(user){
				this.authHandler({user})
			}
		})
	}


	authHandler = async (authData) =>{
		const store = await base.fetch(this.props.storeId, {context: this});
		if(!store.owner){
			await base.post(`${this.props.storeId}/owner`, {
				data: authData.user.uid
			})
		}
		this.setState({
			uid : authData.user.uid,
			owner : store.owner || authData.user.uid
		})


	}

	authenticate = (provider) =>{
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);

	};

	logout = async () =>{
		await firebase.auth().signOut();
		this.setState({
			uid : null
		})
	}

	render(){
		const logout = <button onClick={this.logout}>Log Out</button>

		if (!this.state.uid){
			return <Login authenticate={this.authenticate} />
		}

		if(this.state.uid !== this.state.owner){
			return (
				<div> {logout} <p>Sorry you are not the owner</p></div>
			)
		}

		return(
			
			<div className="Inventory">
				<h2>Inventory</h2>
				{logout}	
				{Object.keys(this.props.fishes).map(key => <EditFishForm fish={this.props.fishes[key]} key={key} updateFish= {this.props.updateFish} index={key} deleteFish={this.props.deleteFish}/>)}
				<AddFishForm addFish = {this.props.addFish}/>
				<button onClick={this.props.loadSampleFishes}>Load Sample State</button>
			</div>
		)
	}
}

export default Inventory;