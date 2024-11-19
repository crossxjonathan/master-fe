/* eslint-disable react/prop-types */
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import InputText from '../components/inputText';
import Button from '../components/button';

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

const TransitionsModal = ({ open, onClose }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstname] = React.useState('');
  const [lastName, setLastname] = React.useState('');
  const [maidenName, setMaidenName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');

  const handleAddUser = async (userData) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL_MASTER}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await res.json();
      console.log('User added:', data);
      onClose(); 
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !firstName || !lastName || !username || !birthDate) {
      alert("Please fill all required fields!");
      return;
    }

    const userData = {
      email,
      password,
      firstName,
      lastName,
      maidenName,
      age,
      gender,
      username,
      birthDate,
    };

    handleAddUser(userData);
  };

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
          <div className='flex flex-col md:flex-row py-10 px-28'>
            <div className='flex flex-col relative right-10'>
            </div>
            <div className='flex flex-col flex-grow'>
              <form>
                <div className='mb-5'>
                  <label className='text-lg font-semibold mb-2 px-5' htmlFor="Email">Email</label>
                  <InputText
                    id="email"
                    placeholder="Write Email...."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='mb-5'>
                  <label className='text-lg font-semibold mb-2 px-5' htmlFor="Password">Password</label>
                  <InputText
                    id="password"
                    placeholder="Write Password...."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='mb-5'>
                  <label className='text-lg font-semibold mb-2 px-5' htmlFor="FirstName">FirstName</label>
                  <InputText
                    id="firstname"
                    placeholder="Write firstname...."
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className='mb-5'>
                  <label className='text-lg font-semibold mb-2 px-5' htmlFor="LastName">LastName</label>
                  <InputText
                    id="lastname"
                    placeholder="Write lastname...."
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div className='mb-5'>
                  <label className='text-lg font-semibold mb-2 px-5' htmlFor="MaidenName">MaidenName</label>
                  <InputText
                    id="maidenName"
                    placeholder="Write maiden name...."
                    value={maidenName}
                    onChange={(e) => setMaidenName(e.target.value)}
                  />
                </div>
                <div className='mb-5'>
                  <label className='text-lg font-semibold mb-2 px-5' htmlFor="Age">Age</label>
                  <InputText
                    id="age"
                    placeholder="Write age...."
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className='mb-5'>
                  <label className='text-lg font-semibold mb-2 px-5' htmlFor="Gender">Gender</label>
                  <InputText
                    id="gender"
                    placeholder="Write gender...."
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
                <div className='mb-5'>
                  <label className='text-lg font-semibold mb-2 px-5' htmlFor="Username">Username</label>
                  <InputText
                    id="username"
                    placeholder="Write username...."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className='mb-5'>
                  <label className='text-lg font-semibold mb-2 px-5' htmlFor="BirthDate">BirthDate</label>
                  <InputText
                    id="birthDate"
                    placeholder="Write birthdate...."
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
                <Button onClick={handleSubmit} type="submit" className="bg-tosca-dark text-black w-56 hover:bg-tosca-light transition-colors duration-400 mb-4">
                  <p>Add Profile</p>
                </Button>
              </form>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TransitionsModal;
