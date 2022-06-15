import React, { useState, useEffect } from 'react';
import axios from 'axios'
import update from 'immutability-helper'

axios.interceptors.request.use(
	config => {
		config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
		return config;
	}
);

function TodosContainer(props) {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [edit, setEdit] = useState(null);
	const [editValue, setEditValue] = useState('');
	const [mode, setMode] = useState(undefined);
	const [filtered, setFiltered] = useState([]);

	function getTodos(user_id) {
		axios.get(`/api/v1/todos/${user_id}`)
			.then(response => {
				setTodos(response.data)
			})
			.catch(error => console.log(error))
			console.log(localStorage.getItem('token'))
	}
	useEffect(
		() => {
			getTodos(props.user_id);
		}, []);

	useEffect(
		() => {
			todoFilter(mode);
		}, [todos]);


	function handleChange(e) {
		setInputValue(e.target.value);
	}

	function createTodo(e) {
		if (e.key === 'Enter' && e.target.value) {
			axios.post('/api/v1/todos', 
			{ 
				todo: { 
					title: e.target.value, 
					done: false, 
					user_id: props.user_id 
				} 
			})
			.then(response => {
				const newTodos = update(todos, {
					$splice: [[0, 0, response.data]]
				})
				setTodos(newTodos)
				setInputValue('')
			}).catch(error => console.log(error))
		}
	}

	function updateTodo(id) {
		axios.put(`/api/v1/todos/${id}`, { todo: { title: editValue } })
			.then(response => {
				const todoIndex = todos.findIndex(x => x.id === response.data.id)
				const newTodos = update(todos, {
					[todoIndex]: { $set: response.data }
				})
				setTodos(newTodos)
				editTodo(null, '')
			}).catch(error => console.log(error))
	}

	function statusTodo(e, id) {
		axios.put(`/api/v1/todos/${id}`, { todo: { done: e.target.checked } })
			.then(response => {
				const todoIndex = todos.findIndex(x => x.id === response.data.id)
				const newTodos = update(todos, {
					[todoIndex]: { $set: response.data }
				})
				setTodos(newTodos)
			})
			.catch(error => console.log(error))
	}

	function deleteTodo(id) {
		axios.delete(`/api/v1/todos/${id}`)
			.then(response => {
				const todoIndex = todos.findIndex(x => x.id === id)
				const newTodos = update(todos, {
					$splice: [[todoIndex, 1]]
				})
				setTodos(newTodos)
			})
			.catch(error => console.log(error))
	}

	function editTodo(id, title) {
		setEdit(id)
		setEditValue(title)
	}

	function todoFilter(status) {
		if (undefined === status)
			setFiltered(todos);
		else {
			setFiltered(todos.filter(p => p.done === status));
		}
	}

	function handleStatus(status) {
		setMode(status)
		todoFilter(status)
	}

	function isActive(status) {
		const activeStyle = { boxShadow: '2px 2px #2baeff' }
		return mode === status ? activeStyle : null
	}

	return (
		<>
			<div className='main-container'>
				<div>
					<h1>Todo list:</h1>
				</div>
				<input className='todo-input' type="text" placeholder="Add new task..." maxLength="50"
					onKeyPress={createTodo} onChange={handleChange}
					value={inputValue} />
				<div className='change-status-bar'>
					<div className="btn w-10" style={isActive(undefined)}
						onClick={() => handleStatus(undefined)}>
						All
					</div>
					<div className="btn w-10" style={isActive(false)}
						onClick={() => handleStatus(false)}>
						Active
					</div>
					<div className="btn w-10" style={isActive(true)}
						onClick={() => handleStatus(true)}>
						Closed
					</div>
				</div>
				<div className='todo-list'>
					{filtered.length > 0
						? filtered.map((todo) => {
							return (
								<div className='todo-item' todo={todo} key={todo.id}>
									{
										edit === todo.id ?
											<>
												<input type="text" className='todo-update-input'
													onChange={(e) => setEditValue(e.target.value)} value={editValue} />
												<button className="btn-action btn-success"
													onClick={() => updateTodo(todo.id)}>
													✓
												</button>
											</>
											:
											<>
												<div className='todo-data'>
													<input className="status-tracker" type="checkbox" checked={todo.done}
														onChange={(e) => statusTodo(e, todo.id)} />
													<label>{todo.title}</label>
												</div>
												<button className="btn-action btn-primary"
													onClick={() => editTodo(todo.id, todo.title)}>
													+
												</button>
												<button className="btn-action btn-danger"
													onClick={() => deleteTodo(todo.id)}>
													x
												</button>
											</>
									}
								</div>

							)
						})
						: <h2 className='text-center align-middle'> No one todo here </h2>}
				</div>
			</div>
		</>
	)
}
export default TodosContainer;