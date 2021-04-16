export interface Task {
    id?: string,
    start: number,
    end: number,
    startMin: number,
    endMin: number,
    details: string,
    priority: string,
    day: number,
    month: number,
    year: number,
    location: string
}

export interface Global {
    currentDate: CurrentDate,
    calendarMode: boolean
}
export interface CurrentDate {
    day: number,
    month: number,
    year: number
}