"use client";

import { useState,useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import AppTable, { Column } from "@/components/ui/AppTable";
import AppModal from "@/components/ui/AppModal";
import { addCategory, getCategories, updateCategory } from "@/redux/food/food.actions";

/* ---------------- Types ---------------- */

type Category = {
  id: string | number;
  _id?: string;
  name: string;
  isActive: boolean;
};

interface CategoryFormValues {
  name: string;
  status: "active" | "inactive";
}
type FilterOption = {
    label: string;
    value: string | boolean;
  };

/* ---------------- Validation ---------------- */

const CategorySchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  status: Yup.string()
    .oneOf(["active", "inactive"])
    .required("Status is required"),
});

/* ---------------- Component ---------------- */

export default function CategoriesPage() {
  const dispatch = useDispatch<any>();

//   const [categories, setCategories] = useState<Category[]>([
//     { id: 1, name: "Pizza", isActive: true },
//     { id: 2, name: "Burgers", isActive: true },
//     { id: 3, name: "Desserts", isActive: false },
//   ]);
  const { categories,addSuccess,updateSuccess, loading, total } = useSelector(
    (state: any) => state.food
  );

  

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const paginatedData = categories.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  console.log("categoriescategories",paginatedData)

  /* ---------------- Handlers ---------------- */


  const openAdd = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setIsModalOpen(true);
  };

  const deleteCategory = (id: string | number) => {
    if (!confirm("Delete this category?")) return;
   // setCategories(prev => prev.filter(c => c.id !== id));
  };

  /* ---------------- Table Columns ---------------- */

  const columns: Column<Category>[] = [
    { key: "name", label: "Category Name" },
    {
      key: "isActive",
      label: "Status",
      render: row => (
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            row.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: row => (
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(row)}
            className="text-success hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => deleteCategory(row.id)}
            className="text-danger hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Close modal & refresh list only on successful add/update
  useEffect(() => {
    //if (addSuccess || updateSuccess) {
      setIsModalOpen(false);

      dispatch(
        getCategories({
          search: "",
          page,
          limit: 10,
        })
      );
    //}
  }, [addSuccess,updateSuccess, dispatch, page]);
  /* ---------------- UI ---------------- */

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold text-black">Categories</h1>
        <button
          onClick={openAdd}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          + Add Category
        </button>
      </div>

      {/* Table */}
      <AppTable
        columns={columns}
        data={paginatedData}
        page={page}
        pageSize={pageSize}
        total={categories.length}
        onPageChange={setPage}
        searchKey="name"
        filterKey="isActive"
        filterOptions={[
            { label: "Active", value: "true" },
            { label: "Inactive", value: "false" },
          ]}
      />

      {/* Modal + Formik */}
      <AppModal
        isOpen={isModalOpen}
        title={editing ? "Edit Category" : "Add Category"}
        onClose={() => setIsModalOpen(false)}
      >
        <Formik<CategoryFormValues>
          initialValues={{
            name: editing?.name || "",
            status: editing?.isActive ? "active" : "inactive",
          }}
          validationSchema={CategorySchema}
          enableReinitialize
          onSubmit={(values) => {
            const isActive = values.status === "active";

            // if (editing) {
            //   setCategories(prev =>
            //     prev.map(c =>
            //       c.id === editing.id
            //         ? { ...c, name: values.name, isActive }
            //         : c
            //     )
            //   );
            // } else {
            //   setCategories(prev => [
            //     ...prev,
            //     {
            //       id: Date.now(),
            //       name: values.name,
            //       isActive,
            //     },
            //   ]);
            // }

            // ✅ API / Redux payload
            if (editing) {
              const idToSend = editing._id ?? editing.id;

              dispatch(
                updateCategory({
                  id: idToSend,
                  name: values.name,
                  isActive,
                })
              );
            } else {
              dispatch(
                addCategory({
                  name: values.name,
                  isActive,
                })
              );
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <Field
                  name="name"
                  placeholder="Category name"
                  className="w-full border text-black rounded-lg px-3 py-2"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-sm text-danger mt-1"
                />
              </div>

              {/* Status */}
              <div>
                <Field
                  as="select"
                  name="status"
                  className="w-full border text-black rounded-lg px-3 py-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="p"
                  className="text-sm text-danger mt-1"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  //disabled={isSubmitting}
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </AppModal>
    </div>
  );
}
