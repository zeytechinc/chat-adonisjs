import { ChatCompletionMessageToolCall } from 'openai/resources/chat/completions/completions'

export type Message = {
  role: string
  content: string
  tool_calls?: ChatCompletionMessageToolCall[]
}
