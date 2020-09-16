import React, { useContext } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

// Assets
import './assets/css/App.css';

// Header
import Header from './components/Header';
// Page Router
import Router from './router';
// Bottom Navigator
import Navigator from './components/Navigator';

//Contexts
import AppContext from './contexts/AppContext';

function App() {
	// App context
	const app = useContext(AppContext);
	const { theme } = app;

	return (
		<ThemeProvider theme={theme.style}>
			<Paper elevation={0} className="app">
				<Header />
				<div className="page">
					<Router />
				</div>
				<Navigator />
			</Paper>
		</ThemeProvider>
	);
}

export default App;
