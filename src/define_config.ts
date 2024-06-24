
import { configProvider } from '@adonisjs/core'
import type { ConfigProvider } from '@adonisjs/core/types'
import { InvalidArgumentsException } from '@poppinss/utils'
import { ZeytechChatConfig } from './types/zeytech_chat_config.js'
import debug from './debug.js'

/**
 * Helper to normalize chat config
 */
export function defineConfig(
  config: Partial<ZeytechChatConfig>
): ConfigProvider<ZeytechChatConfig> {
  debug('processing zeytech chat config %O', config)

  /**
   * Make sure a provider is defined
   */
  if (!config.provider) {
    throw new InvalidArgumentsException('Missing "provider" property inside the Zeytech Chat config')
  }

  /**
   * Make sure a username is defined
   */
  if (!config.username) {
    throw new InvalidArgumentsException('Missing "username" property inside the Zeytech Chat config')
  }

  /**
   * Make sure a username is defined
   */
  if (!config.password) {
    throw new InvalidArgumentsException('Missing "password" property inside the Zeytech Chat config')
  }

  return configProvider.create(async (app) => {
    const transformedConfig = config as ZeytechChatConfig
    debug('transformed session config %O', transformedConfig)
    return transformedConfig
  })
}
