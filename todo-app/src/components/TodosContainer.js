import React, { Component } from 'react'

class TodosContainer extends Component {
	render() {
		return (
			<div>
				<div>
					<ul>
						<li>Tasks will be here...</li>
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