import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  const navigate = useNavigate();

  const logoutEventHandler = () => {
    auth.signOut();
    navigate('/');
  };

  const onChangeSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        console.log(name);
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name: name,
        });
      }
    } catch (error) {
      toast.error('Could not update');
    }
  };

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
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

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onChangeSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />

            <input
              type='text'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
