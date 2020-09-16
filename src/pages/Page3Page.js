import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AccountCircle from '@material-ui/icons/Link';

//Styles
import { useAccountPageStyles as useStyles } from '../assets/js/styles';

//Contexts
import AppContext from '../contexts/AppContext';

export default function Page3Page() {
	const classes = useStyles();
	const { goToUrl } = useContext(AppContext);

	const links = [];

	return (
		<Grid container>
			<h2>Page 3</h2>
			{links.map((link) => (
				<Grid item xs={12} className={classes.grid} key={link.title}>
					<Paper className={classes.paper} elevation={3} onClick={() => goToUrl(link.url)}>
						<AccountCircle />
						<h2>{link.title}</h2>
					</Paper>
				</Grid>
			))}
		</Grid>
	);
}
