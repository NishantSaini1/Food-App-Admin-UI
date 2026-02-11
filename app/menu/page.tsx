'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import AppTable, { Column } from '@/components/ui/AppTable';
import AppModal from '@/components/ui/AppModal';

type Food = {
  id: number;
  name: string;
  price: number;
  category: string;
  status: 'active' | 'inactive';
};

const categories = ['Pizza', 'Burger', 'Dessert', 'Drinks'];

const FoodSchema = Yup.object({
  name: Yup.string().required('Food name is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive'),
  category: Yup.string().required('Category is required'),
  status: Yup.string().oneOf(['active', 'inactive']).required(),
});

export default function FoodsPage() {
  const [foods, setFoods] = useState<Food[]>([
    { id: 1, name: 'Margherita Pizza', price: 299, category: 'Pizza', status: 'active' },
    { id: 2, name: 'Veg Burger', price: 149, category: 'Burger', status: 'active' },
  ]);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);

  const paginatedData = foods.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  /* ---------------- Handlers ---------------- */

  const openAdd = () => {
    setEditingFood(null);
    setIsModalOpen(true);
  };

  const openEdit = (food: Food) => {
    setEditingFood(food);
    setIsModalOpen(true);
  };

  const deleteFood = (id: number) => {
    if (!confirm('Delete this food item?')) return;
    setFoods(prev => prev.filter(f => f.id !== id));
  };

  /* ---------------- Table Columns ---------------- */

  const columns: Column<Food>[] = [
    { key: 'name', label: 'Food Name' },
    {
      key: 'price',
      label: 'Price',
      render: row => <>₹{row.price}</>,
    },
    { key: 'category', label: 'Category' },
    {
      key: 'status',
      label: 'Status',
      render: row => (
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            row.status === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: row => (
        <div className="flex gap-3">
          <button
            onClick={() => openEdit(row)}
            className="text-primary hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => deleteFood(row.id)}
            className="text-danger hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Foods</h1>
        <button
          onClick={openAdd}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          + Add Food
        </button>
      </div>

      {/* Table */}
      <AppTable
        columns={columns}
        data={paginatedData}
        page={page}
        pageSize={pageSize}
        total={foods.length}
        onPageChange={setPage}
        searchKey="name"
        filterKey="status"
        filterOptions={[
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ]}
      />

      {/* Modal with Formik */}
      <AppModal
        isOpen={isModalOpen}
        title={editingFood ? 'Edit Food' : 'Add Food'}
        onClose={() => setIsModalOpen(false)}
      >
        <Formik
          initialValues={{
            name: editingFood?.name || '',
            price: editingFood?.price || '',
            category: editingFood?.category || '',
            status: editingFood?.status || 'active',
          }}
          validationSchema={FoodSchema}
          enableReinitialize
          onSubmit={(values) => {
            if (editingFood) {
              setFoods(prev =>
                prev.map(f =>
                  f.id === editingFood.id
                    ? { ...f, ...values, price: Number(values.price) }
                    : f
                )
              );
            } else {
              setFoods(prev => [
                ...prev,
                {
                  id: Date.now(),
                  name: values.name,
                  price: Number(values.price),
                  category: values.category,
                  status: values.status,
                },
              ]);
            }

            setIsModalOpen(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <Field
                  name="name"
                  placeholder="Food name"
                  className="w-full border text-black rounded-lg px-3 py-2"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-sm text-danger mt-1"
                />
              </div>

              {/* Price */}
              <div>
                <Field
                  name="price"
                  type="number"
                  placeholder="Price"
                  className="w-full text-black border rounded-lg px-3 py-2"
                />
                <ErrorMessage
                  name="price"
                  component="p"
                  className="text-sm text-danger mt-1"
                />
              </div>

              {/* Category */}
              <div>
                <Field
                  as="select"
                  name="category"
                  className="w-full text-black border rounded-lg px-3 py-2"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="p"
                  className="text-sm text-danger mt-1"
                />
              </div>

              {/* Status */}
              <div>
                <Field
                  as="select"
                  name="status"
                  className="w-full text-black border rounded-lg px-3 py-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Field>
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
                  disabled={isSubmitting}
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
