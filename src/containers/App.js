import * as React from 'react';
import { connect } from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'

import * as rankListActions from '../redux/actions';

import logo from '../logo.svg';
import '../App.css';

class App extends React.Component {
	componentDidMount() {
		this.props.loadMovieList();
	}

	render() {
		const { rankList } = this.props

		return (
			<div className="App">
				<ListGroup>
					{rankList.map(({ title, id }) => <ListGroup.Item key={id} action>{title}</ListGroup.Item>)}
				</ListGroup>
			</div>
		);
	}
}

const mapStateToProps = ({ rankList }) => ({ rankList })

const mapDispatchToProps = (dispatch) => ({
	loadMovieList: () => dispatch(rankListActions.loadMovieList())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
