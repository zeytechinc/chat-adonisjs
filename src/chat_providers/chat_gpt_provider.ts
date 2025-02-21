import OpenAI from 'openai'
import { Message } from '../types/message.js'
import { ZeytechChatConfig } from '../types/zeytech_chat_config.js'
import { ChatProvider } from '../types/chat_provider.js'
import {
  ChatCompletionTool,
  ChatCompletionCreateParamsNonStreaming,
} from 'openai/resources/chat/completions/completions'

export class ChatGptProvider implements ChatProvider {
  #openai: OpenAI
  #model: string

  constructor(config: ZeytechChatConfig) {
    const openai = new OpenAI({
      apiKey: config.password,
      project: config.username,
    })
    this.#model = config.model || 'gpt-3.5-turbo'
    this.#openai = openai
  }

  async prompt(message: string, system?: string, tools?: ChatCompletionTool[]): Promise<Message> {
    return await this.promptThread(message, [], system, tools)
  }

  async promptThread(
    message: string,
    thread: Message[],
    system?: string,
    tools?: ChatCompletionTool[]
  ): Promise<Message> {
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

    const result = await this.#openai.chat.completions.create(options)
    return result.choices[0].message as Message
  }
}
