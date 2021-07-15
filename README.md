# YouTube Clone Application


## Desciption

By using YouTube APIs, it dynamically retrieves the most popular vidoes and functions to search videos. Also, it archieves and delete my favorite videos interacting with SQL Server Management via Node.js and REST API.


## Technology stacks
>
> ***FrontEnd:*** **React**, **material-ui**, **styled-components**, **react-router** for navBar based on **Responsive App**, **Firebase** for Authentication, **YouTube API**
>             , **Axios**
> 
> ***BakcEnd:***  **Node.js**, **RESTful APIs**, **SQL procedures**, **Postman**, **Express**, **body-parser**, **cors**, **nodemon**, **mssql**
>





### YouTube APIs

```js
   class Youtube{
    constructor(key){
        this.key = key;
        this.getRequestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
    }

    async mostPopular(){
    
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`,
            this.getRequestOptions
        );
        const result_1 = await response.json();
        return result_1.items;
    }

    async search(query) {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxresults=25&q=${query}&type=video&key=${this.key}`, this.getRequestOptions);
        const result_1 = await response.json();
        const items = result_1.items.map(item => ({ ...item, id: item.id.videoId })); //Add id: item.id.videoId on the each original item.
        return items;
    }
}

export default Youtube;
```

### Firebase Authentication APIs

```js
import firebase from 'firebase';
import firebaseApp from './firebase'


class AuthService {
  
    login(providerName){
      const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
      return firebaseApp.auth().signInWithPopup(authProvider);
    }

    logout() {
      firebase.auth().signOut();
    }

    //Check if user is signed in or not. 
    onAuthChange(onUserChanged){
      firebase.auth().onAuthStateChanged(user => {
        onUserChanged(user);
      })

    }
}

export default AuthService;
```


### Database Config

```js
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
```

### Node.js & REST API

```js
const dboperations = require('./dboperations');

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
const {response, request} = require('express');
let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

//if to get connected it will show 'middleware'
router.use((request, response, next) => {
    console.log('middleware');
    next();
})

router.route('/videos').get((resquest, response) => {
    dboperations.getVideos().then(result => {
        response.json(result);
    })
})

router.route('/add').post((req, res) => {
    let video = {... req.body}
    dboperations.addVideo(video).then(result => {
        res.status(201).json(result);
    })
})

router.route('/delete').delete((req, res) => {
    let video = {... req.body}
    dboperations.deleteVideo(video).then(result => {
        res.status(201).json(result);
    })
})


let port = process.env.PORT || 8091;
app.listen(port);
console.log('YouTube API is running at ' + port);
```



# Detail

## Authentication 
> Login with Google or Github account through Firebase *Authentication API*
> 
![login](https://user-images.githubusercontent.com/65743649/125398800-ba287c80-e3ea-11eb-991e-4edc01d4a180.JPG)
```js
const Login = ({authService}) => {
    const history = useHistory();

    const goToYoutube = userId => {
        history.push({
            pathname:'/youtube',
            state: { id: userId} // insert uid for each login method, Google and Github.
        });
    };

    const onLogin = event => {
       authService
       .login(event.currentTarget.textContent)
       .then(data => goToYoutube(data.user.uid)); 
    };

    useEffect(() => {
        authService.onAuthChange(user => {
            user && goToYoutube(user.uid);
        })

    });
    return (
        <section className={styles.login}>
        <Header />
        <section className={styles.mainBody}>
            <h1>Login</h1>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <button className={styles.button} onClick={onLogin}>Google</button>
                </li>
                <li className={styles.item}>
                    <button className={styles.button} onClick={onLogin}>Github</button>
                </li>
            </ul>
        </section>
        <Footer />
    </section>
    );
};

export default Login;

```


## Home page
> ### the most popular videos through **YouTube API**

![homePage](https://user-images.githubusercontent.com/65743649/125399804-0d4eff00-e3ec-11eb-9563-23254a042b40.JPG)


>
> #### When to search 'FrontEnd Developer' it shows relevant videos among the most popular videos.

![Search](https://user-images.githubusercontent.com/65743649/125400344-be559980-e3ec-11eb-8e17-49e4feb0fa54.JPG)


## History page
> ### Once a user clicks videos in Home page they will be archieved in MS SQL by poping up in History page.
![history](https://user-images.githubusercontent.com/65743649/125809234-4bc638ae-d123-4939-b07d-71078e511553.JPG)




