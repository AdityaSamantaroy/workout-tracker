import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

const baseUrl = '/api';

const Exercise = (props) => {
	return (
		 <tr>
			<td>{props.exercise.username}</td>
			<td>{props.exercise.description}</td>
			<td>{props.exercise.duration}</td>
			<td>{props.exercise.date.substring(0,10)}</td>
			<td>
			<Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
			</td>
		</tr>
	)
}

export default class ExercisesList extends Component {
	constructor(props) {
		super(props);
		this.deleteExercise = this.deleteExercise.bind(this);
		this.state = { exercises: [] };
	}
	
	componentDidMount() {
		console.log(`${baseUrl}/exercises/`);
		axios.get(`${baseUrl}/exercises/`).then(res => {
			console.log("aaa", res.data, typeof(res.data));
			this.setState({ exercises: res.data })
		}).catch(error => {
			console.log(`Error in mounting: ${error}`);
		})
	}
	
	deleteExercise(id) {
		axios.delete(`${baseUrl}/exercises/${id}/`).then(res => {
			// console.log(res.data);
			
			axios.get(`${baseUrl}/exercises/`).then(res => {
				this.setState({ exercises: res.data })
			}).catch(error => {
				console.log(error);
			});
		}).catch(error => {
				console.log(error);
			});
	}
	
	exerciseList() {
		console.log("xxxx", this.state.exercises, typeof(this.state.exercises));
		return this.state.exercises.map(curretExercise => {
			return <Exercise exercise={curretExercise} deleteExercise={this.deleteExercise} key={curretExercise._id} />
		})
	}
	
	
	render() {
		return (
			<div>
				<h3>Logged Exercises</h3>
				<table className="table">
				<thead className="thead-light">
					<tr>
					<th>Username</th>
					<th>Description</th>
					<th>Duration</th>
					<th>Date</th>
					<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{ this.exerciseList() }
				</tbody>
				</table>
			</div>
		)
	}
}