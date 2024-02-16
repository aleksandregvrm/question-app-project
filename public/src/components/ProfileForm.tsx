import { useEffect, useState, MouseEvent } from 'react';
import { useReduxSelector,reduxDispatch } from '../store';
import { handleChange,ProfileFormType } from '../utils/helperFunctions';
import { changeUser } from '../features/user/userSlice';

const initialState = {
    name:"",
    email:""
}
const ProfileForm = () => {
    const [values,setValues] = useState<ProfileFormType>(initialState)
    const { name, email } = useReduxSelector((store) => store.user);
    const dispatch = reduxDispatch();
    useEffect(()=>{
       setValues((prevValues):ProfileFormType=>{
        return {...prevValues,name,email}
       })
    },[name,email])
    const changeUserHandler = (e:MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      dispatch(changeUser({name:values.name,email:values.email}));
    }
  return (
      <form className='profile-form'>
          <label htmlFor="name">Name </label>
          <input onChange={(e)=>handleChange(e,setValues)} type="text" name='name' id='name' placeholder='name...' value={values.name} />
          <label htmlFor="email">Email </label>
          <input onChange={(e)=>handleChange(e,setValues)} type="email" name='email' id='email' placeholder='email...' value={values.email} />
          <button type='button' onClick={(e)=>changeUserHandler(e)} className='btn'>Change user info</button>
      </form>
  )
}
export default ProfileForm