let config = require('./dbconfig');
const sql = require('mssql');


async function getVideos(){
    try{
        let pool = await sql.connect(config);
        let videos = await pool.request().query("select * from video_history;");
        
        return videos.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function addVideo(video){
    try {
        let pool = await sql.connect(config);
        let insertVideo = await pool.request()
        .input('id', sql.VarChar, video.id)
        .input('thumnails_default', sql.VarChar, video.thumnails_default)
        .input('channel_title', sql.VarChar, video.channel_title)
        .input('thumnails_medium', sql.VarChar, video.thumnails_medium)
        .input('title', sql.VarChar, video.title)
        .input('description', sql.VarChar, video.description)
        .execute('AddVideo');

        return insertVideo.recordsets;
    } catch(error){
      console.log(error);
    }
}

module.exports = {
    getVideos : getVideos,
    addVideo : addVideo
}