
import OpenAI from 'openai'
import { Message } from './types/message.js'

const openai = new OpenAI({
    apiKey,
    project
})

export class ChatGptProvider {
    async prompt(message: string) {
        const result = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: message }
            ],
            model: 'gpt-3.5-turbo',
        })
        return result.choices[0].message
    }

    async promptThread(message: string, thread: Message[]) {
        const newThread = [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...thread,
            { role: 'user', content: message },
        ]
        const result = await openai.chat.completions.create({
            messages: newThread as any,
            model: 'gpt-3.5-turbo',
        })
        return result.choices[0].message
    }
}