import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';

import App from '../App';
import * as actions from '../../redux/actions';
import movieList from '../../data/fav-movies';
import movieListMocked from '../../redux/reducers/__tests__/movieListMock'

describe('App Container', () => {
	it('should be defined', () => {
		expect(App).toBeDefined();
	});

	describe('Initial render', () => {
		let mockState = {
			rankList: [],
			movieBeingRated: {}
		};
		let mockedStore;
		let wrapper;

		beforeEach(() => {
			mockedStore = createMockStore(mockState);
			mockedStore.dispatch = jest.fn();
			wrapper = mount(
				<Provider store={mockedStore}>
					<App />
				</Provider>
			).find(App);
		});

		it("should render without crashing", () => {
			expect(wrapper.exists()).toBeTruthy();
		});

		it('should have a header', () => {
			const header = wrapper.find('h1');
			expect(header.text()).toEqual('Favourite Movie List');
		});

		it('should have empty movie list rendered', () => {
			const listRow = wrapper.find('Row');
			expect(listRow.exists()).toBeFalsy();
		});

		it('should dispatch loadMovieList action on component mount', () => {
			expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
			expect(mockedStore.dispatch).toHaveBeenCalledWith(actions.loadMovieList(movieList));
		});

		describe('Render with movie list', () => {
			let mockState = {
				rankList: movieListMocked,
				movieBeingRated: {}
			};
			let mockedStore;
			let wrapper;

			beforeEach(() => {
				mockedStore = createMockStore(mockState);
				mockedStore.dispatch = jest.fn();
				wrapper = mount(
					<Provider store={mockedStore}>
						<App />
					</Provider>
				).find(App);
			});

			it('should render movie list', () => {
				const movieRows = wrapper.find('Row');
				expect(movieRows.length).toEqual(3);
			});

			it('should have movie title', () => {
				const movieTitle = wrapper.find('Col').at(0);
				expect(movieTitle.text()).toEqual('1. Pulp Fiction');
			});

			it('should have link on imdb movie description', () => {
				const movieLink = wrapper.find('Col').at(0).find('a');
				expect(movieLink.text()).toEqual('Pulp Fiction');
				expect(movieLink.prop('href')).toEqual('https://www.imdb.com/title/tt01');
				expect(movieLink.prop('target')).toEqual('_blank');
			});

			it('should have rank of movie', () => {
				const movieRank = wrapper.find('Col').at(1);
				expect(movieRank.text()).toEqual('5');
			});

			it('should have correct style class for rank of movie', () => {
				const movieRank = wrapper.find('Col').at(1);
				expect(movieRank.find('strong').hasClass('rank-star')).toBeTruthy();
			});

			it('should have button to open movie rater', () => {
				const button = wrapper.find('Col').at(2).find('Button');
				expect(button.exists()).toBeTruthy();
				expect(button.text()).toEqual('Rate');
			});

			it('should have correct style class for rate button', () => {
				const button = wrapper.find('Col').at(2).find('Button');
				expect(button.find('span').hasClass('icon-star')).toBeTruthy();
			});

			it('should dispatch openMovieRater action on rate button click', () => {
				const button = wrapper.find('Row').at(1).find('Col').at(2).find('Button');

				button.simulate('click');
				expect(mockedStore.dispatch).toHaveBeenCalledTimes(2);
				expect(mockedStore.dispatch).toHaveBeenLastCalledWith(actions.openMovieRater('tt04', 0, 'The Prestige'));
			});

			it('should have correct props on ModalMovieRater component', () => {
				const modalMovieRater = wrapper.find('ModalMovieRater');
				expect(modalMovieRater.prop('show')).toBeFalsy();
				expect(modalMovieRater.prop('movieData')).toEqual({});
			});
		});

		describe('Render with movie data set', () => {
			let mockState = {
				rankList: movieListMocked,
				movieBeingRated: { ...movieListMocked[1] }
			};
			let mockedStore;
			let modalMovieRater;

			beforeEach(() => {
				mockedStore = createMockStore(mockState);
				mockedStore.dispatch = jest.fn();
				modalMovieRater = mount(
					<Provider store={mockedStore}>
						<App />
					</Provider>
				).find('ModalMovieRater');
			});

			it('should have correct props on ModalMovieRater component', () => {
				expect(modalMovieRater.prop('show')).toBeTruthy();
				expect(modalMovieRater.prop('movieData')).toEqual(movieListMocked[1]);
			});

			it('should dispatch closeMovieRater action when closing modal movie rater', () => {
				modalMovieRater.prop('onHide')();
				expect(mockedStore.dispatch).toHaveBeenCalledTimes(2);
			});

			it('should dispatch updateMovieRank action when movie is being rated', () => {
				modalMovieRater.prop('onMovieRate')('tt04', 10);
				expect(mockedStore.dispatch).toHaveBeenCalledTimes(2);
				expect(mockedStore.dispatch).toHaveBeenLastCalledWith(actions.updateMovieRank('tt04', 10));
			});
		});
	});
});