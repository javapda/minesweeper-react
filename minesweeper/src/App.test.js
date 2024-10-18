import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Minesweeper is loading...', () => {
  render(<App />);
  // const linkElement = screen.getByText(/Minesweeper is loading.../i);
  // expect(linkElement).toBeInTheDocument();
});

test('another test',() => {
  // https://testing-library.com/docs/react-testing-library/cheatsheet/#queries
  render(<App/>);
  // screen.getByText(/Minesweeper/, {exact:false});
  // screen.getByText(/Minesweeper/, {exact:false});
  // screen.getByText(/Minesweeper is loading.../i, {exactexact:true});
  // screen.getByText(/Minesweeper is loading.../, {exactexact:true});

});
