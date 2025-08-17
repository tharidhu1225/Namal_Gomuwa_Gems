import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

function Loading() {
  return (
    <div
      role="status"
      className="flex justify-center items-center h-screen"
      aria-label="Loading profile"
    >
      <svg
        className="animate-spin h-10 w-10 text-yellow-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
      <p className="ml-4 text-gray-600 text-lg font-medium">Loading profile...</p>
    </div>
  );
}

function Error({ message }) {
  return (
    <div
      role="alert"
      className="max-w-md mx-auto p-6 text-center bg-red-50 border border-red-300 rounded-lg mt-16"
    >
      <p className="text-red-700 text-lg font-semibold mb-4">{message}</p>
      <a
        href="/login"
        className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold transition"
      >
        Go to Login
      </a>
    </div>
  );
}

function NotLoggedIn() {
  return (
    <div className="max-w-md mx-auto p-6 text-center bg-gray-50 border border-gray-300 rounded-lg mt-16">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">You're not logged in</h1>
      <p className="mb-6 text-gray-600">
        Please login or register to view your profile.
      </p>
      <div className="flex justify-center space-x-4">
        <a
          href="/login"
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold transition"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-6 py-3 border border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white rounded-full font-semibold transition"
        >
          Register
        </a>
      </div>
    </div>
  );
}

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/user-details`,
          { credentials: "include" }
        );

        const data = await res.json();

        if (!res.ok || !data.success) {
          if (res.status === 401) {
            setUser(null);
            setError("You are not authorized. Please login.");
          } else {
            throw new Error(data.message ?? "Failed to fetch user data");
          }
        } else {
          setUser(data.data);
          setFormData({
            name: data.data.name ?? "",
            email: data.data.email ?? "",
          });
        }
      } catch (err) {
        setError(err.message ?? "Something went wrong.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    setSaveLoading(true);
    setSaveError(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update-profile`,
        {
          method: "POST", // or PUT, depending on your API
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Failed to update profile");
      }

      setUser((prev) => ({ ...prev, ...formData }));
      setEditMode(false);
    } catch (err) {
      setSaveError(err.message ?? "Something went wrong while saving.");
    } finally {
      setSaveLoading(false);
    }
  }

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!user) return <NotLoggedIn />;

  return (
    <main className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Your Profile</h1>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            title="Edit Profile"
            className="text-yellow-500 hover:text-yellow-600 transition"
            aria-label="Edit profile"
          >
            <FaEdit size={24} />
          </button>
        )}
      </div>

      <section className="space-y-6 text-gray-800" aria-label="User profile information">
        {/* Name */}
        <div className="flex items-center gap-4">
          <FaUser className="text-yellow-500 text-xl" aria-hidden="true" />
          <span className="text-lg font-semibold">Name:</span>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="ml-auto border border-gray-300 rounded px-3 py-1 text-gray-900 focus:outline-yellow-500 focus:ring-1 focus:ring-yellow-500"
            />
          ) : (
            <span className="ml-auto text-gray-700">{user.name ?? "N/A"}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <FaEnvelope className="text-yellow-500 text-xl" aria-hidden="true" />
          <span className="text-lg font-semibold">Email:</span>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="ml-auto border border-gray-300 rounded px-3 py-1 text-gray-900 focus:outline-yellow-500 focus:ring-1 focus:ring-yellow-500"
            />
          ) : (
            <span className="ml-auto text-gray-700">{user.email ?? "N/A"}</span>
          )}
        </div>

        {/* Status */}
        <div className="flex items-center gap-4">
          {user.status === "Active" ? (
            <FaCheckCircle
              className="text-green-600 text-xl"
              aria-label="Active status"
            />
          ) : (
            <FaTimesCircle
              className="text-red-600 text-xl"
              aria-label="Inactive status"
            />
          )}
          <span className="text-lg font-semibold">Status:</span>
          <span
            className={`ml-auto font-medium ${
              user.status === "Active" ? "text-green-700" : "text-red-700"
            }`}
          >
            {user.status ?? "Unknown"}
          </span>
        </div>

        {/* Last Login */}
        <div className="flex items-center gap-4">
          <FaClock className="text-yellow-500 text-xl" aria-hidden="true" />
          <span className="text-lg font-semibold">Last Login:</span>
          <span className="ml-auto text-gray-700">
            {user.last_login_date
              ? new Date(user.last_login_date).toLocaleString()
              : "N/A"}
          </span>
        </div>
      </section>

      {/* Save/Cancel buttons and error message */}
      {editMode && (
        <div className="mt-8 flex justify-end items-center gap-4">
          {saveError && (
            <p className="text-red-600 mr-auto font-semibold">{saveError}</p>
          )}
          <button
            onClick={() => setEditMode(false)}
            disabled={saveLoading}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            aria-label="Cancel edit"
          >
            <FaTimes />
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saveLoading}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
            aria-label="Save profile"
          >
            {saveLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            ) : (
              <>
                <FaSave />
                Save
              </>
            )}
          </button>
        </div>
      )}
    </main>
  );
}
