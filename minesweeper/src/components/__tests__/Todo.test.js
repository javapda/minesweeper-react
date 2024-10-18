import { render, screen, cleanup } from '@testing-library/react';
import Todo from '../Todo';
/**
 * https://www.youtube.com/watch?v=ML5egqL3YFE
 */
test('should render non-completed Todo component', () => {
    const todo = { id: 14, title: 'wash dishes', completed: false, };
    render(<Todo todo={todo} />); // actually render the component
    const todoElement = screen.getByTestId(`todo-${todo.id}`);
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent(todo.title);
    expect(todoElement).not.toContainHTML('<strike>');
    expect(todoElement).toContainHTML('<div data-testid="todo-14"><h1>wash dishes</h1></div>');
    
    expect(true).toBe(true);
});

test('should render completed Todo component', () => {
    const todo = { id: 2, title: 'wash car', completed: true, };
    render(<Todo todo={todo} />); // actually render the component
    const todoElement = screen.getByTestId(`todo-2`);
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent('wash car');
    expect(todoElement).toContainHTML('<div data-testid="todo-2"><strike><h1>wash car</h1></strike></div>');
    expect(true).toBe(true);
});

afterEach(() => {
    // to cleanup the renders
    cleanup();
}
);