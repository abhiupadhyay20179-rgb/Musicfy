import {v2 as cloudinary} from "cloudinary";
import albumModel from "../models/albumModel.js";

const addAlbum = async (req,res) =>{
      try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgcolor = req.body.bgcolor;
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})

        const albumData= {
          name,
          desc,
          bgcolor,
          image:imageUpload.secure_url
        }
        const album = albumModel(albumData);
        await album.save();

        res.json({success:true,message:"Album added successfully"})
        
      
      } catch (error) {
        console.log("request failed", error);
        res.status(500).json({success:false, message:"Failed to add album"});
      }
}

const listAlbum = async (req,res) =>{
      try{
        const allAlbum = await albumModel.find({});
        res.json({success:true,albums:allAlbum});
      }
      catch(err){
        console.log("request failed", err);
        res.status(500).json({success:false, message:"Failed to list albums"});
      }
}

const removeAlbum = async(req,res) =>{
      try{
            await albumModel.findByIdAndDelete(req.body.id);
            res.json({success:true,message:"Album removed successfully"});
      }
      catch(err){
            console.log("request failed", err);
            res.status(500).json({success:false, message:"Failed to remove album"});
      }
}
export {addAlbum,listAlbum,removeAlbum}