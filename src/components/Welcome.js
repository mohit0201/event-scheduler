import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

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
  loginButton: {
    marginLeft: 10,
  },
}))

function Welcome() {
  const classes = useStyles()

  return (
    <main className="welcome-container">
      <div className="main-buttons-container">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          className={classes.loginButton}
        >
          LOGIN
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/signup"
          className={classes.loginButton}
        >
          SIGN UP
        </Button>
      </div>
    </main>
  )
}

export default Welcome
