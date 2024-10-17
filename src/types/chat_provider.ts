import { Message } from './message.js'

export interface ChatProvider {
  prompt(message: string, system?: string): Promise<Message>
  promptThread(message: string, thread: Message[], system?: string): Promise<Message>
}
