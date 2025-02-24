import { Message } from './message.js'

export type ChatResponse = {
  thread: Message[]
  userMessage: Message
  response: Message
}
