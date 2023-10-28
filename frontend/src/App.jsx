import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Home from "./Pages/Home/Home"
import CreateProduct from "./Pages/Admin/pages/CreateProduct"

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<CreateProduct />} />
					{/* <Route path="/" element={<Home />} /> */}
				</Routes>
			</Router>
		</>
	)
}

export default App
