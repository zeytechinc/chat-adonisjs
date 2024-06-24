import { test } from '@japa/runner'
import { ChatGptProvider } from '../src/chat_gpt_provider.js'

test.group('ChatGPT', () => {
  test('prompt', async ({ assert }) => {
    const provider = new ChatGptProvider()
    const result = await provider.prompt('When did the Green Bay Packers win the Super Bowl?')
    assert.isNotNull(result)
    console.log(JSON.stringify(result))
  })

  test('prompThread', async ({ assert }) => {
    const provider = new ChatGptProvider()
    const initialResult = await provider.prompt('When did the Green Bay Packers win the Super Bowl?')
    const result = await provider.promptThread(
      'Who threw the most touchdowns in the most recent one?',
      [
        {role: 'user', content: 'When did the Green Bay Packers win the Super Bowl?'},
        initialResult
      ]
    )
    assert.isNotNull(result)
    console.log(JSON.stringify(result))
  })
  .timeout(10000)
})
