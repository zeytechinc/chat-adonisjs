import { test } from '@japa/runner'
import { ChatGptProvider } from '../src/chat_gpt_provider.js'
import { TEST_CONFIG } from '../test_config.js'

test.group('ChatGPT', () => {
  test('prompt', async ({ assert }) => {
    const provider = new ChatGptProvider(TEST_CONFIG)
    const result = await provider.prompt('When did the Green Bay Packers win the Super Bowl?')
    assert.isNotNull(result)
    console.log(JSON.stringify(result))
  })

  test('prompThread', async ({ assert }) => {
    const provider = new ChatGptProvider(TEST_CONFIG)
    const initialResult = await provider.prompt(
      'When did the Green Bay Packers win the Super Bowl?'
    )
    const result = await provider.promptThread(
      'Who threw the most touchdowns in the most recent one?',
      [
        { role: 'user', content: 'When did the Green Bay Packers win the Super Bowl?' },
        initialResult,
      ]
    )
    assert.isNotNull(result)
    console.log(JSON.stringify(result))
  }).timeout(10000)
})
