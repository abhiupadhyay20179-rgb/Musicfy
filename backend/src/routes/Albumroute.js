import express from "express";
import { addAlbum,listAlbum,removeAlbum} from "../controllers/Albumcontroller.js";
import upload from "../middleware/multer.js";
import authMiddlewares from "../middleware/auth.js";

const albumRouter = express.Router();

albumRouter.post('/add', authMiddlewares, upload.single('image'),addAlbum);
albumRouter.get('/list',listAlbum);
albumRouter.post('/remove', authMiddlewares, removeAlbum);

export default albumRouter