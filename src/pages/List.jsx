import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function List() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTours = async () => {
    try {
      const res = await fetch("http://localhost:3000/tours");
      const data = await res.json();
      setTours(data);
    } catch (error) {
      toast.error("Lỗi tải danh sách!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  const deleteTour = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xóa tour này?")) return;

    try {
      await fetch(`http://localhost:3000/tours/${id}`, {
        method: "DELETE",
      });

      toast.success("Xóa thành công!");
      loadTours();
    } catch (error) {
      toast.error("Xóa thất bại!");
    }
  };

  if (loading) return <p className="text-center mt-10">Đang tải...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Danh sách Tours</h1>

      <table className="w-full border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-center">ID</th>
            <th className="border p-2 text-center">Hình ảnh</th>
            <th className="border p-2">Tên Tour</th>
            <th className="border p-2">Điểm đến</th>
            <th className="border p-2">Thời gian</th>
            <th className="border p-2">Giá</th>
            <th className="border p-2">Mô tả</th>
            <th className="border p-2">Số lượng</th>
            <th className="border p-2 text-center">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {tours.map((t) => (
            <tr key={t.id}>
              <td className="border p-2 text-center">{t.id}</td>

              {/* Hình ảnh */}
              <td className="border p-2 text-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-24 h-16 object-cover rounded mx-auto"
                />
              </td>

              <td className="border p-2">{t.name}</td>
              <td className="border p-2">{t.destination}</td>
              <td className="border p-2">{t.duration}</td>
              <td className="border p-2 font-semibold text-blue-600">
                {t.price.toLocaleString()} đ
              </td>
              <td className="border p-2">{t.description}</td>
              <td className="border p-2">{t.available}</td>
              

              <td className="border p-2 text-center">
              <Link
              to={`/edit/${t.id}`}
              className="px-3 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-800"
              >
              Sửa
              </Link>



                <button
                  onClick={() => deleteTour(t.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Xóa

                </button>

        
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}






