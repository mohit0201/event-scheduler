import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAuthenticated, setRole } from '../redux'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    color: '#555555',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    marginLeft: 'auto',
  },
  eventTitle: {
    color: '#E3004E',
    fontWeight: 'bold',
  },
  eventDescription: {
    color: 'gray',
    fontSize: 14,
  },
  eventDate: {
    color: 'gray',
    fontSize: 14,
  },
  noUsersPlaceholderText: {
    marginTop: 10,
    fontSize: 20,
    color: 'gray',
  },
  noEventsPlaceholderText: {
    color: 'gray',
    fontSize: 14,
  },
}))

function AdminHome(props) {
  const classes = useStyles()
  const [userEvents, setUserEvents] = useState({})

  function handleLogout() {
    props.setAuthenticated(false)
    props.setRole('')
    props.history.push('/')
  }

  function handleChange(email, expanded) {
    if (expanded) {
      setUserEvents({
        ...userEvents,
        [email]: props.eventsList.filter(
          (event) => event.userId === email,
        ),
      })
    }
  }

  const users = props.usersList.map((user) => (
    <div key={user.email} className="accordion-container">
      <Accordion
        onChange={(e, expanded) => handleChange(user.email, expanded)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            {user.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {userEvents &&
            userEvents[user.email] &&
            userEvents[user.email].length ? (
              userEvents[user.email].map((event) => (
                <div key={event.title}>
                  <div className={classes.eventTitle}>
                    {event.title}
                  </div>
                  <div className={classes.eventDescription}>
                    {event.description}
                  </div>
                  <div className={classes.eventDate}>
                    {`Starts: ${event.start}`}
                  </div>
                  <div
                    className={classes.eventDate}
                  >{`Ends: ${event.end}`}</div>
                  <hr />
                </div>
              ))
            ) : (
              <div className={classes.noEventsPlaceholderText}>
                No events
              </div>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  ))

  return (
    <>
      <div className="label-logout-container">
        <div className="dashboard-label">Admin Dashboard</div>
        <Button
          className={classes.logoutButton}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      {users.length ? (
        <>{users}</>
      ) : (
        <div className={classes.noUsersPlaceholderText}>
          No users to display
        </div>
      )}
    </>
  )
}

function mapStateToProps(globalState) {
  return {
    usersList: globalState.usersList,
    eventsList: globalState.eventsList,
  }
}

const mapDispatchToProps = {
  setAuthenticated,
  setRole,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)
