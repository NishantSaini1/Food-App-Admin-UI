'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

/* ================= TYPES ================= */

type Addon = {
  name: string;
  price: number;
};

type Variant = {
  name: string;
  price: number;
};

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

/* ================= MOCK DATA =================
   🔥 Replace this with API later
*/
const FOODS: Food[] = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic delight with 100% mozzarella cheese',
    price: 299,
    category: 'Pizza',
    image:
      'https://images.unsplash.com/photo-1601924582975-7e670c1f6c6c',
    isAvailable: true,
    variants: [
      { name: 'Regular', price: 299 },
      { name: 'Medium', price: 399 },
      { name: 'Large', price: 499 },
    ],
    addons: [
      { name: 'Extra Cheese', price: 50 },
      { name: 'Olives', price: 30 },
    ],
  },
];

/* ================= PAGE ================= */

export default function FoodDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const food = FOODS.find(f => f.id === Number(id));

  if (!food) {
    return (
      <div className="p-6">
        <p className="text-red-500">Food not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-blue-600 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Food Details
        </h1>
        <button
          onClick={() => router.back()}
          className="border px-4 py-2 rounded"
        >
          Back
        </button>
      </div>

      {/* Image */}
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-64 object-cover rounded-xl border"
      />

      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          {food.name}
        </h2>

        <p className="text-gray-600">
          {food.description}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Info label="Category" value={food.category} />
          <Info label="Price" value={`₹${food.price}`} />
          <Info
            label="Availability"
            value={food.isAvailable ? 'Available' : 'Unavailable'}
            highlight={food.isAvailable}
          />
        </div>
      </div>

      {/* Variants */}
      {food.variants.length > 0 && (
        <Card title="Variants">
          {food.variants.map((v, i) => (
            <Row key={i} name={v.name} price={v.price} />
          ))}
        </Card>
      )}

      {/* Add-ons */}
      {food.addons.length > 0 && (
        <Card title="Add-ons">
          {food.addons.map((a, i) => (
            <Row key={i} name={a.name} price={a.price} />
          ))}
        </Card>
      )}
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Info({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p
        className={`font-medium ${
          highlight === undefined
            ? ''
            : highlight
            ? 'text-green-600'
            : 'text-red-600'
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({
  name,
  price,
}: {
  name: string;
  price: number;
}) {
  return (
    <div className="flex justify-between border rounded-lg px-4 py-2">
      <span>{name}</span>
      <span className="font-medium">₹{price}</span>
    </div>
  );
}
