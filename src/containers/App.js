import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';

import ModalMovieRater from '../components/ModalMovieRater';
import * as rankListActions from '../redux/actions';
import movieList from '../data/fav-movies';

import '../styles/app.css';

const url = 'https://www.imdb.com/title/';

export class App extends React.Component {
	componentDidMount() {
		this.props.loadMovieList(movieList);
	}

	render() {
		const { rankList, movieBeingRated, openMovieRater, closeMovieRater, updateMovieRank } = this.props;

		return (
			<Container className="app">
				<Row className="header">
					<Col xs={12} sm={8} xl={10} className="align-self-center">
						<h1>Favourite Movie List</h1>
					</Col>
					<Col xs={12} sm={4} xl={2} className="align-self-center">
						<Button
							block
							variant="outline-info"
							className="pull-right"
							onClick={console.log}
							disabled={!rankList.length}
						>
							<span className="icon-star">Random Rating</span>
						</Button>
					</Col>
				</Row>
				<ListGroup>
					{rankList.map(({ title, rank, id }, index) => (
						<ListGroup.Item key={id} variant={index % 2 === 0 ? '' : 'info'}>
							<Row className="movie-item">
								<Col xs={8} className="align-self-center">
									<span>{index + 1}. </span>
									<a href={`${url}${id}`} target="_blank" rel="noopener noreferrer">{title}</a>
								</Col>
								<Col xs={2} className="align-self-center">
									<strong className="rank-star">{rank}</strong>
								</Col>
								<Col xs={2}>
									<Button
										variant="light"
										onClick={() => openMovieRater(id, rank, title)}
									>
										<span className="icon-star">Rate</span>
									</Button>
								</Col>
							</Row>
						</ListGroup.Item>
					))}
				</ListGroup>
				<ModalMovieRater
					show={!!movieBeingRated.id}
					onHide={closeMovieRater}
					onMovieRate={updateMovieRank}
					movieData={movieBeingRated}
				/>
			</Container>
		);
	}
}

App.propTypes = {
	rankList: propTypes.arrayOf(propTypes.shape({
		id: propTypes.string,
		rank: propTypes.number,
		title: propTypes.string
	})).isRequired,
	movieBeingRated: propTypes.shape({
		id: propTypes.string,
		rank: propTypes.number,
		title: propTypes.string
	}).isRequired,

	loadMovieList: propTypes.func.isRequired,
	openMovieRater: propTypes.func.isRequired,
	closeMovieRater: propTypes.func.isRequired,
	updateMovieRank: propTypes.func.isRequired
}

const mapStateToProps = ({ rankList, movieBeingRated }) => ({ rankList, movieBeingRated })

const mapDispatchToProps = (dispatch) => ({
	loadMovieList: (movieList) => dispatch(rankListActions.loadMovieList(movieList)),
	openMovieRater: (id, rank, title) => dispatch(rankListActions.openMovieRater(id, rank, title)),
	closeMovieRater: () => dispatch(rankListActions.closeMovieRater()),
	updateMovieRank: (id, rank) => dispatch(rankListActions.updateMovieRank(id, rank))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
