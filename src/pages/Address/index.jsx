import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  const [form, setForm] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    county: "",
    mobile: "",
  });

  const token = localStorage.getItem("token");

  const fetchAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/address/user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAddresses(res.data.addresses || []);
    } catch (err) {
      toast.error("Failed to load addresses");
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // ADD ADDRESS
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      setAdding(true);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/address/add`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Address added!");
      setForm({ address_line: "", city: "", state: "", pincode: "", county: "", mobile: "" });
      fetchAddresses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding address");
    } finally {
      setAdding(false);
    }
  };

  // UPDATE ADDRESS
  const handleUpdateAddress = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/address/update/${editModal._id}`,
        editModal,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Address updated!");
      setEditModal(null);
      fetchAddresses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update address");
    }
  };

  // DELETE ADDRESS
  const handleDeleteAddress = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/address/delete/${deleteModal._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Address deleted!");
      setDeleteModal(null);
      fetchAddresses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete address");
    }
    console.log("Deleting address id:", deleteModal._id);

  };

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-7">
          Manage Your Addresses
        </h1>

        {/* ADD ADDRESS */}
        <div className="bg-white shadow-xl p-6 rounded-xl mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Address</h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAddAddress}>
            {["address_line","city","state","pincode","county"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.replace("_", " ").toUpperCase()}
                className="border p-3 rounded-lg"
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            ))}
            <input
              type="number"
              placeholder="Mobile"
              className="border p-3 rounded-lg"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            />

            <button
              type="submit"
              className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
            >
              {adding ? "Adding…" : "Add Address"}
            </button>
          </form>
        </div>

        {/* ADDRESS LIST */}
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Saved Addresses</h2>

        {loadingAddresses ? (
          <p className="text-center text-gray-500">Loading…</p>
        ) : addresses.length === 0 ? (
          <p className="text-center text-gray-500">No addresses saved yet.</p>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className="bg-white p-5 shadow-md rounded-xl border hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold">{addr.address_line}</h3>
                <p className="text-gray-600">
                  {addr.city}, {addr.state}, {addr.county}, {addr.pincode}
                </p>
                <p className="mt-1 font-medium">📞 {addr.mobile}</p>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    className="px-4 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={() => setEditModal(addr)}
                  >
                    Edit
                  </button>

                  <button
                    className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => setDeleteModal(addr)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Address</h2>
            <div className="space-y-3">
              {["address_line","city","state","pincode","county"].map((field) => (
                <input
                  key={field}
                  type="text"
                  className="border p-3 rounded-lg w-full"
                  value={editModal[field]}
                  onChange={(e) => setEditModal({ ...editModal, [field]: e.target.value })}
                />
              ))}
              <input
                type="number"
                className="border p-3 rounded-lg w-full"
                value={editModal.mobile}
                onChange={(e) => setEditModal({ ...editModal, mobile: e.target.value })}
              />

              <div className="flex justify-end gap-3 mt-4">
                <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={() => setEditModal(null)}>Cancel</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={handleUpdateAddress}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-xl animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-800">Delete this address?</h2>
            <p className="mt-3 text-gray-600">This action cannot be undone.</p>

            <div className="flex justify-end gap-3 mt-6">
              <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={() => setDeleteModal(null)}>Cancel</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700" onClick={handleDeleteAddress}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
