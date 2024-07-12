import { Message } from './types/message.js'

export interface ChatProvider {
  prompt(message: string): Promise<Message>
  promptThread(message: string, thread: Message[]): Promise<Message>
}
