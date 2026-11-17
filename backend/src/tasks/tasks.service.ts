import { Injectable } from '@nestjs/common';
import { Task } from './task.js';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    private nextId = 1;

    findAll(): Task[] {
        return this.tasks;
    }

    create(title:string, description?:string): Task {
        const task: Task = {
            id: this.nextId++,
            title: title,
            created_at: new Date,
            completed: false
        }

        if (description !== undefined) {
            task.description = description;
        }

        this.tasks.push(task);

        return task;
    }
}