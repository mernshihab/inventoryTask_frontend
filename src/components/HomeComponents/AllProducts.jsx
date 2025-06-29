import { useState } from "react";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../../Redux/product/productApi";
import { useGetCategoriesQuery } from "../../Redux/category/categoryApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function AllProducts() {
  const { data: productsData } = useGetAllProductsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [filterCategory, setFilterCategory] = useState("");

  const filteredProducts = filterCategory
    ? productsData?.data?.filter(
        (product) => product.categoryId === parseInt(filterCategory)
      )
    : productsData?.data;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      }
    });
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <select
          className="input-field w-full md:w-auto"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Filter</option>
          {categoriesData?.data?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <Link
          to="/add-product"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow transition-all duration-200"
        >
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts?.map((product) => (
          <div
            key={product.id}
            className="rounded-lg shadow-md hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 bg-white"
          >
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-green-600 font-bold">${product.price}</p>
              <p className="text-sm text-gray-500">
                Category: {product.category?.name}
              </p>
              <button
                onClick={() => handleDelete(product.id)}
                className="mt-3 w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
