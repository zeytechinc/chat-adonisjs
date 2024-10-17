import { ClaudeProvider } from '../src/chat_providers/claude_provider.js'
import { TEST_CONFIG_CLAUDE } from '../test_config.js'
import { testProvider } from './chat_test_suite.js'

testProvider('Claude', () => new ClaudeProvider(TEST_CONFIG_CLAUDE))
