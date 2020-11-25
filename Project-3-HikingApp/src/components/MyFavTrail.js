import React, { Component } from 'react';
import { BrowserRouter as BrowserRouter, Route, Link } from 'react-router-dom'



class MyFavTrail extends Component {

	render() {
		return (
			<>
				<div >


					{this.props.trail}
					<h1>helllo</h1>
					{this.props.trail[13]}

					<div className="column" >
						<div className="card">
							image small:	{this.props.trail.imgSqSmall}
							{this.props.trail.length}

							<div className="card-title">
								<img className="card-image" src={this.props.trail.imgSqSmall} alt=""></img>
								<div className="difficulty">
									<p><b>Stars</b> {this.props.trail.stars} </p>
									{<p><b>Difficulty</b> {this.props.trail.difficulty}</p>}
								</div>
							</div>

							<div className="card-detail">
								<p>{this.props.trail.name}</p>
								<p><b>Length</b> {this.props.trail.length} Miles</p>
							</div>
							<p>{this.props.trail.summary}</p>
							<p>Location: {this.props.trail.location}</p>
							<Link to='/details' onClick={() => { this.props.setCurrentTrail(this.props.trail) }}>More Details</Link>
						</div>
					</div>
				</div>
			</>
		)
	}


}
export default MyFavTrail;