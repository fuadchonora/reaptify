import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

//Texts
import ListItemText from '@material-ui/core/ListItemText';

//Icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import BackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

//Styles
import { useHeaderStyles as useStyles } from '../assets/js/styles';

//Contexts
import AppContext from '../contexts/AppContext';

export default function PrimarySearchAppBar() {
	const classes = useStyles();

	// App context
	const {
		theme,
		header,
		search,
		toggleDrawer,
		handleThemeChange,
		handleQueryChange,
		handleSearchInputFocus,
		handleSearchInputBlur,
		handleSearchInputSubmit,
		handleBackButtonClick,
		handleSearchButtonClick,
		changeHeaderState,
	} = useContext(AppContext);

	const anchor = 'right';
	const list = () => (
		<div className={classes.list} role="presentation">
			<List>
				<ListItem>
					<ListItemIcon>
						<InboxIcon />
					</ListItemIcon>
					<ListItemText
						primary={
							<FormControlLabel
								control={
									<Switch
										checked={theme.current !== 'default' ? true : false}
										onChange={handleThemeChange}
										name="themeSwich"
										color={theme.current !== 'default' ? 'secondary' : 'primary'}
									/>
								}
								label="Dark Theme"
								labelPlacement="start"
							/>
						}
					/>
				</ListItem>
			</List>
			<Divider />
			<List>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem
						button
						key={text}
						onClick={toggleDrawer(anchor, false)}
						onKeyDown={toggleDrawer(anchor, false)}
					>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem
						button
						key={text}
						onClick={toggleDrawer(anchor, false)}
						onKeyDown={toggleDrawer(anchor, false)}
					>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	let leftButtonOnClick = handleBackButtonClick;
	let LeftButtonIcon = BackIcon;
	let body = <Typography variant="body1">{header.pageTitle || 'Page Title'}</Typography>;
	let searchButton = (
		<IconButton edge="end" aria-label="search" color="inherit" onClick={handleSearchButtonClick}>
			<SearchIcon />
		</IconButton>
	);

	if (header.status === 'home') {
		leftButtonOnClick = () => changeHeaderState({ status: 'searching' });
		LeftButtonIcon = SearchIcon;
		body = (
			<Typography onClick={() => changeHeaderState({ status: 'searching' })} variant="body1">
				Search Here
			</Typography>
		);
		searchButton = false;
	} else if (header.status === 'searching') {
		body = (
			<form onSubmit={handleSearchInputSubmit} style={{ display: 'flex', width: '100%' }}>
				<InputBase
					className={classes.searchInput}
					value={search.query || ''}
					placeholder="Search Here"
					inputProps={{ 'aria-label': 'search here' }}
					autoFocus={true}
					onChange={handleQueryChange}
					onBlur={handleSearchInputBlur}
					onFocus={handleSearchInputFocus}
				/>
				<IconButton edge="end" type="submit" aria-label="search" color="inherit">
					<SearchIcon />
				</IconButton>
			</form>
		);
		searchButton = false;
	} else if (header.status === 'result') {
		body = (
			<Typography variant="body1" onClick={handleSearchButtonClick}>
				{search.query}
			</Typography>
		);
		searchButton = (
			<IconButton edge="end" aria-label="search" color="inherit" onClick={handleSearchButtonClick}>
				<SearchIcon />
			</IconButton>
		);
	}

	return (
		<div className={classes.header}>
			<AppBar position="static" className={classes.AppBarRoot} color="primary">
				<Toolbar>
					<React.Fragment>
						<IconButton edge="start" color="inherit" aria-label="open drawer" onClick={leftButtonOnClick}>
							<LeftButtonIcon />
						</IconButton>
					</React.Fragment>
					{body}
					<div className={classes.grow} />
					{searchButton}
					<div className={classes.sectionMenu}>
						<IconButton
							edge="end"
							aria-label="show more"
							aria-haspopup="true"
							onClick={toggleDrawer(anchor, true)}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
					</div>
				</Toolbar>
				<Drawer anchor={anchor} open={header[anchor]} onClose={toggleDrawer(anchor, false)}>
					{list()}
				</Drawer>
			</AppBar>
			<div style={{ height: '10px' }} />
			<Divider />
		</div>
	);
}
