/* global EventSource */
import React, { Component } from "react"

import { Route } from "react-router-dom"
import { connect } from "react-redux"
import Home from "./components/Home"
import Lobby from "./components/Lobby"

class App extends Component {
	url = "http://localhost:4000"

	stream = new EventSource(`${this.url}/stream`)
	componentDidMount() {
		this.stream.onmessage = event => {
			const { data } = event

			const action = JSON.parse(data)

			console.log("action test:", action)
			this.props.dispatch(action)
		}
	}
	render() {
		return (
			<div>
				<Route path="/" exact component={Lobby} />
			</div>
		)
	}
}

export default connect()(App)

// import React, { Component } from "react"
// import superagent from "superagent"

// class App extends Component {
// 	url = "http://localhost:4000"

// 	stream = new EventSource(`${this.url}/stream`)

// 	state = {
// 		text: "",
// 		rooms: []
// 	}

// 	componentDidMount() {
// 		this.stream.onmessage = event => {
// 			const { data } = event

// 			const action = JSON.parse(data)

// 			console.log("action test:", action)

// 			const { type, payload } = action

// 			switch (type) {
// 				case "ALL_ROOMS": {
// 					return this.setState({
// 						rooms: payload
// 					})
// 				}
// 				case "NEW_ROOM": {
// 					const rooms = [...this.state.rooms, payload]

// 					return this.setState({
// 						rooms
// 					})
// 				}
// 				default:
// 					console.log("Ignore:", type)
// 			}
// 		}
// 	}

// 	onSubmit = async event => {
// 		event.preventDefault()

// 		try {
// 			const response = await superagent.post(`${this.url}/room`).send({
// 				name: this.state.text
// 			})

// 			console.log("response test:", response)
// 		} catch (error) {
// 			console.warn("error test:", error)
// 		}
// 	}

// 	onChange = event => {
// 		// const value = event.target.value
// 		const { value } = event.target
// 		// const { target: { value } } = event

// 		this.setState({ text: value })
// 	}

// 	onClick = async roomId => {
// 		console.log("roomId test:", roomId)
// 		try {
// 			const response = await superagent.put(`${this.url}/join`).send({
// 				roomId,
// 				userId: 1
// 			})

// 			console.log("response test:", response)
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}

// 	render() {
// 		const { rooms } = this.state

// 		const list = rooms.map(room => (
// 			<div key={room.id}>
// 				{room.name}
// 				<button onClick={() => this.onClick(room.id)}>Join</button>
// 			</div>
// 		))

// 		return (
// 			<main>
// 				<form onSubmit={this.onSubmit}>
// 					<input type="text" onChange={this.onChange} value={this.state.text} />
// 					<button>Submit</button>
// 				</form>
// 				{list}
// 			</main>
// 		)
// 	}
// }

// export default App
