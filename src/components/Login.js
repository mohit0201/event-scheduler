import React from 'react'
import { connect } from 'react-redux'
import {
  setOldUserEmail,
  setOldUserPassword,
  setAuthenticated,
  setRole,
  setCurrentUserEmail,
} from '../redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formField: {
    marginTop: '10px',
  },
  formButton: {
    marginTop: '20px',
  },
}))

function Login(props) {
  const classes = useStyles()

  function handleChange(event) {
    event.preventDefault()
    const { value, name } = event.target
    switch (name) {
      case 'email':
        props.setOldUserEmail(value)
        break
      case 'password':
        props.setOldUserPassword(value)
        break
      default:
        return
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (
      props.email === 'admin@admin.com' &&
      props.password === 'admin123'
    ) {
      props.setOldUserEmail('')
      props.setOldUserPassword('')
      props.setAuthenticated(true)
      props.setRole('ADMIN')
      props.history.push('/adminhome')
      return
    }

    const validUser = props.usersList.some(
      (user) =>
        user.email === props.email &&
        user.password === props.password,
    )
    if (validUser) {
      props.setCurrentUserEmail(props.email)
      props.setOldUserEmail('')
      props.setOldUserPassword('')
      props.setAuthenticated(true)
      props.setRole('USER')
      props.history.push('/userhome')
    } else if (!props.email || !props.password) {
      alert('Fields cannot be left blank')
      props.setAuthenticated(false)
    } else {
      alert('Invalid Credentials')
      props.setAuthenticated(false)
    }
  }

  return (
    <>
      <main className="form-container">
        <form className="sign-up-form">
          <label className="form-label login">LOGIN</label>
          <TextField
            id="email"
            label="Email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className={classes.formField}
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className={classes.formField}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            className={classes.formButton}
          >
            LOGIN
          </Button>
        </form>
      </main>
    </>
  )
}

function mapStateToProps(globalState) {
  return {
    email: globalState.oldUser.email,
    password: globalState.oldUser.password,
    usersList: globalState.usersList,
    isAuthenticated: globalState.isAuthenticated,
    role: globalState.role,
    currentUserEmail: globalState.currentUser.email,
  }
}

const mapDispatchToProps = {
  setOldUserEmail,
  setOldUserPassword,
  setAuthenticated,
  setRole,
  setCurrentUserEmail,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
