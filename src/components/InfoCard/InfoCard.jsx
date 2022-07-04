import React,{useState,useEffect} from 'react'
import ProfileModal  from '../ProfileModal/ProfileModal';
import './InfoCard.css'
import {UilPen} from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest.js'
import { logOut } from '../../actions/AuthAction';
const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false)
    const dispatch =useDispatch();
    const params = useParams();
    const profileUserId=params.id;
    const [profileUser, setProfileUser] = useState({})

    const {user}=useSelector((state)=>state.authReducer.authData)

    useEffect(()=>{
        const fetchProfileUser= async()=>{
            if(profileUserId ===  user._id){
                setProfileUser(user)
            }else{
                const profileUser =await UserApi.getUser(profileUserId)
                setProfileUser(profileUser)
            }
        }
        fetchProfileUser();
    },[user])

    const handleLogOut = ()=>{
        dispatch(logOut())
    }



  return (
    <div className="InfoCard">
        <div className="infoHead">
            <h4>Profile Info</h4>
            {(user._id === profileUserId) &&
            <div>
            <UilPen width='2rem' onClick={()=>setModalOpened(true)}/>
            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} />
            </div>
            }
        </div>
        <div className="info">
            <span>
                <b>Status </b>
            </span>
            <span>{profileUser.relationship}</span>
        </div>
        <div className="info">
            <span>
                <b>Lives In </b>
            </span>
            <span>{profileUser.livesin}</span>
        </div>
        <div className="info">
            <span>
                <b>Work At </b>
            </span>
            <span>{profileUser.worksAt}</span>
        </div>

        <button className='button ic-button' onClick={handleLogOut}>LogOut</button>
    </div>
  )
}

export default InfoCard