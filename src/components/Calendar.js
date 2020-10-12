import React, { useState } from 'react'
import Calendar from 'react-calendar'
import { connect } from 'react-redux'
import { setEventStartDate, setEventEndDate } from '../redux'
const moment = require('moment')

const CalendarComponent = (props) => {
  const [date, setDate] = useState(new Date())

  const onChange = (date) => {
    setDate(date)
    if (props.value === 'start') {
      const selectedDate = date.toString()
      const formattedDate = moment(selectedDate).format('LLL')
      props.setEventStartDate(formattedDate)
    } else if (props.value === 'end') {
      const selectedDate = date.toString()
      const formattedDate = moment(selectedDate).format('LLL')
      props.setEventEndDate(formattedDate)
    }
  }

  return (
    <div>
      <Calendar onChange={onChange} value={date} />
    </div>
  )
}

function mapStateToProps(globalState) {
  return {
    eventStartDate: globalState.event.startDate,
  }
}

const mapDispatchToProps = { setEventStartDate, setEventEndDate }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarComponent)
