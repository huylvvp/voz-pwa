import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CommentIcon from '@material-ui/icons/Comment';
import StarIcon from '@material-ui/icons/Star';

import {abbreviateNumber} from '../../helpers/format';

export default function ThreadCard(props) {
  const {detail,onClick} = props;
  const {title, replies, views,rates,author, id, lastpost} = detail;
  const genDetailCard = () =>{
    return `${author} | ${lastpost.date} ${lastpost.time} ${lastpost.by ? `by ${lastpost.by}`:''}`;
  };
  const genInfo = () => {
    const tmp = {marginLeft: 5, display:'flex', alignItems:'center', justifyContent: 'flex-end'};
    const tmp2 = <><StarIcon/>{rates}</>;
    return (
      <Box style={tmp}>
        <Box style={tmp}>
        {rates? tmp2:''}
        </Box>
        <Box style={tmp}>
          <CommentIcon/>{abbreviateNumber(replies.replace(/\,/g,''))}
        </Box>
        <Box style={tmp}>
          <VisibilityIcon/>{abbreviateNumber(views.replace(/\,/g,''))}
        </Box>
      </Box>
    );
  };
  return (
    <Card onClick={onClick}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h6" component="h4">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {genDetailCard()}
          </Typography>
          { replies && views ?
            <Typography variant="body1" color="textSecondary" component="div">
            {genInfo()}
            </Typography>
            :''
          }
        </CardContent>
      </CardActionArea>
      <Divider/>
    </Card>
  );
}
