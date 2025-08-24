import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountSideBar from "../../components/AccountSideBar";

export default function MyAccount() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/user-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
          },
        });

        const data = await res.json();

        if (data.success) {
          setUser(data.data);
          setFormData({
            name: data.data.name || '',
            phone: data.data.phone || '',
            email: data.data.email || '',
          });
        } else {
          console.warn("Failed to fetch user:", data.message);
        }
      } catch (err) {
        console.error("Auth check failed", err);
      }
    })();
  }, []);

  // Optional: handle save and cancel buttons (you can implement as needed)
  const handleSave = () => {
    // Send formData to backend to save
    console.log('Saving', formData);
  };

  const handleCancel = () => {
    // Reset formData to user data
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
      });
    }
  };

  return (
    <section className="py-10 w-full">
      <div className="container flex flex-col lg:flex-row gap-5">
        {/* Sidebar */}
        <div className="w-full lg:w-[25%]">
          <AccountSideBar user={user} />
        </div>

        {/* Profile Form */}
        <div className="w-full lg:w-[75%]">
          <div className="bg-white p-5 shadow-md rounded-md">
            <h2 className="pb-3 text-lg font-semibold">My Profile</h2>
            <hr />

            <form
              className="mt-5 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full md:w-1/2">
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Name"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    disabled
                    value={formData.email}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full md:w-1/2">
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    value={formData.phone}
                    placeholder="Phone number"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Button
                  type="submit"
                  variant="contained"
                  className="btn-org btn-lg w-full sm:w-[100px]"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  className="btn-org btn-border btn-lg w-full sm:w-[100px]"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
