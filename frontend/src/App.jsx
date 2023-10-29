import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Home from "./Pages/Home/Home"
import CreateProduct from "./Pages/Admin/pages/CreateProduct"
import AllProducts from "./Pages/Admin/pages/AllProducts"

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<CreateProduct />} />
					<Route path="/all" element={<AllProducts />} />
					{/* <Route path="/" element={<Home />} /> */}
				</Routes>
			</Router>
		</>
	)
}

export default App
