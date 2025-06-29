import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../Redux/category/categoryApi";
import Swal from "sweetalert2";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading: loadingCategory } = useGetCategoryQuery(id);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const [name, setName] = useState("");

  useEffect(() => {
    if (data?.data?.name) {
      setName(data.data.name);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      Swal.fire("Validation Error", "Category name is required", "warning");
      return;
    }
    try {
      const res = await updateCategory({ id, formData: { name } }).unwrap();
      if (res.success) {
        Swal.fire("Success", res.message, "success");
        navigate("/categories");
      }
    } catch (err) {
      Swal.fire("Error", err?.data?.message || "Failed to update category", "error");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Edit Category</h2>
      {loadingCategory ? (
        <p className="text-center">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Category"}
          </button>
        </form>
      )}
    </div>
  );
}
