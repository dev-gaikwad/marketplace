import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const navigate = useNavigate();

  const logoutEventHandler = () => {
    auth.signOut();
    navigate('/');
  };
  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <p>{auth.currentUser.name}</p>
        <button type='button' className='logOut' onClick={logoutEventHandler}>
          Logout
        </button>
      </header>
    </div>
  );
}

export default Profile;
