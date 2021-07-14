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

module.exports = {
    getVideos : getVideos
}