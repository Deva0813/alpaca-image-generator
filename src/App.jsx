import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<NavBar />
				<Routes>
					<Route path='/' element={<Home/>} />
					<Route path='/about' element={<h1>About</h1>} />
					<Route path='*' element={<h1>Not Found</h1>} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
