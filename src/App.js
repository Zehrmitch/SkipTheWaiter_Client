import './App.css';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import MenuPage from './Pages/MenuPage';
import RestaurauntPage from './Pages/RestaurauntPage';
import NavBar from './Components/NavBar';

function App() {

	return (
		<NavBar>
			<Routes>
				<Route path="/" element={<RestaurauntPage />}></Route>
				<Route path="/menu" element={<MenuPage />}></Route>
			</Routes>
		</NavBar>
	);
}

export default App;
