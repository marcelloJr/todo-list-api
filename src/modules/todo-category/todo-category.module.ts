import { Module } from '@nestjs/common';
import { TodoCategoryService } from './todo-category.service';
import { TodoCategoryController } from './todo-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoCategory } from './entities/todo-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoCategory])],
  controllers: [TodoCategoryController],
  providers: [TodoCategoryService],
})
export class TodoCategoryModule {}
