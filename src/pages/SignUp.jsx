import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChangeEventHandler = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const onSubmitEventHandler = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      console.log(email);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmitEventHandler}>
            <input
              type='name'
              placeholder='Name'
              className='nameInput'
              id='name'
              value={name}
              onChange={onChangeEventHandler}
            />
            <input
              type='email'
              placeholder='Email'
              className='emailInput'
              id='email'
              value={email}
              onChange={onChangeEventHandler}
            />

            <div className='passwordInputDiv'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                className='passwordInput'
                id='password'
                value={password}
                onChange={onChangeEventHandler}
              />

              <img
                src={visibilityIcon}
                className='showPassword'
                alt='show password'
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

            <div className='signUpBar'>
              <p className='signUpText'>Sign Up</p>
              <button className='signUpButton'>
                <ArrowRightIcon fill='#ffffff' width='36px' height='36px' />
              </button>
            </div>
          </form>

          {/* Google OAuth */}

          <Link to='/sign-in' className='registerLink'>
            Already a Member? Sign in
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
