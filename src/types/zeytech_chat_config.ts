import { ChatProviderValue } from './chat_provider_type.js'

export type ZeytechChatConfig = {
  provider: ChatProviderValue
  model: string
  username: string
  password: string
}
