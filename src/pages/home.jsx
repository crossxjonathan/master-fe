/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Card from "../components/card";
import InputText from "../components/inputText";
import TransitionsModal from "../components/modal";
import imageDefault from "../assets/default.jpg";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Home = () => {
  const [user, setUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1); // Reset ke halaman pertama setelah pencarian
  };

  const filteredUsers = user.filter(
    (users) =>
      users.username.toLowerCase().includes(searchQuery) ||
      users.email.toLowerCase().includes(searchQuery) ||
      users.firstName?.toLowerCase().includes(searchQuery) ||
      users.lastName?.toLowerCase().includes(searchQuery)
  );

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_URL_MASTER}/api/users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setUser(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getAllUsers();
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const customTheme = createTheme({
    components: {
      MuiPagination: {
        styleOverrides: {
          root: {
            "& .Mui-selected": {
              color: "#fff",
              backgroundColor: "#ffffff33",
            },
            "& button": {
              color: "#fff",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <div className="w-full py-10">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold text-slate-400">Master Project</h1>
        </div>
        <hr className="h-1 bg-gray-400 w-full my-4" />
        <div className="flex justify-between cursor-pointer gap-10 py-5 px-5">
          <InputText
            placeholder="Search Profile..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <h1
            onClick={handleModalOpen}
            className="text-4xl font-bold hover:text-yellow-400 py-3"
          >
            +
          </h1>
        </div>
        <div className="flex flex-wrap gap-16 px-10">
          {currentUsers.length > 0 ? (
            currentUsers.map((users) => (
              <div className="w-1/5" key={users.id}>
                <Card
                  id={users.id}
                  email={users.email || "Email:"}
                  password={users.password || "Password:"}
                  firstName={users.firstname || "firstName:"}
                  lastName={users.lastname || "lastName:"}
                  maidenName={users.maidenname || "maidenName:"}
                  age={users.age || "age:"}
                  gender={users.gender || "gender:"}
                  username={"@" + users.username || "username:"}
                  birthDate={users.birthDate || "birthDate:"}
                  image={users.image || imageDefault}
                />
              </div>
            ))
          ) : (
            <p>No Users Available</p>
          )}
        </div>
        <TransitionsModal open={modalOpen} onClose={handleModalClose} />
        <div className="flex justify-center py-10">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
