import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Form, Grid, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/auth'

import './signup.css'

const options = [
  { key: 'c', text: 'Coach', value: 'coach' },
  { key: 's', text: 'Student', value: 'student' }
]

class FormSignup extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_type: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    console.log(this.state)
    this.props.signUp(this.state)
  }

  render() {
    const { first_name, last_name, email, password, user_type } = this.state
    const { isAuthenticated, isSignUpSuccess } = this.props

    if (isSignUpSuccess) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column className="card-signup">
            <Message header="Join us !" content="Create an Account" />
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="First Name"
                  name="first_name"
                  value={first_name}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Last Name"
                  name="last_name"
                  value={last_name}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              {/* <Form.Group className="user-type">
                <Image src="/assets/images/whistle.svg" className="role-icon" />
                <Image src="/assets/images/athlete.svg" className="role-icon" />
              </Form.Group> */}

              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="e.g coach/student"
                name="user_type"
                value={user_type}
                onChange={this.handleChange}
              />

              <Button type="submit" color="teal" fluid size="large">
                Sign Up
              </Button>
            </Form>
            <Message>
              Already have an account? <Link to="/login">Log In</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const maspStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isSignUpSuccess: state.auth.isSignUpSuccess
})

export default connect(
  maspStateToProps,
  { signUp }
)(FormSignup)