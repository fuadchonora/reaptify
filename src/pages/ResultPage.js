import React, { useContext } from 'react';

//Contexts
import AppContext from '../contexts/AppContext';

export default function ResultPage() {
	const { search } = useContext(AppContext);

	return (
		<div>
			<h2>Results</h2>
			{search.results.length > 0 ? (
				search.results.map((result) => <h1 key={result.id}>{result.name}</h1>)
			) : (
				<h1>No Results</h1>
			)}
		</div>
	);
}
