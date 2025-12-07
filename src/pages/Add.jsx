import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    image: "",
    description: "",
    available: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      toast.error("Tên và giá không được để trống!");
      return;
    }

    try {
      await fetch("http://localhost:3000/tours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          available: Number(form.available),
        }),
      });

      toast.success("Thêm tour thành công!");
      navigate("/list"); 
    } catch (error) {
      toast.error("Thêm thất bại!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Thêm Tour Mới</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Tên tour"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="destination"
          placeholder="Điểm đến"
          className="w-full border p-2 rounded"
          value={form.destination}
          onChange={handleChange}
        />

        <input
          type="text"
          name="duration"
          placeholder="Thời gian (VD: 3 ngày 2 đêm)"
          className="w-full border p-2 rounded"
          value={form.duration}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Giá tour"
          className="w-full border p-2 rounded"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Link hình ảnh"
          className="w-full border p-2 rounded"
          value={form.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Mô tả"
          className="w-full border p-2 rounded h-24"
          value={form.description}
          onChange={handleChange}
        ></textarea>

        <input
          type="number"
          name="available"
          placeholder="Số lượng còn"
          className="w-full border p-2 rounded"
          value={form.available}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thêm Tour
        </button>
      </form>
    </div>
  );
}