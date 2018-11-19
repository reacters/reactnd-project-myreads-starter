import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });

const PaperSheet = (props) => {
    const { classes } = props;
  return (
    <div>
      <Paper  className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          No Matches Found
        </Typography>
        <Typography component="p">
          Please check the keyword which you have typed. eg: React, Android
        </Typography>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(PaperSheet);;
