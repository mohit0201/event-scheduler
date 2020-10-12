import React from 'react'
import { connect } from 'react-redux'
import { setAuthenticated, setRole } from '../redux'
import CalendarComponent from './Calendar'
import Modal from 'react-modal'
import 'react-calendar/dist/Calendar.css'
import {
  setEventName,
  setEventStartDate,
  setEventEndDate,
  setEventDescription,
  saveNewEvent,
} from '../redux'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import BigCalendar from './BigCalendar'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  logoutButton: {
    marginLeft: 'auto',
  },
  createEventButton: {
    marginTop: '2em',
  },
  formHeader: {
    color: '#E3004E',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  textFieldsContainer: {
    display: 'flex',
    paddingLeft: 10,
    paddingRight: 10,
  },
  eventTitleField: {
    width: '40%',
    marginTop: '0.5em',
  },
  descriptionField: {
    width: '40%',
    marginTop: '0.5em',
    marginLeft: 'auto',
  },
  modalCloseButton: {
    marginLeft: 'auto',
  },
  saveButtonContainer: {
    display: 'flex',
    paddingRight: 10,
  },
  saveButton: {
    marginLeft: 'auto',
    marginTop: '0.5em',
  },
  calendarLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: '10px',
    marginBottom: '10px',
    color: 'gray',
  },
}))

Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    zIndex: '5',
  },
}

function UserHome(props) {
  const classes = useStyles()
  const [modalIsOpen, setIsOpen] = React.useState(false)

  function openModal() {
    props.setEventName('')
    props.setEventDescription('')
    props.setEventStartDate('')
    props.setEventEndDate('')
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function handleLogout() {
    props.setAuthenticated(false)
    props.setRole('')
    props.history.push('/')
  }

  function handleChange(event) {
    event.preventDefault()
    const { value, name } = event.target
    switch (name) {
      case 'name':
        props.setEventName(value)
        break
      case 'description':
        props.setEventDescription(value)
        break
      default:
        return
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (
      !props.eventName ||
      !props.eventDescription ||
      !props.eventStartDate ||
      !props.eventEndDate
    ) {
      alert('Please fill the necessary fields')
      return
    }

    const newEvent = {
      title: props.eventName,
      description: props.eventDescription,
      start: props.eventStartDate,
      end: props.eventEndDate,
      userId: props.currentUserId,
    }
    props.saveNewEvent(newEvent)
    props.setEventName('')
    props.setEventDescription('')
    props.setEventStartDate('')
    props.setEventEndDate('')
    closeModal()
  }

  return (
    <div>
      <div className="label-logout-container">
        <div className="dashboard-label">User Dashboard</div>
        <Button
          className={classes.logoutButton}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <Button
        color="secondary"
        variant="contained"
        onClick={openModal}
        className={classes.createEventButton}
      >
        Create Event
      </Button>
      <BigCalendar />
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className="event-form-container">
          <div className="event-form-headings">
            <Typography className={classes.formHeader}>
              CREATE EVENT
            </Typography>
            <Button
              onClick={closeModal}
              className={classes.modalCloseButton}
            >
              Close
            </Button>
          </div>
          <div className={classes.textFieldsContainer}>
            <TextField
              label="Event title"
              placeholder="Event name"
              name="name"
              value={props.eventName}
              onChange={handleChange}
              className={classes.eventTitleField}
            />
            <TextField
              label="Description"
              multiline
              rowsMax={4}
              name="description"
              placeholder="Description"
              value={props.eventDescription}
              onChange={handleChange}
              className={classes.descriptionField}
            />
          </div>
          <div className="event-form-calendar">
            <div className="date-calendar start-calendar">
              <Typography className={classes.calendarLabel}>
                START DATE
              </Typography>
              <CalendarComponent value="start" />
            </div>
            <div className="date-calendar end-calendar">
              <Typography className={classes.calendarLabel}>
                END DATE
              </Typography>
              <CalendarComponent value="end" />
            </div>
          </div>
          <div className={classes.saveButtonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.saveButton}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function mapStateToProps(globalState) {
  return {
    eventName: globalState.event.name,
    eventStartDate: globalState.event.startDate,
    eventEndDate: globalState.event.endDate,
    eventDescription: globalState.event.description,
    currentUserId: globalState.currentUser.email,
    eventsList: globalState.eventsList,
  }
}

const mapDispatchToProps = {
  setAuthenticated,
  setRole,
  setEventName,
  setEventStartDate,
  setEventEndDate,
  setEventDescription,
  saveNewEvent,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
