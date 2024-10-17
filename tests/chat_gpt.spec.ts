import { ChatGptProvider } from '../src/chat_providers/chat_gpt_provider.js'
import { TEST_CONFIG_GPT } from '../test_config.js'
import { testProvider } from './chat_test_suite.js'

testProvider('ChatGPT', () => new ChatGptProvider(TEST_CONFIG_GPT))
