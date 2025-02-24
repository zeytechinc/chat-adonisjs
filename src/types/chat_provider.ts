import { Message } from './message.js'
import { ChatCompletionTool } from 'openai/resources/chat/completions/completions'
import { ChatResponse } from './chat_response.js'

export interface ChatProvider {
  prompt(message: string, system?: string, tools?: ChatCompletionTool[]): Promise<ChatResponse>
  promptThread(
    message: string,
    thread: Message[],
    system?: string,
    tools?: ChatCompletionTool[]
  ): Promise<ChatResponse>
}
