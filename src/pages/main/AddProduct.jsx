import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../Redux/product/productApi";
import { useGetCategoriesQuery } from "../../Redux/category/categoryApi";
import Swal from "sweetalert2";

export default function AddProduct() {
  const navigate = useNavigate();
  const [addProduct] = useAddProductMutation();
  const { data: categoriesData } = useGetCategoriesQuery();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categoryId: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("categoryId", formData.categoryId);
    data.append("image", formData.image);

    try {
      const res = await addProduct(data);
      console.log(res);
      if (res?.data?.success) {
        Swal.fire("Success", "Product added successfully!", "success");
        navigate("/");
      }
    } catch (e) {
      Swal.fire("Error", "Failed to add product", "error");
        console.error("Error adding product:", e);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="form-input"
          required
        />
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="form-input"
          required
        >
          <option value="">Select Category</option>
          {categoriesData?.data?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="form-input"
          required
        />
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
