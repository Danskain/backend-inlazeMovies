import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity('users')
export class User {
    
    @ApiProperty({
        example: 'cd59864-eoisdfa-485co-a78asd-asdasd45',
        description: 'UserId',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'david_08k@hotmail.com',
        description: 'Email User',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    email: string;

    @ApiProperty({
        example: 'asdq.r564wear',
        description: 'Password User',
        uniqueItems: true
    })
    @Column('text', {
        select: false
    })
    password: string;

    @ApiProperty({
        example: 'Aker Rodriguez',
        description: 'Password User',
        uniqueItems: false
    })
    @Column('text')
    fullName: string;

    @ApiProperty({
        example: true,
        description: 'Active User',
        uniqueItems: false
    })
    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @ApiProperty({
        example: ['user', 'admin', 'super-admin'],
        description: 'Active User',
        uniqueItems: false
    })
    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @OneToMany(
        () => Movie,
        ( movie ) => movie.user
    )
    movie: Movie;


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}