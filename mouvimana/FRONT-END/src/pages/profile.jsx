import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { URL } from '../api/api';
import { FETCH_SUCCES } from '../redux/userRedux';

const Profile = () => {

    // const store = useSelector(state => state.user.data);
    const dispatch = useDispatch();
    
    useEffect(() =>{
        const fetchUser = async () =>{
            try {
                const {data, status} = await axios.get(URL.USER_GET)
                console.log(data[0].username);
                if (status === 200) {
                    dispatch(FETCH_SUCCES(data))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, [])

  return (
    <div className='h-[90vh] pt-[55px]'>Profil</div>
  )
}

export default Profile