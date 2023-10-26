import { Link } from "react-router-dom"
// import brand from "../../assets/brandLogo.png"

const Footer = () => {
	const myArray = [1, 2, 3]

	return (
		<>
			<div className="bg-gray-500 p-2 text-gray-200 mt-8 ">
				<div className="flex justify-between px-40 items-center">
					{myArray.map((_, i) => {
						return (
							<div className="linkss flex justify-center items-start hover:text-white" key={i}>
								<div className="bg-gray-100 rounded-full mr-2 my-auto p-2">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6  text-gray-700 ">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
										/>
									</svg>
								</div>

								<Link>
									<div className="link-type ml-1">
										<h6 className="uppercase font-bold">Email Support</h6>
										<p>example@email.com</p>
									</div>
								</Link>
							</div>
						)
					})}
					<div className="search flex bg-gray-100 items-center w-96 p-2 rounded-full">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-700">
							<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
						</svg>
						<input type="text" placeholder="Search product name, category or type" className="w-full bg-transparent text-gray-700 focus:outline-none" />
					</div>
				</div>
			</div>
			<div className="footer bg-gray-950 pt-10 pb-16 text-gray-100">
				<div className="px-44 flex justify-between items-start text-gray-400">
					<div className="w-80 grid grid-cols-3 text-center">
						<div className="col-span-3">
							{/* <img src={brand} alt="Brand" className="w-20 h-20 mx-auto" /> */}
							<h1 className="text-2xl">Shop Now</h1>
						</div>
						<h6 className="col-span-3 mt-1">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut cupiditate eos similique commodi possimus quo consequuntur minus, exercitationem rem id fuga iure placeat, sit
							esse, aliquam aliquid autem deserunt! Ut!
						</h6>
					</div>
					<div>
						<h2 className="text-lg font-semibold">About RoboShoppp</h2>
						<p>Contact Us</p>
						<p>About Us</p>
						<p>Terms and Conditions</p>
					</div>
					<div>
						<h2 className="text-lg font-semibold">About RoboShoppp</h2>
						<p>Contact Us</p>
						<p>About Us</p>
						<p>Terms and Conditions</p>
					</div>
				</div>
				<div className="bg-gray-700 font-bold uppercase text-center mt-8 p-2">Robotron &copy;2023</div>
			</div>
		</>
	)
}

export default Footer
