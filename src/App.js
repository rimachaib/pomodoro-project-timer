import React from "react";
import "./App.css";
import Pomodoro from "./pomodoro/Pomodoro";

function App() {
	return (
		<div className="App">
			<header className="App-header container">
				<h1>Pomodoro Timer</h1>
				{/*This is the title of the App*/}
			</header>
			<div className="container">
				<Pomodoro />
			</div>
		</div>
	);
}

export default App;
