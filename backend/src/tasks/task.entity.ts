import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('tasks')
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'text', nullable: true })
    description!: string | null;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @Column({type: 'boolean', default: false})
    completed: boolean;

}