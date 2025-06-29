import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "../../Redux/category/categoryApi";
import Swal from "sweetalert2";

export default function Categories() {
  const { data: categoryData } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This category will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id);
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 shadow p-2">
        <h2 className="text-xl font-semibold">All Categories</h2>
        <Link
          to="/add-category"
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          Add Category
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoryData?.data?.map((category, index) => (
              <tr key={category.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{category.name}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <Link
                      to={`/edit-category/${category.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}