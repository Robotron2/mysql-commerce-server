import { Link, useNavigate } from "react-router-dom"

import toast from "react-hot-toast"
import Button from "./Button"

const CustomNav = () => {
	const navigate = useNavigate()
	const handleLogout = () => {
		const auth = JSON.parse(localStorage.getItem("auth"))
		if (auth) {
			localStorage.removeItem("auth")
			toast.success("Logged out successfully!")
			navigate("/login")
		}
	}

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-logo">
				<div className="container">
					<Link to={"/"}>
						<h1>Brand</h1>
					</Link>
					<Button className={"btn btn-sm btn-teal-dark"} name={"Logout"} clickProp={handleLogout} />
				</div>
			</nav>
		</>
	)
}

export default CustomNav
