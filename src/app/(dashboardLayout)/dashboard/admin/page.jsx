"use client";

import { useEffect, useState } from "react";
import DashboardHeading from "@/components/DashboardHeading";
import { Card } from "@heroui/react";
import toast from "react-hot-toast";
import { getAllUsers } from "@/lib/api/users/data";
import { updateUserRole } from "@/lib/api/users/actions";

export default function AdminDashboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);

      toast.success("Role updated successfully");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? { ...user, role: newRole }
            : user
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="space-y-6 mt-4">
      <DashboardHeading
        title="Manage Users"
        description="View and manage all users"
      />

      <Card className="bg-[#12121C] border border-[#27273A]/40">
        {/* ================= MOBILE VIEW ================= */}
        <div className="md:hidden p-4 space-y-4">
          {loading ? (
            <div className="text-center text-white py-10">
              Loading...
            </div>
          ) : users.length === 0 ? (
            <div className="text-center text-white py-10">
              No Users Found
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className="bg-[#1B1B2A] border border-[#27273A] rounded-xl p-4 space-y-3"
              >
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    Name
                  </p>
                  <p className="text-white font-medium">
                    {user.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    Email
                  </p>
                  <p className="text-gray-300 text-sm break-all">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    Current Role
                  </p>
                  <span className="capitalize text-purple-400 font-medium">
                    {user.role}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-2">
                    Change Role
                  </p>

                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(
                        user._id,
                        e.target.value
                      )
                    }
                    className="w-full bg-[#12121C] border border-[#27273A] text-white px-3 py-2 rounded-lg outline-none"
                  >
                    <option value="buyer">
                      Buyer
                    </option>

                    <option value="artist">
                      Artist
                    </option>

                    <option value="admin">
                      Admin
                    </option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ================= TABLET + DESKTOP VIEW ================= */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#27273A]">
                <th className="p-4 text-left text-gray-400">
                  Name
                </th>

                <th className="p-4 text-left text-gray-400">
                  Email
                </th>

                <th className="p-4 text-left text-gray-400">
                  Current Role
                </th>

                <th className="p-4 text-left text-gray-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center p-10 text-white"
                  >
                    Loading...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center p-10 text-white"
                  >
                    No Users Found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-[#27273A]/30 hover:bg-[#181824]/50 transition"
                  >
                    <td className="p-4 text-white">
                      {user.name}
                    </td>

                    <td className="p-4 text-gray-300">
                      {user.email}
                    </td>

                    <td className="p-4">
                      <span className="capitalize text-purple-400 font-medium">
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(
                            user._id,
                            e.target.value
                          )
                        }
                        className="bg-[#1B1B2A] border border-[#27273A] text-white px-3 py-2 rounded-lg outline-none"
                      >
                        <option value="buyer">
                          Buyer
                        </option>

                        <option value="artist">
                          Artist
                        </option>

                        <option value="admin">
                          Admin
                        </option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}