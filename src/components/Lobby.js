import React, { Component } from "react"
import { connect } from "react-redux"
import { createRoom } from "../actions/room"

class Lobby extends Component {
	state = { name: "" }
	onSubmit = event => {
		event.preventDefault()
		console.log("check state:", this.state)
		this.props.createRoom(this.state)
		this.setState({ name: "" })
	}
	onChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	}
	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						placeholder="name"
						onChange={this.onChange}
						name="name"
						value={this.state.name}
					/>
					<button>Create</button>
				</form>
				{this.props.rooms
					? this.props.rooms.map(room => (
							<li key={room.id}>
								{room.name}
								<button>join</button>
							</li>
					  ))
					: null}
			</div>
		)
	}
}
const mapStateToProps = state => ({
	rooms: state.rooms
})
export default connect(mapStateToProps, { createRoom })(Lobby)
