import { configProvider } from '@adonisjs/core'
import { RuntimeException } from '@poppinss/utils'
import type { ApplicationService } from '@adonisjs/core/types'
import { ZeytechChatConfig } from '../src/types/zeytech_chat_config.js'
import { ChatGptProvider } from '../src/chat_gpt_provider.js'
import { ChatProvider } from '../src/chat_provider.js'
import { ChatProviderValue } from '../src/types/chat_provider_type.js'

const providerMap: Record<ChatProviderValue, new (...args: any[]) => ChatProvider> = {
  'chat-gpt': ChatGptProvider,
}

export default class ZeytechChatProvider {
  static #provider: ChatProvider | null = null
  constructor(protected app: ApplicationService) {}

  static getProvider() {
    return this.#provider
  }

  async register() {
    const chatConfig = this.app.config.get('zeytech_chat', {})

    /**
     * Resolve config from the provider
     */
    const config = await configProvider.resolve<ZeytechChatConfig>(this.app, chatConfig)
    if (!config) {
      throw new RuntimeException(
        'Invalid "config/zeytech_chat.ts" file. Make sure you are using the "defineConfig" method'
      )
    }

    const providerType = providerMap[config.provider]
    if (providerType) {
      ZeytechChatProvider.#provider = new providerType(config)
    } else {
      throw new RuntimeException(
        'Invalid "config/zeytech_chat.ts" file. Make sure you user a valid provider.'
      )
    }
  }
}
