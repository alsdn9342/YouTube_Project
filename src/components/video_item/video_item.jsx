import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './video_item.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: '1em',
    width:'300em',
    backgroundColor: 'lightgrey'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'none',
  },
  header: {
    color: 'black',
  },
}));

 const VideoItem = ({video, video:{snippet}, onVideoClick, display}) =>  {
  const displayType = display === 'list' ? styles.list : styles.grid;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log({video});

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
           <img src={snippet.thumbnails.default.url} /> 
          </Avatar>
        }
       
        title= {snippet.channelTitle}
      />
      <CardMedia onClick={() => onVideoClick(video)}
        className={classes.media}
        image= {snippet.thumbnails.medium.url} 
        title={snippet.thumbnails.medium.url}
      />
      <CardContent>
        <Typography variant="body2" color="black" component="p">
        {snippet.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          {snippet.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default VideoItem;

