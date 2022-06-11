import React,{useState} from 'react'
import ShareModal  from '../ShareModal/ShareModal';
import './RightSide.css'
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import {UilSetting} from "@iconscout/react-unicons";
import TrendCard from '../TrendCard/TrendCard';
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className="RightSide">
        <div className="navIcons">
            <img src={Home} alt="" />
            <UilSetting/>
            <img src={Noti} alt="" />
            <img src={Comment} alt="" />
        </div>
        <TrendCard/>

        <button className="button rs-button" onClick={()=>setModalOpened(true)} >Share</button>
        <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
    </div>
  )
}

export default RightSide