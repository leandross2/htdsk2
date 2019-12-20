'use strict'

class ScheduleUpdate {
  get validateAll() {
    return true
  }

  get rules() {
    const { id } = this.ctx.auth.user
    return {
      dateSchedule: 'date',
      dateCheckout: 'date',
      userId: 'exists:users,id',
      deskId: 'exists:desks,id'
    }
  }
}

module.exports = ScheduleUpdate
