'use strict'

const Antl = use('Antl')
class ScheduleUpdate {
  get validateAll() {
    return true
  }

  get rules() {
    // const { id } = this.ctx.auth.user
    return {
      dateSchedule: 'date',
      dateCheckout: 'date',
      userId: 'exists:users,id',
      deskId: 'exists:desks,id',
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = ScheduleUpdate
