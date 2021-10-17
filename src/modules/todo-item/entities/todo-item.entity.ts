import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PriorityEnum } from '../../priority/PriorityEnum';
import { Todo } from 'src/modules/todo/entities/todo.entity';

@Entity({ name: 'todo_item' })
export class TodoItem extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'enum', enum: PriorityEnum, default: PriorityEnum.NORMAL })
  priority: PriorityEnum;

  @ManyToOne(() => Todo, (todo) => todo.items, { onDelete: 'CASCADE' })
  todoList: Todo;
}
