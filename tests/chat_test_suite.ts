import { ChatProvider } from '../src/types/chat_provider.js'
import { test } from '@japa/runner'

export function testProvider(groupName: string, getProviderFunc: () => ChatProvider) {
  test.group(groupName, () => {
    test('prompt', async ({ assert }) => {
      const provider = getProviderFunc()
      const result = await provider.prompt('When did the Green Bay Packers win the Super Bowl?')
      assert.isNotNull(result)
    })

    test('prompt system:rudeTeenager', async ({ assert }) => {
      const provider = getProviderFunc()
      const result = await provider.prompt(
        'When did the Green Bay Packers win the Super Bowl?',
        `You are a rude teenager but still answers correctly. All requests include the word 'bruh'`
      )
      assert.isNotNull(result)
      assert.include(result.response.content.toLowerCase(), `bruh`)
    })

    test('prompThread', async ({ assert }) => {
      const provider = getProviderFunc()
      const initialResult = await provider.prompt(
        'When did the Green Bay Packers win the Super Bowl?'
      )
      const result = await provider.promptThread(
        'Who threw the most touchdowns in the most recent one?',
        [
          { role: 'user', content: 'When did the Green Bay Packers win the Super Bowl?' },
          initialResult.response,
        ]
      )
      assert.isNotNull(result)
    }).timeout(10000)
  })
}
