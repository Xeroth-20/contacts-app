export interface NotifyConfig {
    message: string,
    duration?: number,
    actions?: Action[]
}

interface Action {
    name: string,
    fn: Function
}