import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoCategoryDto } from './create-todo-category.dto';

export class UpdateTodoCategoryDto extends PartialType(CreateTodoCategoryDto) {}
