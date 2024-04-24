import React from 'react';
import './App.css';

import Infos from './views/Infos.js';
import MainContent from './views/MainContent.js';

function App() {
	return (
		<div className="App h-screen bg-gradient-to-b from-sky-500 to-white lg:flex">
			<MainContent />
			<Infos />
		</div>
	);
}

export default App;
