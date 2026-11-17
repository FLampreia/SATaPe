import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service.js';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    @Post()
    create(@Body() body: unknown) {
        if (
            typeof body !== 'object' ||
            body === null ||
            !('title' in body) ||
            typeof body.title !== 'string' ||
            body.title.trim().length === 0
        ) {
            throw new BadRequestException(
                'The task title is mandatory.'
            );
        }

        let description: string | undefined;

        if ('description' in body) {
            if (typeof body.description !== 'string') {
                throw new BadRequestException(
                    'The description should be text.'
                );
            }
            
            description = body.description.trim()
        }

        return this.taskService.create(
            body.title.trim(),
            description
        );
    }
}
