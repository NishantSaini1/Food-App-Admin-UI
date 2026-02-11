'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

import AppTable, { Column } from '@/components/ui/AppTable';
import AppModal from '@/components/ui/AppModal';
import Input from '@/components/ui/Input';

/* ================= TYPES ================= */

type Addon = { name: string; price: number };
type Variant = { name: string; price: number };

type Food = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  addons: Addon[];
  variants: Variant[];
};

type FoodFormValues = {
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  isAvailable: boolean;
  addons: { name: string; price: string }[];
  variants: { name: string; price: string }[];
};

const categories = ['Pizza', 'Burger', 'Dessert', 'Drinks'];

/* ================= VALIDATION ================= */

const FoodSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number().positive().required('Required'),
  category: Yup.string().required('Required'),
  image: Yup.string().url().required('Required'),
});

/* ================= PAGE ================= */
const INITIAL_FOODS: Food[] = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic delight with mozzarella cheese',
    price: 299,
    category: 'Pizza',
    image:
      'https://images.unsplash.com/photo-1601924582975-7e670c1f6c6c',
    isAvailable: true,
    variants: [
      { name: 'Regular', price: 299 },
      { name: 'Medium', price: 399 },
    ],
    addons: [
      { name: 'Extra Cheese', price: 50 },
      { name: 'Olives', price: 30 },
    ],
  },
  {
    id: 2,
    name: 'Veg Burger',
    description: 'Crispy veg patty with lettuce',
    price: 149,
    category: 'Burger',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349',
    isAvailable: false,
    variants: [],
    addons: [],
  },
];
export default function FoodsPage() {
  const router = useRouter();

  const [foods, setFoods] = useState<Food[]>(INITIAL_FOODS);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);

  const paginatedData = foods.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  /* ================= HANDLERS ================= */

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

  const toggleAvailability = (id: number) => {
    setFoods(prev =>
      prev.map(f =>
        f.id === id ? { ...f, isAvailable: !f.isAvailable } : f
      )
    );
  };

  /* ================= TABLE ================= */

  const columns: Column<Food>[] = [
    { key: 'name', label: 'Food Name' },
    {
      key: 'price',
      label: 'Price',
      render: row => <>₹{row.price}</>,
    },
    { key: 'category', label: 'Category' },
    {
      key: 'isAvailable',
      label: 'Status',
      render: row => (
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            row.isAvailable
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {row.isAvailable ? 'Available' : 'Unavailable'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: row => (
        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/admin/foods/${row.id}`)}
            className="text-blue-600 hover:underline"
          >
            View
          </button>
          <button
            onClick={() => openEdit(row)}
            className="text-green-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => toggleAvailability(row.id)}
            className="text-orange-600 hover:underline"
          >
            {row.isAvailable ? 'Disable' : 'Enable'}
          </button>
          <button
            onClick={() => deleteFood(row.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg md:text-xl font-semibold text-black">
          Foods
        </h1>
        <button
          onClick={openAdd}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Food
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <AppTable
          columns={columns}
          data={paginatedData}
          page={page}
          pageSize={pageSize}
          total={foods.length}
          onPageChange={setPage}
          searchKey="name"
        />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <FoodMobileList
          foods={paginatedData}
          onView={food => router.push(`/admin/foods/${food.id}`)}
          onEdit={openEdit}
          onToggle={toggleAvailability}
          onDelete={deleteFood}
        />
      </div>

      {/* ================= MODAL ================= */}
      <AppModal
        isOpen={isModalOpen}
        title={editingFood ? 'Edit Food' : 'Add Food'}
        onClose={() => {
          setIsModalOpen(false);
          setEditingFood(null);
        }}
      >
        <Formik<FoodFormValues>
          enableReinitialize
          validationSchema={FoodSchema}
          initialValues={{
            name: editingFood?.name || '',
            description: editingFood?.description || '',
            price: editingFood?.price?.toString() || '',
            category: editingFood?.category || '',
            image: editingFood?.image || '',
            isAvailable: editingFood?.isAvailable ?? true,
            addons:
              editingFood?.addons.map(a => ({
                name: a.name,
                price: a.price.toString(),
              })) || [],
            variants:
              editingFood?.variants.map(v => ({
                name: v.name,
                price: v.price.toString(),
              })) || [],
          }}
          onSubmit={(values) => {
            const food: Food = {
              id: editingFood?.id ?? Date.now(),
              name: values.name,
              description: values.description,
              price: Number(values.price),
              category: values.category,
              image: values.image,
              isAvailable: values.isAvailable,
              addons: values.addons.map(a => ({
                name: a.name,
                price: Number(a.price),
              })),
              variants: values.variants.map(v => ({
                name: v.name,
                price: Number(v.price),
              })),
            };

            setFoods(prev =>
              editingFood
                ? prev.map(f => (f.id === food.id ? food : f))
                : [...prev, food]
            );

            setIsModalOpen(false);
            setEditingFood(null);
          }}
        >
          {({ values }) => (
            <Form className="space-y-4">
              <Field name="name" component={Input} placeholder="Food name" />
              <Field name="description" component={Input} placeholder="Description" />
              <Field name="price" component={Input} type="number" placeholder="Price" />

              <Field as="select" name="category" className="input">
                <option value="">Select Category</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Field>

              <Field name="image" component={Input} placeholder="Image URL" />

              <label className="flex items-center gap-2">
                <Field type="checkbox" name="isAvailable" />
                Available
              </label>

              {/* Variants */}
              <FieldArray name="variants">
                {({ push, remove }) => (
                  <>
                    {values.variants.map((_, i) => (
                      <div key={i} className="flex gap-2">
                        <Field name={`variants.${i}.name`} component={Input} placeholder="Variant name" />
                        <Field name={`variants.${i}.price`} component={Input} type="number" placeholder="Price" />
                        <button type="button" onClick={() => remove(i)}>✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push({ name: '', price: '' })}>
                      + Add Variant
                    </button>
                  </>
                )}
              </FieldArray>

              {/* Addons */}
              <FieldArray name="addons">
                {({ push, remove }) => (
                  <>
                    {values.addons.map((_, i) => (
                      <div key={i} className="flex gap-2">
                        <Field name={`addons.${i}.name`} component={Input} placeholder="Addon name" />
                        <Field name={`addons.${i}.price`} component={Input} type="number" placeholder="Price" />
                        <button type="button" onClick={() => remove(i)}>✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push({ name: '', price: '' })}>
                      + Add Addon
                    </button>
                  </>
                )}
              </FieldArray>

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
                  className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                  {editingFood ? 'Update' : 'Save'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </AppModal>
    </div>
  );
}

/* ================= MOBILE LIST ================= */

function FoodMobileList({
  foods,
  onView,
  onEdit,
  onToggle,
  onDelete,
}: {
  foods: Food[];
  onView: (food: Food) => void;
  onEdit: (food: Food) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="space-y-4">
      {foods.map(food => (
        <div key={food.id} className="border rounded-xl p-4 shadow-sm">
          <div className="flex gap-4">
            <img
              src={food.image}
              className="w-20 h-20 rounded-lg object-cover border"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{food.name}</h3>
              <p className="text-sm text-gray-500">{food.category}</p>
              <p className="font-medium">₹{food.price}</p>

              <div className="flex gap-3 mt-2 text-sm">
                <button onClick={() => onView(food)} className="text-blue-600">View</button>
                <button onClick={() => onEdit(food)} className="text-green-600">Edit</button>
                <button onClick={() => onToggle(food.id)} className="text-orange-600">
                  {food.isAvailable ? 'Disable' : 'Enable'}
                </button>
                <button onClick={() => onDelete(food.id)} className="text-red-600">Delete</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
