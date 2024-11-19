/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Button from "../components/button";
import imageDefault from "../assets/default.jpg";
import UpdateModal from "./updatemodal";

const CardProfile = ({
  id,
  image,
  email,
  password,
  firstName,
  lastName,
  maidenName,
  age,
  gender,
  username,
  birthDate,
  onClickDelete,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleModalOpen = () => {
    console.log("Opening Modal");
    setModalOpen(true);
  };

  const handleModalClose = () => {
    console.log("Closing Modal");
    setModalOpen(false);
  };

  const handleDeleteUser = async () => {
    if (!id) {
      alert("User ID is missing!");
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL_MASTER}/api/users/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        alert("User deleted successfully!");
        if (onClickDelete) onClickDelete(id);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("An error occurred while deleting the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col rounded-md bg-green-500 hover:bg-tosca-dark shadow-2xl transition-colors duration-300 w-80 px-5 py-5">
      <div className="py-5">
        <img
          className="w-full h-64 object-cover rounded-lg"
          src={image || imageDefault}
          alt="imageOne"
        />
      </div>
      <div className="py-2 text-center">
        <p className="py-2 text-xl font-semibold text-nowrap">
          First name: {firstName || "Hello World"}
        </p>
        <p className="py-2 text-xl font-semibold text-nowrap">
          Maiden name: {maidenName || "Hello World"}
        </p>
        <p className="py-2 text-xl font-semibold text-nowrap">
          Last name: {lastName || "Hello World"}
        </p>
        <p className="py-2 text-xl font-semibold text-nowrap truncate">
          Email: {email || "Hello World"}
        </p>
        <p className="py-2 text-xl font-semibold text-nowrap">
          Password: {password || "Hello World"}
        </p>
        <p className="py-2 text-xl font-semibold text-nowrap">
          Age: {age || "Hello World"}
        </p>
        <p className="py-2 text-xl font-semibold text-nowrap">
          Gender: {gender || "Hello World"}
        </p>
        <p className="py-2 text-xl font-semibold text-nowrap">
          Username: {username || "Hello World"}
        </p>
        <p className="py-2 text-xl font-semibold text-nowrap">
          Birth Date: {birthDate || "Hello World"}
        </p>
        <div className="grid justify-center">
          <Button
            onClick={handleModalOpen}
            className="bg-yellow-500 text-white w-56 hover:bg-yellow-600 transition-colors duration-400 mb-4"
          >
            UPDATE
          </Button>
          <Button
            onClick={handleDeleteUser}
            className="bg-red-700 text-white w-56 hover:bg-red-600 transition-colors duration-400"
            disabled={loading}
          >
            {loading ? "Deleting..." : "DELETE"}
          </Button>
        </div>
      </div>
      {id && (
        <UpdateModal open={modalOpen} onClose={handleModalClose} id={id} />
      )}
    </div>
  );
};

export default CardProfile;
