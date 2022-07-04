import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

//get All User

export const getAllUser=async(req,res)=>{
    try {
        let users= await UserModel.find();

        users= users.map((user)=>{
            const {password,...otherDetails}=user._doc
            return otherDetails
        })

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}




//get a User

export const getUser=async(req,res)=>{
    const id=req.params.id;

    try {
        const user=await UserModel.findById(id)
        if (user) {
            const {password,...otherDetails}=user._doc
            res.status(200).json(otherDetails);
        }else{
            res.status(404).json("No Such User Exist")
        }
    } catch (error) {
        res.status(500).json(error)
    }

}

//Update the User

export const updateUser=async(req,res)=>{
    const id=req.params.id;
    const {_id,currentUserAdminStatus,password}=req.body;

    if(id=== _id || currentUserAdminStatus){
        try {

            if(password){
                const salt=await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(password,salt);

            }

            const user=await UserModel.findByIdAndUpdate(id,req.body,{new:true})

            const token=jwt.sign(
                {username:user.username,id:user._id},
                process.env.JWT_KEY,{expiresIn:"1h"}
            );
            res.status(200).json({token,user});
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("Access Denied! You can Only Update Your Profile")
    }
}

//Delete the User

export const deleteUser=async(req,res)=>{
    const id=req.params.id;

    const {currentUserId,currentUserAdminStatus}=req.body;

    if (currentUserId===id || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User Deleted Successfully");
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("Access Denied! You can Only Delete Your Profile")
    }
}


//Follow the User
export const followUser=async(req,res)=>{
    const id=req.params.id;

    const {_id}=req.body;

    if(_id===id){
        res.status(403).json("Action Forbidden")
    }else{
        try {
            const followUser=await UserModel.findById(id);
            const followingUser=await UserModel.findById(_id);

            if(!followUser.followers.includes(_id)){
                await followUser.updateOne({$push :{followers:_id}})
                await followingUser.updateOne({$push:{followings:id}})
                res.status(200).json("User Followed!")
            }else{
                res.status(403).json("User is Already Followed By You")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

//UnFollow the User
export const unfollowUser=async(req,res)=>{
    const id=req.params.id;

    const {_id}=req.body;

    if(_id===id){
        res.status(403).json("Action Forbidden")
    }else{
        try {
            const followUser=await UserModel.findById(id);
            const followingUser=await UserModel.findById(_id);

            if(followUser.followers.includes(_id)){
                await followUser.updateOne({$pull :{followers:_id}})
                await followingUser.updateOne({$pull:{followings:id}})
                res.status(200).json("User Unfollowed!")
            }else{
                res.status(403).json("User is Not Followed By You")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}