'use strict'

class ScheduleStore {
  get validateAll () {
    return true
  }

  get rules () {
    // validar o ID do params se existe
    return {
      dateSchedule: 'required|date|isChecked',
      userId: 'required|exists:users,id',
      deskId: 'required|exists:desks,id'
    }
  }
}

module.exports = ScheduleStore
