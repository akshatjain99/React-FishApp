import React from 'react';

const Login = (props) =>(
	<nav className="Login">
		<h2>
			Inventory Login
		</h2>
		<p>Sign in to manage inventory</p>
		<button className="github" onClick={()=> props.authenticate('Github')}>Login with Github</button>
		<button className="facebook" onClick={()=> props.authenticate('Facebook')}>Login with Facebook</button>


	</nav>
);


export default Login;