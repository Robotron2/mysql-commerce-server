/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import axios from "axios"
import AuthContext from "./AuthContext"

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: null,
		token: ""
	})

	//default axios
	// axios.defaults.headers.common["Authorization"] = auth?.token
	axios.defaults.headers.common["Authorization"] = `Token ${auth?.token}`

	useEffect(() => {
		const userData = localStorage.getItem("auth")
		if (userData) {
			const parsedData = JSON.parse(userData)
			setAuth({
				...auth,
				user: parsedData.userData,
				token: parsedData.token
			})
		}
	}, [])

	return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>
}

export default AuthProvider
