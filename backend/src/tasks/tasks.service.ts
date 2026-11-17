import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ) { }

    findAll(): Promise<TaskEntity[]> {
        return this.taskRepository.find({
            order: { id: 'ASC' },
        });
    }

    create(
        title: string,
        description?: string
    ): Promise<TaskEntity> {
        const task = this.taskRepository.create({
            title,
            description: description ?? null,
        });

        return this.taskRepository.save(task)
    }

    async remove(
        id: number,
    ): Promise<void> {
        const result = await this.taskRepository.delete(id)

        if (result.affected === 0) {
            throw new NotFoundException('Task not found.');
        }
    }
}