import axios from "axios"
import { useState } from "react"

const CreateProduct = () => {
	const [category, setCategory] = useState(1)
	const [photo, setPhoto] = useState("")
	const [productName, setProductName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState("")
	const [quantity, setQuantity] = useState("")

	const handleFormSubmit = (e) => {
		e.preventDefault()
		const productData = {
			product_name: productName,
			description: description,
			price: price,
			stock_quantity: quantity,
			photo: photo,
			category: category
		}
		console.log(productData)

		axios
			.post("http://localhost:4000/products/create-product", productData)
			.then((response) => {
				//response
				console.log(response.data)
			})
			.catch((error) => {
				// error
				console.error(error)
			})
	}

	return (
		<div>
			<h1 className="font-bold text-2xl">Create Product</h1>

			<form onSubmit={handleFormSubmit}>
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
					<input type="text" name="stock_quantity" placeholder="Stock Quantity" onChange={(e) => setQuantity(e.target.value)} />
				</div>

				<div className="mb-3">
					<label className="btn btn-outline-secondary col-md-12">
						{photo ? photo.name : "Upload image"}
						<input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden />
					</label>
				</div>

				<div className="mb-3">
					{photo && (
						<div className="text-center">
							<img src={URL.createObjectURL(photo)} alt="product-photo" height={"200px"} className="img img-responsive" />
						</div>
					)}
				</div>
				<button type="submit" className="bg-red-700 text-white p-2 rounded-lg m-2">
					Create Product
				</button>
			</form>
		</div>
	)
}

export default CreateProduct
