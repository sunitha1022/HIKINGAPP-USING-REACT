import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'
import Header from './Header'
import Trail from './Trail';
import MyFavTrail from './MyFavTrail'
import TrailsContainer from './TrailsContainer';

class FavHikes extends Component {
	constructor() {
		super()
		this.state = {
			allFav: [],
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)

	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleFav(event) {
		event.preventDefault()
		console.log('clicked fav button ')
		const username = event.target.value;
		console.log('the username-----', username)
		//axios.get(`http://localhost:5000/allfav/${username}`)
		//axios.delete(`${process.env.REACT_APP_BASE_URL}/api/articles/${id}`)
		axios.get(`http://localhost:5000/allfav/${username}`)
			.then(response => {
				console.log(response.status)
				console.log('====added fav response: ======')
				console.log(response.data)
				this.props.set(response.data.fav)
				if (response.status === 200) {
					this.setState({
						redirectTo: '/'
					})
				}
			}).catch(error => {
				console.log(' get  error: ')
				console.log(error);

			})
	}
	handleSubmit(event) {
		event.preventDefault()
		console.log('saving the fav handleFavSubmit')
		const username = event.target.value;
		console.log('username', username);
		console.log('fav', this.props.favTrails);
		axios
			.post('http://localhost:5000/fav/', {
				username: username,
				fav: this.props.favTrails
			})
			.then(response => {
				console.log(response.status)
				console.log('====added fav response: ======')
				console.log(response.data)
				if (response.status === 200) {
					// update App.js state

					this.setState({
						redirectTo: '/'
					})
				}
			}).catch(error => {
				console.log('there is error error: ')
				console.log(error);

			})
	}

	componentDidMount() {
		let fav = [];
		let result = [];
		console.log('username---->', this.props.username);
		let username = this.props.username;
		axios.get(`http://localhost:5000/allfav/${username}`)
			.then(response => {
				console.log(response.status)
				console.log('===The result i got from the fav======')
				console.log('fav trails===>', response.data.fav)
				fav = response.data.fav;
				fav.forEach((arrObj) => {
					var jsonData = (JSON.stringify(arrObj.favHikingPlace))
					console.log('fav trails===>', jsonData)
					result.push(jsonData);

				});
				console.log('legth of the array', fav.length)
				console.log('legth of the  result array', result.length)
				console.log('display of the  result array', result)
				console.log('===============');
				//console.log(result[0].replace(/"/g, ""))
				//console.log((JSON.stringify(result)))
				console.log('=====result==========');

				let foo = result;
				console.log(foo[0].name);
				for (var i = 0; i < result.length; i++) {
					result[i] = result[i].replace(/"/g, "");
					console.log(i);
					console.log(result[i]);
				}

				console.log('===============');

				this.props.setAllfav(result)


			}).catch(error => {
				console.log(' get  error: ')
				console.log(error);

			})
	}
	render() {


		let allTrails = '';
		if (this.props.favTrails.length > 0) {
			allTrails = this.props.favTrails.map((trail, index) => {
				console.log('this is the trail--->', trail.name);
				if (trail.name != null) {
					return <Trail loggedIn={this.props.loggedIn}
						trail={trail}
						setCurrentTrail={this.props.setCurrentTrail}
						setFavTrails={this.props.setFavTrails} />
				}
			})
		}


		let mytrails = '';
		if (this.props.allfav.length > 0) {
			console.log('im here-----')
			mytrails = this.props.allfav.map((trail, index) => {
				console.log('this is the trail--->', trail);


				return <MyFavTrail loggedIn={this.props.loggedIn}
					trail={trail}
					setCurrentTrail={this.props.setCurrentTrail}
					setAllfav={this.props.setAllfav} />



			})
		}



		//		let allfav = <h4> No Articles!</h4>
		//		if (this.props.allfav.length > 0) {
		//			allfav = this.props.allfav.map((fav, index) => {
		//				if (fav.name != null) {
		//					return <Trail loggedIn={this.props.loggedIn}
		//						trail={fav}
		//						setCurrentTrail={this.props.setCurrentTrail}
		//						setFavTrails={this.props.setFavTrails} />
		//				}
		//			})
		//
		//		}
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div>
					<h4>FavHikes</h4>

					<Header setTrails={this.setTrails}
						username={this.props.username}
						loggedIn={this.props.loggedIn} />



					<form className="form-horizontal">



						{allTrails}
						{/*{mytrails}*/}

						<button
							className="btn btn-primary col-1 col-mr-auto"
							value={this.props.username}

							onClick={this.handleSubmit}
							type="submit">SAVE My Fav</button>



					</form>
				</div>
			)
		}
	}
}

export default FavHikes
