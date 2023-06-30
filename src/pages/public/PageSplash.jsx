import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  form: {
    width: '100%',
    maxWidth: 400,
    marginTop: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic
  };

  return (
    <Container component="main" className={classes.container}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Login
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          className={classes.textField}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submitButton}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
