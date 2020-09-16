import { makeStyles } from '@material-ui/core/styles';

export const useHeaderStyles = makeStyles((theme) => ({
	header: {
		flexGrow: 1,
	},
	AppBarRoot: {
		borderRadius: '10px',
	},
	grow: {
		flexGrow: 1,
	},
	searchInput: {
		color: 'inherit',
		width: '100%',
	},
	sectionMenu: {
		display: 'flex',
	},
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
}));

export const useNavigatorStyles = makeStyles({
	root: {
		position: 'sticky',
		bottom: '10px',
		width: '100%',
		maxWidth: '700px',
		borderRadius: '50px',
		marginRight: 'auto',
		marginLeft: 'auto',
	},
});

export const useAccountPageStyles = makeStyles({
	grid: {
		padding: '10px',
	},
	paper: {
		padding: '10px',
	},
});
