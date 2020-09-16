import React, { Component, createContext } from 'react';
import { createBrowserHistory } from 'history';

// Default Properties
import {
	renderDefaultTheme,
	renderDarkTheme,
	defaultTheme,
	defaultThemeStyle,
	paths,
	pathProperties,
	headerProperties,
	navProperties,
} from '../assets/js/default-props';

const history = createBrowserHistory();

//Init Properties //todo: get current from cache if any
const initApp = () => {
	//check path
	let pathname = window.location.pathname;
	let filteredPaths = paths.filter((path) => pathname.startsWith(path.url));
	if (filteredPaths.length > 0) {
		let path = filteredPaths[0];
		headerProperties.status = path.headerStatus;
		headerProperties.pageTitle = path.title;
		navProperties.currentNavValue = path.navValue;
		pathProperties.current = path.url;
	}
};
initApp();

//Provider
const AppContext = createContext();
class AppContextProvider extends Component {
	// Context state
	state = {
		theme: { current: defaultTheme, style: defaultThemeStyle },
		path: { ...pathProperties },
		navValue: navProperties.currentNavValue,
		header: { ...headerProperties },
		search: { query: '', results: [] },
	};

	// Event Handlers
	handleThemeChange = (event) => {
		if (event.target.checked) {
			this.setState((prevState) => ({ ...prevState, theme: { current: 'dark', style: renderDarkTheme() } }));
		} else {
			this.setState((prevState) => ({
				...prevState,
				theme: { current: 'default', style: renderDefaultTheme() },
			}));
		}
	};

	handleNavChange = (event, navValue) => {
		let links = navProperties.navigator.navLinks.filter((link) => link.value === navValue);
		if (links.length > 0) {
			this.goToUrl(links[0].url);
		} else {
			this.goToUrl('/');
		}
	};

	handleQueryChange = (event) => {
		let newValue = event.target.value;
		if (newValue.trim().length === 0) newValue = '';

		this.setState((prevState) => ({
			...prevState,
			search: { ...prevState.search, query: newValue },
		}));
	};

	handleSearchInputFocus = (event) => {
		event.target.select();
		this.changeHeaderState({ status: 'searching' });
	};

	handleSearchInputBlur = (event) => {
		let newValue = event.target.value;
		if (newValue.trim().length === 0) {
			this.changeHeaderState({ status: 'home' });
		}
	};

	handleSearchInputSubmit = (event) => {
		event.preventDefault();

		let query = this.state.search.query;
		console.log('Searching for :' + query);

		if (query) {
			//filter search results

			//set state
			this.setState((prevState) => ({
				...prevState,
				search: {
					...prevState.search,
					results: [
						{ id: 1, name: 'a' },
						{ id: 2, name: 'b' },
						{ id: 3, name: 'c' },
					],
				},
			}));
			this.goToUrl('/result');
		}
	};

	handleBackButtonClick = (event) => {
		if (this.state.header.status === 'page') {
			this.goToUrl(this.state.path.previous);
		} else if (this.state.header.status === 'searching') {
			//todo: clear query if needed
			this.changeHeaderState({ status: 'home' });
		} else if (this.state.header.status !== 'home') {
			this.goToUrl('/');
		}
	};

	handleSearchButtonClick = (event) => {
		this.goToUrl('/', 'searching');
	};

	// Functions
	toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		this.changeHeaderState({ [anchor]: open });
	};

	changeHeaderState = (newState) => {
		this.setState((prevState) => ({
			...prevState,
			header: {
				...prevState.header,
				...newState,
			},
		}));
	};

	goToUrl = (url, headerStatus) => {
		// console.log(`going from '${this.state.path.current}' to '${url}'`);
		let filteredPaths = paths.filter((path) => url.startsWith(path.url));
		if (filteredPaths.length > 0 && url.split('/').length > 1) {
			let newPath = filteredPaths[0];
			this.changeHeaderState({ status: headerStatus || newPath.headerStatus, pageTitle: newPath.title });
			this.setState((prevState) => ({
				...prevState,
				path: {
					current: url,
					previous:
						url.split('/').length > this.state.path.current.split('/').length
							? this.state.path.current
									.split('/')
									.splice(0, this.state.path.current.split('/').length)
									.join('/')
							: '/',
				},
				navValue: newPath.navValue,
			}));
			history.push(url);
		} else {
			this.changeHeaderState({ status: 'home', pageTitle: 'Home' });
			this.setState((prevState) => ({
				...prevState,
				path: {
					current: '/',
					previous: this.state.path.current,
				},
				navValue: 'home',
			}));
			history.replace('/');
		}
	};

	componentDidMount() {
		//Listeners
		window.addEventListener('popstate', (event) => {
			this.goToUrl(this.state.path.previous);
		});
	}

	render() {
		const { children } = this.props;
		const value = {
			theme: this.state.theme,
			path: this.state.path,
			navValue: this.state.navValue,
			header: this.state.header,
			search: this.state.search,
			handleThemeChange: this.handleThemeChange,
			handleNavChange: this.handleNavChange,
			handleQueryChange: this.handleQueryChange,
			handleSearchInputFocus: this.handleSearchInputFocus,
			handleSearchInputBlur: this.handleSearchInputBlur,
			handleSearchInputSubmit: this.handleSearchInputSubmit,
			handleBackButtonClick: this.handleBackButtonClick,
			handleSearchButtonClick: this.handleSearchButtonClick,
			toggleDrawer: this.toggleDrawer,
			changeHeaderState: this.changeHeaderState,
			goToUrl: this.goToUrl,
		};

		return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
	}
}

export default AppContext;
export { AppContextProvider };
