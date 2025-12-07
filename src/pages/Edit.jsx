import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    image: "",
    description: "",
    available: "",
  });

  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/tours/${id}`);
      const data = await res.json();
      setTour(data);
    } catch (error) {
      toast.error("Không tải được dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  const updateTour = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:3000/tours/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tour),
      });

      toast.success("Cập nhật thành công!");
      navigate("/list"); 
    } catch (error) {
      toast.error("Cập nhật thất bại!");
    }
  };

  if (loading) return <p className="text-center mt-10">Đang tải dữ liệu...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 border p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Sửa Tour</h1>

      <form onSubmit={updateTour} className="space-y-4">

        <div>
          <label className="font-semibold">Tên tour</label>
          <input
            type="text"
            value={tour.name}
            onChange={(e) => setTour({ ...tour, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Điểm đến</label>
          <input
            type="text"
            value={tour.destination}
            onChange={(e) => setTour({ ...tour, destination: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Thời gian</label>
          <input
            type="text"
            value={tour.duration}
            onChange={(e) => setTour({ ...tour, duration: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Giá</label>
          <input
            type="number"
            value={tour.price}
            onChange={(e) =>
              setTour({ ...tour, price: Number(e.target.value) })
            }
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Hình ảnh URL</label>
          <input
            type="text"
            value={tour.image}
            onChange={(e) => setTour({ ...tour, image: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />

          <img
            src={tour.image}
            alt=""
            className="w-40 h-28 object-cover mt-3 rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Mô tả</label>
          <textarea
            value={tour.description}
            onChange={(e) =>
              setTour({ ...tour, description: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Số lượng còn lại</label>
          <input
            type="number"
            value={tour.available}
            onChange={(e) =>
              setTour({ ...tour, available: Number(e.target.value) })
            }
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Cập nhật
        </button>
      </form>
    </div>
  );
}
