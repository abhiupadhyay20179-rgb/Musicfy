import express from 'express';
import {addSong, listSong,removeSong} from '../controllers/Songcontroller.js'
import upload from '../middleware/multer.js';
import authMiddlewares from '../middleware/auth.js';

const songrouter = express.Router();

songrouter.post('/add', authMiddlewares, upload.fields([{name: 'image', maxCount: 1},{name: 'audio', maxCount: 1}]),addSong);
songrouter.get('/list',listSong);
songrouter.post('/remove', authMiddlewares, removeSong);


export default songrouter