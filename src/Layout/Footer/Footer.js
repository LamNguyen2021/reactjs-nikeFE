import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import FooterComponents from './FooterComponents';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    backgroundColor: 'black',
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      padding: '20px 8px 0',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '40px 20px 0',
    },
    [theme.breakpoints.up('md')]: {
      padding: '40px 40px 0',
    },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footerContainer}>
      <Hidden lgDown>
        <Container maxWidth='lg'>
          <FooterComponents />
        </Container>
      </Hidden>
      <Hidden xlUp>
        <FooterComponents />
      </Hidden>
    </div>
  );
}
