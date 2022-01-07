import './App.css';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import MenuPage from './Pages/MenuPage';
import RestaurauntPage from './Pages/RestaurauntPage';
import NavBar from './Components/NavBar';
import Profile from './Pages/Profile';
import Loading from './Components/Loading';
import { useAuth0 } from '@auth0/auth0-react';


function App() {
	const { isLoading } = useAuth0();
	
	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			<NavBar />
			<Routes>
				<Route exact path="/" element={<RestaurauntPage/>}></Route>
				<Route exact path="/menu" element={<MenuPage />}></Route>	
				<Route exact path="/profile" element={<Profile />}></Route>		
			</Routes>
		</div>
		
	);
}

export default App;
