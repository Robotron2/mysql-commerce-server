/* eslint-disable react/prop-types */
// import { useEffect, useState } from "react"
// import { Map, GoogleApiWrapper, Marker } from "google-map-react"

// function MapContainer(props) {
// 	const [userLocation, setUserLocation] = useState(null)

// 	useEffect(() => {
// 		if ("geolocation" in navigator) {
// 			navigator.geolocation.getCurrentPosition(
// 				(position) => {
// 					const { latitude, longitude } = position.coords
// 					setUserLocation({ latitude, longitude })
// 				},
// 				(error) => {
// 					console.error("Error getting user location:", error)
// 				}
// 			)
// 		} else {
// 			console.log("Geolocation is not available in this browser.")
// 		}
// 	}, [])

// 	return (
// 		<div>
// 			<h1>Google Maps Integration</h1>
// 			{userLocation && (
// 				<Map
// 					google={props.google}
// 					zoom={14}
// 					style={{ width: "100%", height: "400px" }}
// 					initialCenter={{
// 						lat: userLocation.latitude,
// 						lng: userLocation.longitude
// 					}}
// 				>
// 					<Marker
// 						name={"Marker 1"}
// 						position={{
// 							lat: userLocation.latitude,
// 							lng: userLocation.longitude
// 						}}
// 					/>
// 				</Map>
// 			)}
// 		</div>
// 	)
// }

// const Wrapper = GoogleApiWrapper({
// 	apiKey: "YOUR_GOOGLE_MAPS_API_KEY_HERE" // Replace with your API key
// })(MapContainer)

// export default Wrapper

// import GoogleMapReact from "google-map-react"

// const AnyReactComponent = ({ text }) => <div>{text}</div>

// export default function SimpleMap() {
// 	const defaultProps = {
// 		center: {
// 			lat: 10.99835602,
// 			lng: 77.01502627
// 		},
// 		zoom: 11
// 	}

// 	return (
// 		// Important! Always set the container height explicitly
// 		<div style={{ height: "100vh", width: "100%" }}>
// 			<GoogleMapReact bootstrapURLKeys={{ key: "" }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}>
// 				<AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
// 			</GoogleMapReact>
// 		</div>
// 	)
// }
