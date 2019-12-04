/** @type {import('@adonisjs/framework/src/Hash')} */

const { hooks } = require('@adonisjs/ignitor')
const { startOfDay, parseISO, isBefore, subHours, startOfTomorrow } = require('date-fns')

hooks.after.providersBooted(() => {
  const Validator = use('Validator')
  const Database = use('Database')
  const Hash = use('Hash')
  const existsFn = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
      return
    }

    const [table, column] = args
    const row = await Database.table(table)
      .where(column, value)
      .first()
    if (!row) {
      const msg = 'registro nao encontrado'
      throw msg
    }
  }
  const oldPassword = async (data, field, message, args, get) => {
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
      const msg = 'senha antiga invalida'
      throw msg
    }
  }
  const minLength = async (data, field, message, args, get) => {
    const value = get(data, field)
    const [length] = args
    if (!value.trim().length || value.trim().length < length) {
      const msg = `tamanho minimo de ${length}`
      throw msg
    }
  }
  const pastDate = async (data, field, message, args, get) => {
    const value = get(data, field)

    if (!value) {
      return
    }

    const dateParsed = parseISO(value)
    const now = new Date()
    const validDate = isBefore(dateParsed, now)

    if (validDate) {
      const msg = 'Esta data já passou'
      throw msg
    }
  }

  const isAvailableDesk = async (data, field, message, args, get) => {
    const value = get(data, field)
    const deskId = get(data, 'deskId')

    if (!value) {
      return
    }

    const dateParsed = parseISO(value)
    const startDay = startOfDay(dateParsed)

    const row = await Database.table('schedules')
      .where('desk_id', deskId)
      .where('date_schedule', startDay)
      .first()

    if (row) {
      const msg = 'Mesa ocupada'
      throw msg
    }
  }

  const isAvailableCheckin = async (data, field, message, args, get) => {
    const value = get(data, field)

    if (!value) {
      return
    }

    const tomorrowDate = startOfTomorrow()
    const availableHour = subHours(tomorrowDate, 9)
    const validDate = isBefore(new Date(), availableHour)

    if (validDate) {
      const msg = 'o checkin é liberado as 15:00'
      throw msg
    }
  }

  const isChecked = async (data, field, message, args, get) => {
    const value = get(data, field)
    const { userId } = data

    if (!value) {
      return
    }
    const row = await Database.table('schedules')
      .where('user_id', userId)
      .whereNull('date_checkout')
      .first()
    if (row) {
      const msg = 'faça checkout antes de fazer checkin'
      throw msg
    }
  }

  Validator.extend('exists', existsFn)
  Validator.extend('oldPassword', oldPassword)
  Validator.extend('minLength', minLength)
  Validator.extend('isAvailableDesk', isAvailableDesk)
  Validator.extend('pastDate', pastDate)
  Validator.extend('isAvailableCheckin', isAvailableCheckin)
  Validator.extend('isChecked', isChecked)
})
