import { Message } from './message.js'
import { ChatCompletionTool } from 'openai/resources/chat/completions'
import { ChatResponse } from './chat_response.js'
import { AutoParseableResponseFormat } from 'openai/lib/parser.js'

export interface ChatProvider {
  prompt(
    message: string,
    system?: string,
    tools?: ChatCompletionTool[],
    responseFormat?: 'text' | 'json_schema' | 'json_object' | AutoParseableResponseFormat<any>,
    jsonSchema?: { name: string; schema: any }
  ): Promise<ChatResponse>
  promptThread(
    message: string,
    thread: Message[],
    system?: string,
    tools?: ChatCompletionTool[],
    responseFormat?: 'text' | 'json_schema' | 'json_object' | AutoParseableResponseFormat<any>,
    jsonSchema?: { name: string; schema: any }
  ): Promise<ChatResponse>
}
