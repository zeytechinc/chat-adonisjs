
export interface ChatProvider {
    prompt(message: string): string
    prompt(system: string, message: string): string
}