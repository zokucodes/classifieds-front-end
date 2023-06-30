import React from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';

class PageRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Handle your form submission here
    console.log(this.state);
  }

  render() {
    return (
      <Paper style={{ padding: '24px' }}>
        <Typography variant="h6">Register</Typography>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '24px' }}
          >
            Register
          </Button>
        </form>
      </Paper>
    );
  }
}

export default PageRegister;

