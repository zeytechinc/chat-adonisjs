import OpenAI from 'openai'
import { Message } from '../types/message.js'
import { ZeytechChatConfig } from '../types/zeytech_chat_config.js'
import { ChatProvider } from '../types/chat_provider.js'
import { ChatResponse } from '../types/index.js'
import {
  ChatCompletionTool,
  ChatCompletionCreateParamsNonStreaming,
} from 'openai/resources/chat/completions'
import { ResponseFormatText } from 'openai/resources'

export class OpenAiProvider implements ChatProvider {
  #openai: OpenAI
  #model: string

  constructor(config: ZeytechChatConfig) {
    const openai = new OpenAI({
      apiKey: config.password,
      project: config.username,
      baseURL: config.openAiBaseUrl,
    })
    this.#model = config.model || ''
    this.#openai = openai
  }

  async prompt(
    message: string,
    system?: string,
    tools?: ChatCompletionTool[],
    responseFormat?: 'text' | 'json_schema' | 'json_object'
  ): Promise<ChatResponse> {
    return await this.promptThread(message, [], system, tools, responseFormat)
  }

  async promptThread(
    message: string,
    thread: Message[],
    system?: string,
    tools?: ChatCompletionTool[],
    responseFormat?: 'text' | 'json_schema' | 'json_object'
  ): Promise<ChatResponse> {
    const newThread = [
      ...(system ? [{ role: 'system', content: system }] : []),
      ...thread,
      { role: 'user', content: message },
    ]

    const options: ChatCompletionCreateParamsNonStreaming = {
      messages: newThread as any,
      model: this.#model,
    }

    if (tools?.length) {
      options.tools = tools
    }

    if (responseFormat) {
      options.response_format = { type: responseFormat } as ResponseFormatText
    }

    const result = await this.#openai.chat.completions.create(options)
    return {
      thread: [...newThread, result.choices[0].message as Message],
      userMessage: { role: 'user', content: message },
      response: result.choices[0].message as Message,
    }
  }
}
