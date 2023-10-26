import { Toaster } from "react-hot-toast"
import CustomNav from "../Utils/CustomNav"
import { Helmet } from "react-helmet"
import Header from "./Header"
import Footer from "./Footer"

// eslint-disable-next-line react/prop-types
const Layout = ({ children, title, description, keywords, author }) => {
	return (
		<div>
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
				<meta name="author" content={author} />
				<title>{title}</title>
			</Helmet>
			<Toaster />
			{title == "Dashboard" ? <CustomNav /> : <Header />}
			{title == "Booking-summary" ? <CustomNav /> : <Header />}

			<main>{children}</main>
			<Footer />
		</div>
	)
}

Layout.defaultProps = {
	title: "RoboShop - Shop Now!",
	description: "Shopping system ",
	keywords: "E-commerce, MERN, SQl, Fullstac",
	author: "Theophilus"
}

export default Layout
