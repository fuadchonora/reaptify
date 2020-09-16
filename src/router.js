import React, { useContext } from 'react';

// Index Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ResultPage from './pages/ResultPage';
// Page1 Pages
import Page1Page from './pages/Page1Page';
import Page1aaaPage from './pages/Page1aaaPage';
import Page1bbbPage from './pages/Page1bbbPage';
import Page1cccPage from './pages/Page1cccPage';
// Page2 Pages
import Page2Page from './pages/Page2Page';
// Page3 Pages
import Page3Page from './pages/Page3Page';
// Other Pages
import AboutPage from './pages/AboutPage';

//Contexts
import AppContext from './contexts/AppContext';

export default function Router() {
	//App Context
	const { path, header } = useContext(AppContext);

	return (
		<React.Fragment>
			{/* Index Pages */}
			{path.current === '/' && header.status === 'home' && <HomePage />}
			{path.current === '/' && header.status === 'searching' && <SearchPage />}
			{path.current === '/result' && <ResultPage />}
			{/* Page1 Pages */}
			{path.current === '/page1' && <Page1Page />}
			{path.current === '/page1/aaa' && <Page1aaaPage />}
			{path.current === '/page1/bbb' && <Page1bbbPage />}
			{path.current === '/page1/ccc' && <Page1cccPage />}
			{/* Page2 Pages */}
			{path.current === '/page2' && <Page2Page />}
			{/* Page3 Pages */}
			{path.current === '/page3' && <Page3Page />}
			{/* Other Pages */}
			{path.current === '/about' && <AboutPage />}
		</React.Fragment>
	);
}
