import { forwardRef, Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), forwardRef(() => AuthModule)],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
