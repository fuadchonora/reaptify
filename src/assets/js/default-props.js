import { createMuiTheme } from '@material-ui/core/styles';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';

// Assets
import logo from '../svg/logo.svg';

// Themes
export const renderDefaultTheme = () => {
	return createMuiTheme({
		palette: {
			type: 'light',
			primary: {
				light: '#7986cb',
				main: '#3f51b5',
				dark: '#303f9f',
				contrastText: '#fff',
			},
			secondary: {
				light: '#ff4081',
				main: '#f50057',
				dark: '#c51162',
				contrastText: '#000',
			},
		},
	});
};

export const renderDarkTheme = () => {
	return createMuiTheme({
		palette: {
			type: 'dark',
			primary: {
				light: '#7986cb',
				main: '#3f51b5',
				dark: '#303f9f',
				contrastText: '#fff',
			},
			secondary: {
				light: '#ff4081',
				main: '#f50057',
				dark: '#c51162',
				contrastText: '#000',
			},
		},
	});
};

export const defaultTheme = 'default';
export const defaultThemeStyle = renderDefaultTheme();

// Paths
export const paths = [
	//Page3
	{ title: 'Page3', url: '/page3', navValue: 'page3', headerStatus: 'page' },
	//Page2
	{ title: 'Page2', url: '/page2', navValue: 'page2', headerStatus: 'page' },
	//Page1
	{ title: 'Page1ccc', url: '/page3/ccc', navValue: 'page1', headerStatus: 'page' },
	{ title: 'Page1bbb', url: '/page3/bbb', navValue: 'page1', headerStatus: 'page' },
	{ title: 'Page1aaa', url: '/page3/aaa', navValue: 'page1', headerStatus: 'page' },
	{ title: 'Page1', url: '/page1', navValue: 'page1', headerStatus: 'page' },
	//Index (and/or other routes)
	{ title: 'About', url: '/about', navValue: 'home', headerStatus: 'page' },
	{ title: 'Result', url: '/result', navValue: 'home', headerStatus: 'result' },
	{ title: 'Home', url: '/', navValue: 'home', headerStatus: 'home' },
];

export const pathProperties = {
	current: '/',
	previous: '/',
};

// Header
export const headerProperties = {
	logo: logo,
	title: 'Olib',
	drawer: {
		top: false,
		left: false,
		bottom: false,
		right: false,
	},
	status: 'home',
	pageTitle: false,
	searchAutoFocus: true,
};

// Bootom Nav
export const navProperties = {
	currentNavValue: 'home',
	navValues: ['home', 'page1', 'page2', 'page3'],
	navigator: {
		navLinks: [
			{ label: 'Home', value: 'home', icon: HomeIcon, url: '/', badge: false },
			{ label: 'Page1', value: 'page1', icon: LibraryAddIcon, url: '/page1', badge: false },
			{
				label: 'Page2',
				value: 'page2',
				icon: NotificationsIcon,
				url: '/page2',
				badge: true,
			},
			{ label: 'Page3', value: 'page3', icon: AccountCircle, url: '/page3', badge: false },
		],
	},
};
