import * as React from 'react';
import propTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Rater from 'react-rater';

import 'react-rater/lib/react-rater.css';

const ModalMovieRater = ({ show, onHide, movieData: { id, rank, title }, onMovieRate }) => (
    <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
            <Modal.Title>
                Rate "{title}" movie
          	</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
            <Rater total={10} rating={rank} onRate={({ rating }) => onMovieRate(id, rating)} />
		</Modal.Body>
    </Modal>
);

ModalMovieRater.propTypes = {
    show: propTypes.bool.isRequired,
    onHide: propTypes.func.isRequired,
    movieData: propTypes.shape({
        id: propTypes.string,
        rank: propTypes.number,
        title: propTypes.string
    }).isRequired,
    onMovieRate: propTypes.func.isRequired
}

export default ModalMovieRater;