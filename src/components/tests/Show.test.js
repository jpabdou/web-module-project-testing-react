import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import striptags from 'striptags';
import userEvent from "@testing-library/user-event"

const testShow = {
    name: "Stranger Things",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/396/991288.jpg",
    summary: striptags("<p>A love letter to the '80s classics that captivated a generation, <b>Stranger Things</b> is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.</p>"),
    seasons: [
      {id:0, name: "Season 1", episodes: []}, 
      {id:1, name: "hi Season 2", episodes: []}, 
      {id:2, name: "Season 3", episodes: []}, 
      {id:3, name: "Season 4", episodes: []}
    ]
  };

test('renders without errors', () => { 
    render(<Show show={testShow} selectedSeason="none"/>)
});

test('renders Loading component when prop show is null', () => {
  render(<Show show={null} selectedSeason="none"/>)
  const loadMessage = screen.queryByText(/fetching/i)
  expect(loadMessage).toBeInTheDocument()
});

test('renders same number of options seasons are passed in', () => {
  render(<Show show={testShow} selectedSeason="none"/>);
  const seasonOptions = screen.queryAllByTestId('season-option')
  expect(seasonOptions).toHaveLength(4)
})

test('handleSelect is called when an season is selected', () => { 
  const handleSelect = jest.fn()
  render(<Show show={testShow} selectedSeason="none" handleSelect={handleSelect}/>);
  const select = screen.queryByLabelText(/select a season/i)
  userEvent.selectOptions(select, ['1'])
  expect(screen.queryByText(/hi season 2/i)).toBeInTheDocument()
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
  const {rerender} =   render(<Show show={testShow} selectedSeason="none" />);

  let episodes = screen.queryByTestId('episodes-container')
  expect(episodes).not.toBeInTheDocument()
  rerender(<Show show={testShow} selectedSeason={1}/>);
  episodes = screen.queryByTestId('episodes-container')
  expect(episodes).toBeInTheDocument()

});
