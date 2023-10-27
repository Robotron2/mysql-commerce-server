import { Link } from "react-router-dom"
import Header from "../../Components/Layouts/Header"
import Image from "../../assets/image1.jpg"
import Image2 from "../../assets/image2.jpg"
import Footer from "../../Components/Layouts/Footer"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules"
import "swiper/swiper-bundle.css"

// Import Swiper styles
import "swiper/css"

function Home() {
	const myArray = [1, 2, 3, 4, 5, 6]
	const sliderArray = ["Image", "Image2", "Image", "Image2"]
	return (
		<>
			<Header />
			<div className="md:px-14 lg:px-44 bg-gray-900">
				<div className="w-full secondary-nav md:flex justify-around lg:justify-between items-center p-3 text-white">
					<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer">All</h6>
					<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer">Phones</h6>
					<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer">Computers</h6>
					<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer">Gaming</h6>
					<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer">Men</h6>
					<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer">Women</h6>
					<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer">Children</h6>
					<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer">Food</h6>
				</div>
			</div>
			<div className="showCase grid grid-cols-4 grid-flow-row gap-4 md:px-14 lg:px-44 mt-6 cursor-pointer">
				<div className="large sm:col-span-4 lg:col-span-3 rounded shadow-xl">
					<Swiper
						modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
						spaceBetween={30}
						centeredSlides={true}
						autoplay={{
							delay: 2000,
							disableOnInteraction: false
						}}
						pagination={{
							clickable: true
						}}
						navigation={true}
						slidesPerView={1}
						scrollbar={{ draggable: true }}
						onSwiper={() => {
							//
						}}
						loop={true}
					>
						{sliderArray.map((item, i) => {
							return (
								<SwiperSlide key={i}>
									<Link to={"/"}>
										<img src={item === "Image" ? Image : Image2} alt="product-img" className="w-full object-cover h-80 rounded-md" />
									</Link>
								</SwiperSlide>
							)
						})}
					</Swiper>
				</div>
				<div className="show-grid sm:col-span-4 lg:col-span-1 grid grid-cols-4 gap-4 shadow-xl">
					<div className=" col-span-2 rounded">
						<Link>
							<img src={Image2} alt="image" className=" object-cover h-full rounded-md" />
						</Link>
					</div>
					<div className=" col-span-2 rounded">
						<Link>
							<img src={Image2} alt="image" className=" object-cover h-full rounded-md" />
						</Link>
					</div>
					<div className=" col-span-2">
						<Link>
							<img src={Image2} alt="image rounded" className=" object-cover h-full rounded-md" />
						</Link>
					</div>
					<div className=" col-span-2 rounded">
						<Link>
							<img src={Image2} alt="image" className=" object-cover h-full rounded-md" />
						</Link>
					</div>
				</div>
			</div>
			<div className="top-category bg-inherit md:px-14 lg:px-44 mt-6">
				<div className=" bg-gray-900/90 rounded-tr-lg rounded-tl-lg flex justify-between p-3 text-white font-bold shadow-xl">
					<h4 className="text-2xl">Today&apos;s Deals</h4>
					<Link>
						<h6 className="font-semibold cursor-pointer">See all</h6>
					</Link>
				</div>
				<div className="deal-grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 pt-2">
					{myArray.map((_, i) => {
						return (
							<Link key={i + 1}>
								<div className="child  bg-gray-200 shadow-lg rounded transform hover:scale-95 transition ease-in-out duration-300">
									<div className="grid lg:grid-cols-3 gap-3">
										<img src={Image} alt="deals" className="object-cover rounded h-32 w-full" />
										<div className="justify-self-center place-self-center mt-0 mb-1">
											<h4 className="font-bold text-lg">Product Title</h4>
											<p className="font-bold">$1000</p>
										</div>
									</div>
								</div>
							</Link>
						)
					})}
				</div>
			</div>

			<Footer />
		</>
	)
}

export default Home
