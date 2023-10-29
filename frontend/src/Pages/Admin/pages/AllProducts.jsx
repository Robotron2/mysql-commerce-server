import { useState, useEffect } from "react"
import axios from "axios"

function AllProducts() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		axios
			.get("http://localhost:4000/products/")
			.then((response) => {
				console.log(response.data.products)
				setProducts(response.data.products)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])
	// const baseUrl = "http://localhost:4000/"
	// const baseUrl = "http://localhost:4000/public/files/admin-image-1698597775190.png"
	const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`
	// const baseUrl = "http://localhost:4000"

	return (
		<div>
			<div>
				{products.map((product) => {
					console.log(product.Image.filePath)
					let imagePath = product.Image.filePath.replace("/public//g", "")
					return (
						<div key={product.id}>
							<h2>{product.productName}</h2>
							{product.Category.categoryName}
							{/* <p>{product.description}</p> */}
							{/* <p>Price: {product.price}</p> */}
							<p>Stock Quantity: {product.stockQuantity}</p>
							{/* <img src={`http://localhost:4000/products/${product.imageUrl}`} alt="Product Image" /> */}
							{/* <img
								src={`${baseUrl}/
`}
								alt="Product Image"
							/> */}
							<img src={`${baseUrl}/${imagePath}`} alt="Product Image" />
						</div>
					)
				})}
				{/* {console.log(products[0].Category.category_name)} */}
				{/* {console.log(products[6].Image.image)} */}
			</div>
		</div>
	)
}

export default AllProducts
