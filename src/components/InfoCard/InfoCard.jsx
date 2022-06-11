import React,{useState} from 'react'
import ProfileModal  from '../ProfileModal/ProfileModal';
import './InfoCard.css'
import {UilPen} from '@iconscout/react-unicons'
const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className="InfoCard">
        <div className="infoHead">
            <h4>Your Info</h4>
            <div>
            <UilPen width='2rem' onClick={()=>setModalOpened(true)}/>
            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
            </div>
        </div>
        <div className="info">
            <span>
                <b>Status</b>
            </span>
            <span> Single</span>
        </div>
        <div className="info">
            <span>
                <b>Live with Parents</b>
            </span>
            <span> Ahmedabad</span>
        </div>
        <div className="info">
            <span>
                <b>Work</b>
            </span>
            <span> At Google</span>
        </div>

        <button className='button ic-button'>LogOut</button>
    </div>
  )
}

export default InfoCard