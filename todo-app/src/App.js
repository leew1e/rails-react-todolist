import React, { Component } from 'react';
import './App.css';
// Импорт пользовательского компонента
import TodosContainer from './components/TodosContainer'

function App() {
  return (
    <div className='main-container'>
      <div>
        <h1>Todo list:</h1>
      </div>
      <TodosContainer />
    </div>
  );
}

export default App;
