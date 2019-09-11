export class TaskDataModel {
    constructor(
        public task: string,
        public priority: number,
        public parentTask: string,
        public startDate: string,
        public endDate: string
    ) {}
}
