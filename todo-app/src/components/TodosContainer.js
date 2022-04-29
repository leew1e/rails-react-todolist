import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class TodosContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			todos: [],
			inputValue: ''
		}
	}

	getTodos() {
		axios.get('/api/v1/todos')
			.then(response => {
				this.setState({ todos: response.data })
			})
			.catch(error => console.log(error))
	}

	componentDidMount() {
		this.getTodos()
	}

	createTodo = (e) => {
		if (e.key === 'Enter') {
			axios.post('/api/v1/todos', { todo: { title: e.target.value } })
				.then(response => {
					const todos = update(this.state.todos, {
						$splice: [[0, 0, response.data]]
					})
					this.setState({
						todos: todos,
						inputValue: ''
					})
				})
				.catch(error => console.log(error))
		}
	}

	handleChange = (e) => {
		this.setState({ inputValue: e.target.value });
	}

	updateTodo = (e, id) => {
		axios.put(`/api/v1/todos/${id}`, { todo: { done: e.target.checked } })
			.then(response => {
				const todoIndex = this.state.todos.findIndex(x => x.id === response.data.id)
				const todos = update(this.state.todos, {
					[todoIndex]: { $set: response.data }
				})
				this.setState({
					todos: todos
				})
			})
			.catch(error => console.log(error))
	}

	render() {
		return (
			<div>
				<div>
					<ul>
						{this.state.todos.map((todo) => {
							return (
								<li todo={todo} key={todo.id}>
									<input className="status-tracker" type="checkbox" checked={todo.done}
										onChange={(e) => this.updateTodo(e, todo.id)} />
									<label>{todo.title}</label>
									<span> (Delete) </span>
								</li>
							)
						})}
					</ul>
				</div>
				<div>
					<input type="text" placeholder="Add new task..." maxLength="50"
						onKeyPress={this.createTodo} onChange={this.handleChange}
						value={this.state.inputValue} />
				</div>
			</div>
		)
	}
}

export default TodosContainer