import request from "superagent"
const baseUrl = "http://localhost:4000"

export const createRoom = room => dispatch => {
	request
		.post(`${baseUrl}/room`)
		.send(room)
		.catch(console.error)
}
