import { Link } from "react-router-dom"
// import brand from "../../assets/brandLogo.png"

const Footer = () => {
	const myArray = [1, 2, 3]

	return (
		<>
			<div className=" bg-gray-500 p-2 text-gray-200 mt-8 ">
				<div className=" lg:flex justify-between md:hidden  lg:px-40 items-center">
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

					<div className="flex justify-center">
						<div className=" flex bg-gray-100 items-center w-96 p-2 rounded border-r-0 rounded-tr-none rounded-br-none">
							<input type="text" placeholder="Email support" className="w-full bg-transparent text-gray-700 focus:outline-none" />
						</div>
						<button className="bg-gray-800 rounded ml-0 rounded-tl-none rounded-bl-none p-2">Submit</button>
					</div>
				</div>
				{/* md:mt-8 */}
				<div className="flex justify-center lg:hidden">
					<div className=" flex bg-gray-100 items-center w-96 p-2 rounded border-r-0 rounded-tr-none rounded-br-none">
						<input type="text" placeholder="Email support" className="w-full bg-transparent text-gray-700 focus:outline-none" />
					</div>
					<button className="bg-gray-800 rounded ml-0 rounded-tl-none rounded-bl-none p-2">Submit</button>
				</div>
			</div>
			<div className="footer  bg-gray-950 pt-10 pb-16 text-gray-100">
				<div className="lg:px-44 md:grid grid-cols-4 lg:flex justify-between items-start text-gray-400">
					<div className="w-80 col-span-4 grid grid-cols-3 text-center md:mx-auto">
						<div className="col-span-3">
							<h1 className="text-2xl">Shop Now</h1>
						</div>
						<h6 className="col-span-3 mt-1">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut cupiditate eos similique commodi possimus quo consequuntur minus, exercitationem rem id fuga iure placeat, sit
							esse, aliquam aliquid autem deserunt! Ut!
						</h6>
					</div>
					<div className="col-span-2 md:mx-auto">
						<h2 className="text-lg font-semibold">About RoboShoppp</h2>
						<p>Contact Us</p>
						<p>About Us</p>
						<p>Terms and Conditions</p>
					</div>
					<div className="col-span-2 md:mx-auto">
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
