import React from 'react';
import { shallow } from 'enzyme';
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalMovieRater from '../ModalMovieRater';

describe('Modal Movie Rater Component', () => {
    it('should be defined', () => {
        expect(ModalMovieRater).toBeDefined();
    });

    describe('Render component', () => {
        const defaultProps = {
            show: false,
            onHide: jest.fn(),
            movieData: {
                id: 'movie-id',
                rank: 5,
                title: 'Test Movie'
            },
            onMovieRate: jest.fn()
        };
        const setupWrapper = (props = {}) => shallow(
            <ModalMovieRater {...defaultProps} {...props} />
        );

        it('should render without crashing', () => {
            const wrapper = setupWrapper();
            expect(wrapper.exists()).toBeTruthy();
        });

        it('should render movie title', () => {
            const wrapper = setupWrapper({ show: true });
            expect(wrapper.find(ModalTitle).text()).toEqual('Rate "Test Movie" movie');
        });

        it('should call onMovieRate with correct params', () => {
            const wrapper = setupWrapper({ show: true });
            const rater = wrapper.find('Rater');

            rater.prop('onRate')({ rating: 10 });
            expect(defaultProps.onMovieRate).toHaveBeenCalledWith('movie-id', 10);
        });
    });
});