const express = require("express") ;
const musicController = require("../controllers/music.controller")
const middleware = require("../middleWares/auth.middleware")

const router = express.Router() ;

const multer = require("multer") ;

const upload = multer({
  storage : multer.memoryStorage()
})


router.post('/upload' ,middleware.authArtist , upload.single("music") ,musicController.createMusic)

router.post('/createAlbum' ,middleware.authArtist, musicController.createAlbum) ,

router.get('/' , middleware.authUser  , musicController.getAllMusic )
router.get('/albums' , middleware.authUser  , musicController.getAllAlbums )
router.get("/albums/:albumId" , middleware.authUser , musicController.getAlbumById)
module.exports = router

