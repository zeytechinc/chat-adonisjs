export type ChatProviderValue = 'chat-gpt' | 'claude'

export const ChatProviderType: { [key: string]: ChatProviderValue } = {
  ChatGpt: 'chat-gpt',
  Claude: 'claude',
}
