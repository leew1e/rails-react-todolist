import React, { Component } from 'react'
import axios from 'axios'

class TodosContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			todos: []
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

	render() {
		return (
			<div>
				<div>
					<ul>
						{ this.state.todos.map((todo) => {
							return (
								<li todo={todo} key={todo.id}>
									<input type="checkbox" />
									<label>{todo.title}</label>
									<span> (Delete) </span>
								</li>
							)
						}) }
					</ul>
				</div>
				<div>
					<input type="text" placeholder="Add new task..." maxLength="50" />
				</div>
			</div>
		)
	}
}

export default TodosContainer