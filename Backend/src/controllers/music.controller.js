const jwt = require('jsonwebtoken');
const musicModel = require('../models/music.model') ;
const albumModel = require ("../models/album.model") ;
const {uploadFile} = require("../services/storage.services") ;

async function createAlbum (req , res) {
  try {
     

      const {title , musics} = req.body ;
      const album = await albumModel.create({
        title ,
        music : musics ,
        artist : req.user.id
      })
      res.status(201).json({

      message: "Album Created Successfully",

      album: {

        id: album._id,

        title: album.title,

        musics: album.music,

        artist: album.artist

      }

    });
  }
  catch(err) {
    console.log(err) ;
    return res.status(401).json({message : "Unauthorized"})

  }
}
async function createMusic(req , res) {

  
  const {title} = req.body ;
  const file = req.file ;

  const result = await uploadFile(file.buffer.toString("base64")) ;

  const music = await musicModel.create({

    uri : result.url ,
    title ,
    artist : req.user.id,


  });

  res.status(201).json({
    message : "Music created Succesfully" ,
    music : {
      id : music._id ,
      uri : music.uri,
      title : music.title,
      artist : music.artist
    }
  })

}
async function getAllMusic(req , res) {

  try {

    const rawPage = Number.parseInt(req.query.page, 10);
    const rawLimit = Number.parseInt(req.query.limit, 10);

    const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
    const limit = Number.isFinite(rawLimit)
      ? Math.min(Math.max(rawLimit, 1), 50)
      : 12;
    const skip = (page - 1) * limit;

    const [music, total] = await Promise.all([
      musicModel
        .find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .populate("artist", "-password"),
      musicModel.countDocuments(),
    ]);

    res.status(200).json({

      message: "Data fetched successfully",

      music: music,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + music.length < total,
      },

    });

  } catch (error) {

    res.status(500).json({

      message: "Error fetching music",

      error: error.message

    });

  }

}

async function getAllAlbums(req , res){
  const album = await albumModel.find().select("title artist").populate("artist" ,'-password')
  res.status(200).json({
    message : "album fetched sucessfully" ,
    albums : album
  })
}

async function getAlbumById(req , res) {
  const albumId = req.params.albumId;
  const album = await albumModel.findById(albumId).populate("artist" , "-password").populate("music") ;
  return res.status(200).json({
    message : " Album fetched successfully",
    album : album ,
  })
}
module.exports = {createMusic , createAlbum , getAllMusic , getAllAlbums , getAlbumById}
