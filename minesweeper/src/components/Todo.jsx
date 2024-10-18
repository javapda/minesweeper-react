import React from 'react';

/**
 * 
 * @returns 
 */
const Todo = ({ todo = { id: -2, title: "No title", completed: false } }) => {
    console.log(`todo====>${JSON.stringify(todo)}`);
    const { id, title, completed } = todo;
    const h1 = <h1>{title}</h1>;
    const text = completed ? <strike>{h1}</strike> : h1;

    return (
        <div data-testid={`todo-${id}`}>
            {text}
        </div>
    );
}

export default Todo;