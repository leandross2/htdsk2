'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const {
  startOfDay,
  parseISO,
  isBefore,
  subHours,
  startOfTomorrow,
  startOfToday,
  isToday,
} = require('date-fns')

class CustomValidationProvider extends ServiceProvider {
  /**
   * Valida se o registro existe
   */
  async existsFn(data, field, message, args, get) {
    const Database = use('Database')
    const value = get(data, field)
    if (!value) {
      return
    }

    const [table, column] = args

    const row = await Database.table(table)
      .where(column, value)
      .first()

    if (!row) {
      throw message
    }
  }

  /**
   * Valida se a senha antiga está correta
   */
  async oldPasswordFn(data, field, message, args, get) {
    const Database = use('Database')
    const Hash = use('Hash')

    const value = get(data, field)
    if (!value) {
      return
    }
    const [id] = args
    const user = await Database.table('users')
      .where('id', id)
      .first()

    const verifyPassword = await Hash.verify(value, user.password)
    if (!verifyPassword) {
      throw message
    }
  }

  /**
   * Valida se a data informata já passou
   */
  async pastDateFn(data, field, message, args, get) {
    const value = get(data, field)

    if (!value) {
      return
    }
    const startDaySchedule = startOfDay(parseISO(value))
    const invalidDate = isBefore(startDaySchedule, startOfToday())

    if (invalidDate) {
      throw message
    }
  }

  /**
   * Valida se a mesa está ocupada
   */
  async isAvailableDeskFn(data, field, message, args, get) {
    const Database = use('Database')

    const value = get(data, field)
    const desk_id = get(data, 'desk_id')

    if (!value) {
      return
    }

    const dateParsed = parseISO(value)
    const startDay = startOfDay(dateParsed)

    const row = await Database.table('schedules')
      .where('desk_id', desk_id)
      .where('date_schedule', startDay)
      .first()
    if (row) {
      throw message
    }
  }

  /**
   * Valida se o agendamento já está liberado
   */
  async isAvailableScheduleFn(data, field, message, args, get) {
    const value = get(data, field)

    if (!value) {
      return
    }
    
    const parsedDate = parseISO(value)
    const tomorrowSub = subHours(startOfTomorrow(), 9)
    const validhour = isBefore(tomorrowSub, new Date())
    console.log(validhour)
    if (!validhour && !isToday(parsedDate)) {
      throw message
    }
  }

  /**
   * Valida se a pessoa já está sentada em alguma mesa
   */
  async isCheckedFn(data, field, message, args, get) {
    const Database = use('Database')

    const value = get(data, field)
    const { user_id } = data

    if (!value) {
      return
    }

    const row = await Database.table('schedules')
      .where('user_id', user_id)
      .whereNull('date_checkout')
      .first()
    if (row) {
      throw message
    }
  }

  boot() {
    const Validator = use('Validator')

    Validator.extend('exists', this.existsFn.bind(this))
    Validator.extend('oldPassword', this.oldPasswordFn.bind(this))
    Validator.extend('isPastDate', this.pastDateFn.bind(this))
    Validator.extend('isAvailableDesk', this.isAvailableDeskFn.bind(this))
    Validator.extend(
      'isAvailableSchedule',
      this.isAvailableScheduleFn.bind(this)
    )
    Validator.extend('isChecked', this.isCheckedFn.bind(this))
  }
}

module.exports = CustomValidationProvider
