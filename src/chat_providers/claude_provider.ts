import { Message } from '../types/message.js'
import { ZeytechChatConfig } from '../types/zeytech_chat_config.js'
import { ChatProvider } from '../types/chat_provider.js'
import { ChatResponse } from '../types/chat_response.js'
import Anthropic from '@anthropic-ai/sdk'
import { MessageParam, TextBlock } from '@anthropic-ai/sdk/resources/index.mjs'

export class ClaudeProvider implements ChatProvider {
  #provider: Anthropic
  #model: string

  constructor(config: ZeytechChatConfig) {
    const provider = new Anthropic({
      apiKey: config.password,
    })

    this.#model = config.model || 'claude-3-haiku-20240307'
    this.#provider = provider
  }

  #transformTextBlock(textBlock: TextBlock): Message {
    return {
      role: 'assistant',
      content: textBlock.text,
    }
  }

  #transformMessage(message: Message): MessageParam {
    return {
      role: message.role,
      content: [
        {
          type: 'text',
          text: message.content,
        },
      ],
    } as MessageParam
  }

  #transformThread(messages: Message[]): MessageParam[] {
    return messages.map(this.#transformMessage)
  }

  async prompt(message: string, system?: string): Promise<ChatResponse> {
    return this.promptThread(message, [], system)
  }

  async promptThread(message: string, thread: Message[], system?: string): Promise<ChatResponse> {
    const result = await this.#provider.messages.create({
      model: this.#model,
      max_tokens: 1000,
      system: system,
      messages: [
        ...this.#transformThread(thread),
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: message,
            },
          ],
        },
      ],
    })

    return {
      thread: [
        ...thread,
        { role: 'user', content: message },
        this.#transformTextBlock(result.content[0] as TextBlock),
      ],
      userMessage: { role: 'user', content: message },
      response: this.#transformTextBlock(result.content[0] as TextBlock),
    }
  }
}
