import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:3000/users?username=${form.username}&password=${form.password}`
      );
      const data = await res.json();

      if (data.length > 0) {
        toast.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        toast.error("Sai tài khoản hoặc mật khẩu!");
      }
    } catch (error) {
      toast.error("Lỗi đăng nhập!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border shadow rounded">
      <h1 className="text-2xl font-bold text-center mb-4">Đăng nhập</h1>

      <form onSubmit={handleLogin} className="space-y-4">

        <div>
          <label className="font-semibold">Tên đăng nhập</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="font-semibold">Mật khẩu</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
