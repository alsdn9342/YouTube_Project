const dotenv = require('dotenv');
dotenv.config();

const config = {
    user: process.env.REACT_APP_SSMS_USER,
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