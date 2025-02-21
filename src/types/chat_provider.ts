import { Message } from './message.js'
import { ChatCompletionTool } from 'openai/resources/chat/completions/completions'

export interface ChatProvider {
  prompt(message: string, system?: string, tools?: ChatCompletionTool[]): Promise<Message>
  promptThread(
    message: string,
    thread: Message[],
    system?: string,
    tools?: ChatCompletionTool[]
  ): Promise<Message>
}
