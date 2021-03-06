import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 325,
    maxWidth: 325
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard({title, data, info, des}) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="h2">
          {data}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {info}
        </Typography>
        <Typography variant="body2" component="p">
          {des}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ver más</Button>
      </CardActions>
    </Card>
  );
}
