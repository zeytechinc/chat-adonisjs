import OpenAI from 'openai'
import { Message } from './types/message.js'
import { ZeytechChatConfig } from './types/zeytech_chat_config.js'
import { ChatProvider } from './chat_provider.js'

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

  async prompt(message: string) {
    const result = await this.#openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message },
      ],
      model: this.#model,
    })
    return result.choices[0].message as Message
  }

  async promptThread(message: string, thread: Message[]) {
    const newThread = [
      { role: 'system', content: 'You are a helpful assistant.' },
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
