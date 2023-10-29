/* eslint-disable no-unused-vars */
import axios from "axios"
import { createRef, useState } from "react"

const CreateProduct = () => {
	const [productName, setProductName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState("")
	const [stockQuantity, setStockQuantity] = useState("")
	const [category, setCategory] = useState(1)
	const [file, setFile] = useState(null)

	const handleFileChange = (e) => {
		setFile(e.target.files[0])
	}

	const handleFormSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append("image", file)
		formData.append("product_name", productName)
		formData.append("description", description)
		formData.append("categoryId", category)
		formData.append("price", price)
		formData.append("stock_quantity", stockQuantity)

		axios
			.post("http://localhost:4000/products/create-product", formData)
			.then((response) => {
				//response
				console.log(response.data)
			})
			.catch((error) => {
				// error
				console.error(error)
			})
	}
	// const handleFormSubmit = (e) => {
	// 	e.preventDefault()
	// 	const productData = {
	// 		product_name: productName,
	// 		description: description,
	// 		price: price,
	// 		stock_quantity: stockQuantity,
	// 		image: image,
	// 		categoryId: category
	// 	}
	// 	console.log(productData)
	// 	axios
	// 		.post("http://localhost:4000/products/create-product", productData)
	// 		.then((response) => {
	// 			//response
	// 			console.log(response.data)
	// 		})
	// 		.catch((error) => {
	// 			// error
	// 			console.error(error)
	// 		})
	// }

	return (
		<div>
			<h1 className="font-bold text-2xl">Create Product</h1>

			<form onSubmit={handleFormSubmit} encType="multipart/form-data">
				<div>
					<input type="text" name="name" placeholder="Product Name" onChange={(e) => setProductName(e.target.value)} />
				</div>
				<div>
					<input type="text" name="description" placeholder="Product Description:" onChange={(e) => setDescription(e.target.value)} />
				</div>
				<div>
					<input type="text" name="price" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
				</div>
				<div>
					<input type="text" name="stock_quantity" placeholder="Stock Quantity" onChange={(e) => setStockQuantity(e.target.value)} />
				</div>

				<div className="mb-3">
					<label className="btn btn-outline-secondary col-md-12">
						{/* <input type="file" name="image" accept="image/*" onChange={handleImageChange} /> */}
						<input type="file" name="image" accept="image/*" onChange={handleFileChange} />
					</label>
				</div>
				<button type="submit" className="bg-red-700 text-white p-2 rounded-lg m-2">
					Create Product
				</button>
			</form>
		</div>
	)
}

export default CreateProduct
