export type Deadline = {
    id: string;
    taskName: string;
    courseId: string;
    type: 'assignment' | 'quiz' | 'exam' | 'project';
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    description: string;
    status: 'upcoming' | 'overdue' | 'completed';
  };