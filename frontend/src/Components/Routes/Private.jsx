/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import axios from "axios"
import Login from "../../Pages/Auth/Pages/Login"
import useAuth from "./../CustomHooks/UseAuth"
import Spinner from "../Utils/Spinner"

const PrivateRoute = () => {
	const [ok, setOk] = useState("")
	const [spinner, setSpinner] = useState(null)
	const [auth, setAuth] = useAuth()
	const localAuth = JSON.parse(localStorage.getItem("auth"))

	axios.defaults.withCredentials = true

	const authCheck = async () => {
		setSpinner(true)
		const apiEndpoint = `${import.meta.env.VITE_REACT_APP_API}`
		try {
			const authResponse = await axios.get(`${apiEndpoint}/auth/`, {
				headers: {
					Authorization: `Token ${localAuth?.token}`
				}
			})
			if (authResponse.data.success) {
				setOk(true)
				setSpinner(false)
			}
			console.log(authResponse)
		} catch (error) {
			console.log(error)
			setOk(false)
		}
		setSpinner(false)
	}

	useEffect(() => {
		authCheck()
	}, [auth?.token])

	return (
		<>
			{spinner && <Spinner />}
			{ok ? <Outlet /> : <Login />}
		</>
	)
}

export default PrivateRoute
