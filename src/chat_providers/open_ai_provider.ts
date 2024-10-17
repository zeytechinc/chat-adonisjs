import OpenAI from 'openai'
import { Message } from '../types/message.js'
import { ZeytechChatConfig } from '../types/zeytech_chat_config.js'
import { ChatProvider } from '../types/chat_provider.js'

export class ChatGptProvider implements ChatProvider {
  #openai: OpenAI
  #model: string

  constructor(config: ZeytechChatConfig) {
    const openai = new OpenAI({
      apiKey: config.password,
      project: config.username,
      baseURL: config.openAiBaseUrl
    })
    this.#model = config.model || ''
    this.#openai = openai
  }

  async prompt(message: string, system?: string): Promise<Message> {
    return await this.promptThread(message, [], system)
  }

  async promptThread(message: string, thread: Message[], system?: string): Promise<Message> {
    const newThread = [
      ...(system ? [{ role: 'system', content: system }] : []),
      ...thread,
      { role: 'user', content: message },
    ]
    const result = await this.#openai.chat.completions.create({
      messages: newThread as any,
      model: this.#model,
    })
    return result.choices[0].message as Message
  }
}
