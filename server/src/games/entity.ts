// src/games/entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsIn } from 'class-validator';

export const allowedColors=['red', 'blue', 'green', 'yellow', 'magenta'];

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', {nullable:false})
  name: string

  @IsString()
  @IsIn(allowedColors)
  @Column('text', {nullable:false})
  color: string

  @Column('json', {nullable:false})
  board: JSON
}