const dotenv = require('dotenv');
dotenv.config();

const config = {
    user: 'minwoo',
    password: process.env.REACT_APP_SSMS_PASSWORD,
    server: 'DESKTOP-O2AJ696',
    database: 'YouTubeAPI',
    options: {
        trustedConnection : true, 
        enableArithAbort:true,
        instancename:'SQLEXPRESS',
        trustServerCertificate: true
    }
  } 

  module.exports = config;