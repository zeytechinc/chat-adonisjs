import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { Message } from './types/message.js'

export default class ChatHistory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare referenceKey: string

  @column({
    prepare: (value) => JSON.stringify(value),
  })
  declare thread: Message[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
