import { Link } from "react-router-dom"
import brand from "../../assets/brandLogo.png"

const Header = () => {
	return (
		<>
			<div className="bg-gray-800 text-white p-4">
				<div className="flex justify-between px-40 items-center">
					<div className="logo flex items-center">
						<img src={brand} alt="Brand" className="w-full h-10" />
						<h1 className="font-bold text-gray-100">RoboShopp</h1>
					</div>
					<div className="search flex bg-gray-500 items-center w-96 p-2 rounded-full">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
						</svg>
						<input type="text" placeholder="Search product name, category or type" className="w-full bg-transparent focus:outline-none" />
					</div>
					<div className="login flex justify-between items-center w-56">
						<Link className="mx-1 bg-white text-gray-900 p-2 rounded-full w-full text-sm text-center hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out">Login</Link>
						<Link className="mx-1 bg-white text-gray-900 p-2 rounded-full w-full text-sm text-center hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out">Sign Up</Link>
					</div>
					<div className="cart flex justify-between cursor-pointer items-center">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
							/>
						</svg>
						<p className="font-semibold text-gray-200 mr-1">Cart</p>
						<span className="font-bold">{0}</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default Header
