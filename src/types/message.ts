import { ChatCompletionMessageToolCall } from 'openai/resources/chat/completions'

export type { ChatCompletionMessageToolCall } from 'openai/resources/chat/completions'
export interface ToolCall extends ChatCompletionMessageToolCall {}

export type Message = {
  role: string
  content: string
  tool_calls?: ToolCall[]
  function_response?: any | any[]
  has_arguments?: boolean
}
