/*
|--------------------------------------------------------------------------
| Configure hook
|--------------------------------------------------------------------------
|
| The configure hook is called when someone runs "node ace configure <package>"
| command. You are free to perform any operations inside this function to
| configure the package.
|
| To make things easier, you have access to the underlying "ConfigureCommand"
| instance and you can use codemods to modify the source files.
|
*/

import type Configure from '@adonisjs/core/commands/configure'
import { stubsRoot } from './stubs/main.js'

/**
 * Configures the package
 */
export async function configure(command: Configure) {
  const codemods = await command.createCodemods()

  /**
   * Publish config file
   */
  await codemods.makeUsingStub(stubsRoot, 'config/zeytech_chat.stub', {})

  /**
   * Public migrations
   */
  await codemods.makeUsingStub(stubsRoot, 'migrations/init_chat_histories_table.stub', {})

  /**
   * Define environment variables
   */
  await codemods.defineEnvVariables({
    ZEYTECH_CHAT_USERNAME: '',
    ZEYTECH_CHAT_PASSWORD: '',
  })

  /**
   * Define environment variables validations
   */
  await codemods.defineEnvValidations({
    variables: {
      ZEYTECH_CHAT_USERNAME: `Env.schema.string().optional()`,
      ZEYTECH_CHAT_PASSWORD: `Env.schema.string()`,
    },
    leadingComment: 'Variables for configuring Zeytech Chat package',
  })

  /**
   * Register provider
   */
  await codemods.updateRcFile((rcFile) => {
    rcFile.addProvider('@zeytech/chat-adonisjs/zeytech_chat_provider')
  })
}
