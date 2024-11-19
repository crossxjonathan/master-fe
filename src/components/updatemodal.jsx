/* eslint-disable react/prop-types */
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import InputText from '../components/inputText';
import Button from '../components/button';

import { useParams } from "react-router-dom";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: '#32CD32',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UpdateModal = ({ open, onClose, id: propId }) => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { id: paramId } = useParams();
  const id = propId || paramId || "";
  
  const handleUpdateUser = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL_MASTER}/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
  
      const data = await res.json();
      if (res.ok) {
        alert("User updated successfully!");
        onClose();
      } else {
        alert(data.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !username) {
      setError("Please fill all required fields!");
      return;
    }

    const userData = {
      email,
      username,
    };

    handleUpdateUser(userData);
  };

  React.useEffect(() => {
    console.log("User ID:", id);
    const getUserById = async () => {
      if (!id) 
        return;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_URL_MASTER}/api/users/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setEmail(data.email || '');
          setUsername(data.username || '');
        } else {
          console.error('Error fetching user:', data.message);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
  
    getUserById();
  }, [id]);
  
  
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div className="flex flex-col md:flex-row py-10 px-28">
            <div className="flex flex-col flex-grow">
              <form>
                {error && (
                  <div className="text-red-500 mb-4">
                    <p>{error}</p>
                  </div>
                )}
                <div className="mb-5">
                  <label className="text-lg font-semibold mb-2 px-5" htmlFor="Email">Email</label>
                  <InputText
                    id="email"
                    placeholder="Write Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <label className="text-lg font-semibold mb-2 px-5" htmlFor="Username">Username</label>
                  <InputText
                    id="username"
                    placeholder="Write username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  className="bg-tosca-dark text-black w-56 hover:bg-tosca-light transition-colors duration-400 mb-4"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </Button>
              </form>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdateModal;
