import  {v2 as cloudinary} from "cloudinary";
import songModel from '../models/songModel.js';
const addSong = async (req,res) =>{
       try{
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type:"video"});
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`;

        const songData ={
              name,
              desc,
              album,
              image : imageUpload.secure_url,
              file : audioUpload.secure_url,
              duration
        }
              const song = songModel(songData);
              await song.save();

              console.log(name,desc,album,audioUpload,imageUpload);
              return res.json({success:true, message:"Song added successfully"})
       }
       catch(err){
        console.log("request failed", err);
        res.status(500).json({success:false, message:"Failed to add song"});
       }
}

const listSong = async (req,res) =>{
      try{
            const allSong = await songModel.find({});
            res.json({success:true,songs:allSong});

      }

      catch(err){
         console.log("request failed", err);
         res.status(500).json({success:false, message:"Failed to list songs"});
      }
}

const removeSong = async(req,res) =>{
      try{
        await songModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Song removed successfully"});
      }
      catch(err){
        console.log("request failed", err);
        res.status(500).json({success:false, message:"Failed to remove song"});
      }

}

export {addSong, listSong,removeSong}