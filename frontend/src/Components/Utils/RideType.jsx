import PropTypes from "prop-types"
import Car from "../../assets/car-2.png"
import Button from "./Button"

const RideType = (props) => {
	return (
		<>
			<h4
				style={{
					fontSize: "15px",
					marginTop: "20px"
				}}
			>
				{props.title}
			</h4>
			<div className="ride-container container mt-5">
				<img src={Car} alt="car-type" />
				<div className="ride-details">
					<div className="ride-title">
						<h4>PRIVATE RIDE</h4>
						<hr />
					</div>
					<p className="ride-detail">
						Max of 3 Passengers <span>per vehicle</span>
					</p>
					<p className="ride-detail">
						Max of 3 Luggage bags <span>per vehicle</span>
					</p>
					<p className="ride-detail">
						Estimated time <span>per vehicle</span>
					</p>
				</div>
				<div className="price-tag">
					<h5 className="price">
						500.00 <span>naira</span>
					</h5>
					<p>per passenger</p>

					<Button className={"btn rounded-pill btn-teal-dark"} name={"Select"} />
				</div>
			</div>
			<br />
			<div className="ride-container container mb-5">
				<img src={Car} alt="car-type" />
				<div className="ride-details">
					<div className="ride-title">
						<h4>SHARED RIDE</h4>
						<hr />
					</div>
					<p className="ride-detail">
						Max of 3 Passengers <span>per vehicle</span>
					</p>
					<p className="ride-detail">
						Max of 3 Luggage bags <span>per vehicle</span>
					</p>
					<p className="ride-detail">
						Estimated time <span>per vehicle</span>
					</p>
				</div>
				<div className="price-tag">
					<h5 className="price">
						250.00 <span>naira</span>
					</h5>
					<p>per passenger</p>
					<Button className={"btn rounded-pill btn-teal-dark"} name={"Select"} />
				</div>
			</div>
		</>
	)
}

RideType.propTypes = {
	title: PropTypes.string
}

export default RideType
