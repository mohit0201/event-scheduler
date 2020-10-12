import React from 'react'
import { connect } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

const BigCalendar = (props) => {
  const currentUserEvents = props.eventsList.filter(
    (event) => event.userId === props.currentUser,
  )
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={currentUserEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 360, marginTop: 20, width: '70%' }}
        views={['month']}
      />
    </div>
  )
}

function mapStateToProps(globalState) {
  return {
    eventsList: globalState.eventsList,
    currentUser: globalState.currentUser.email,
  }
}

export default connect(mapStateToProps, {})(BigCalendar)
