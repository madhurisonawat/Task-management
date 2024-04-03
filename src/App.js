import React, { useEffect, useState } from 'react';
import Board from './Components/Board';
import './App.css'

const App = () => {
  const [boards, setBoards] = useState(
    [
    {
      id: 1,
      title: 'To Do',
      cards: [
        { id: 1, text: 'Task 1', description:'This is task 1', deadline:`It's deadline is 12 pm.` },
        { id: 2, text: 'Task 2', description:'This is task 2', deadline:`It's deadline is 10 pm.`},
        { id: 3, text: 'Task 3', description:'This is task 3', deadline:`It's deadline is 5 pm.` },
      ],
    },
    {
      id: 2,
      title: 'In Progress',
      cards: [],
    },
    {
      id: 3,
      title: 'Done',
      cards: [],
    },
  ]
  );
  useEffect(() => {
    const savedBoards = JSON.parse(localStorage.getItem('boards'));
    if (savedBoards) {
      setBoards(savedBoards);
    }
  }, []);

  return (
    <div className="app">
      <h1>Task Management App</h1>
      <div className="boards">
        {boards.map((board) => (
          <Board key={board.id} board={board} boards={boards} setBoards={setBoards} />
        ))}
      </div>
    </div>
  );
};

export default App;
