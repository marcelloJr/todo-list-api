import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoCategory } from '../../todo-category/entities/todo-category.entity';
import { TodoItem } from '../../todo-item/entities/todo-item.entity';

@Entity({ name: 'todo' })
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 7, nullable: true })
  cardColor: string;

  @Column({ type: 'timestamptz', nullable: true })
  dueDate: Date;

  @ManyToOne(() => TodoCategory)
  category: TodoCategory;

  @OneToMany(() => TodoItem, (item) => item.todoList, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  items: TodoItem[];
}
