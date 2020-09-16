import React, { useContext } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Badge from '@material-ui/core/Badge';

//Styles
import { useNavigatorStyles as useStyles } from '../assets/js/styles';

//Nav Properties
import { navProperties } from '../assets/js/default-props';

//Contexts
import AppContext from '../contexts/AppContext';

export default function LabelBottomNavigation(props) {
	const classes = useStyles();

	const { navigator } = navProperties;

	// App context
	const { navValue, handleNavChange, theme } = useContext(AppContext);
	const { palette } = theme.style;

	return (
		<BottomNavigation
			value={navValue}
			onChange={handleNavChange}
			className={classes.root}
			style={{ backgroundColor: palette.primary.main }}
		>
			{navigator.navLinks.map((link) => (
				<BottomNavigationAction
					key={link.value}
					label={link.label}
					value={link.value}
					icon={
						<Badge color="secondary" variant="dot" invisible={!link.badge}>
							<link.icon />
						</Badge>
					}
					style={{ color: palette.primary.contrastText }}
				/>
			))}
		</BottomNavigation>
	);
}
