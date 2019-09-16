import { TaskDataModel } from './task-data-model';

describe('TaskDataModel', () => {
  it('should create an instance', () => {
    expect(new TaskDataModel('', 0, '', '', '', 0, 0, false)).toBeTruthy();
  });
});
