import PropTypes from "prop-types"

const Button = (props) => {
	return (
		<>
			<button className={props.className} onClick={props.clickProp} type={props.type}>
				{props.name}
			</button>
		</>
	)
}

Button.propTypes = {
	name: PropTypes.string,
	className: PropTypes.string,
	clickProp: PropTypes.func || PropTypes.string,
	type: PropTypes.string
}

Button.defaultProp = {
	clickProp: ""
}
export default Button
