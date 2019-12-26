'use strict'

const Antl = use('Antl')
class ScheduleStore {
  get validateAll() {
    return true
  }

  get rules() {
    // validar o ID do params se existe
    return {
      date_schedule:
        'required|date|isChecked|isPastDate|isAvailableDesk|isAvailableSchedule',
      user_id: 'required|exists:users,id',
      desk_id: 'required|exists:desks,id',
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = ScheduleStore
