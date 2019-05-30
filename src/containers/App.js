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

	onRandomRatingButtonClick = () => {
		const { randomRatingActivated, startRandomRating, stopRandomRating } = this.props;

		if (randomRatingActivated) {
			stopRandomRating();
		} else {
			startRandomRating();
		}
	}

	render() {
		const { rankList, movieBeingRated, randomRatingActivated, openMovieRater, closeMovieRater, updateMovieRank } = this.props;

		return (
			<Container className="app">
				<Row className="header">
					<Col xs={12} sm={8} xl={9} className="align-self-center">
						<h1>Favourite Movie List</h1>
					</Col>
					<Col xs={12} sm={4} xl={3} className="align-self-center">
						<Button
							block
							variant="outline-info"
							className="pull-right"
							onClick={this.onRandomRatingButtonClick}
							disabled={!rankList.length}
						>
							<span className="icon-star">
								{randomRatingActivated ? 'Stop' : 'Start'} Random Rating
							</span>
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
	randomRatingActivated: propTypes.bool.isRequired,

	loadMovieList: propTypes.func.isRequired,
	openMovieRater: propTypes.func.isRequired,
	closeMovieRater: propTypes.func.isRequired,
	updateMovieRank: propTypes.func.isRequired,
	startRandomRating: propTypes.func.isRequired,
	stopRandomRating: propTypes.func.isRequired,
}

const mapStateToProps = ({ rankList, movieBeingRated, randomRatingActivated }) => ({ rankList, movieBeingRated, randomRatingActivated })

const mapDispatchToProps = (dispatch) => ({
	loadMovieList: (movieList) => dispatch(rankListActions.loadMovieList(movieList)),
	openMovieRater: (id, rank, title) => dispatch(rankListActions.openMovieRater(id, rank, title)),
	closeMovieRater: () => dispatch(rankListActions.closeMovieRater()),
	updateMovieRank: (id, rank) => dispatch(rankListActions.updateMovieRank(id, rank)),
	startRandomRating: () => dispatch(rankListActions.startRandomRating()),
	stopRandomRating: () => dispatch(rankListActions.stopRandomRating())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
