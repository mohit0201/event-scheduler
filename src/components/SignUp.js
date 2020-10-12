import React from 'react'
import { connect } from 'react-redux'
import {
  setUserName,
  setUserEmail,
  setUserPassword,
  saveNewUser,
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

function SignUp(props) {
  const classes = useStyles()

  function handleChange(event) {
    event.preventDefault()
    const { value, name } = event.target
    switch (name) {
      case 'name':
        props.setUserName(value)
        break
      case 'email':
        props.setUserEmail(value)
        break
      case 'password':
        props.setUserPassword(value)
        break
      default:
        return
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const userExists = props.usersList.some(
      (user) => user.email === props.email,
    )
    const newUser = {
      name: props.name,
      email: props.email,
      password: props.password,
    }

    if (!props.name || !props.email || !props.password) {
      alert('Fields cannot be left blank')
    } else if (!userExists) {
      props.saveNewUser(newUser)
      props.setUserName('')
      props.setUserEmail('')
      props.setUserPassword('')
      props.history.push('/')
      alert('Signed Up successfully')
    } else {
      alert('Email already exists')
    }
  }

  return (
    <>
      <main className="form-container">
        <form className="sign-up-form">
          <label className="form-label signup">SIGN UP</label>
          <TextField
            id="name"
            label="Name"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className={classes.formField}
          />
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
            SIGN UP
          </Button>
        </form>
      </main>
    </>
  )
}

function mapStateToProps(globalState) {
  return {
    name: globalState.user.name,
    email: globalState.user.email,
    password: globalState.user.password,
    usersList: globalState.usersList,
  }
}

const mapDispatchToProps = {
  setUserName,
  setUserEmail,
  setUserPassword,
  saveNewUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
