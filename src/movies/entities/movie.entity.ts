import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {

    @ApiProperty({
        example: 'cd59864-eoisdfa-485co-a78asd-asdasd45',
        description: 'Movie Id',
        nullable: false,
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'interestelar',
        description: 'Title Movile',
        uniqueItems: false
    })
    @Column('text', {
        unique: false,
    })
    title: string;

    @ApiProperty({
        example: 5,
        description: 'Quaification Movile',
        uniqueItems: false,
        default: 0,
    })
    @Column('int', {
        default: 0
    })
    qualification: number;

    @ApiProperty({
        example: '1 or 0',
        description: 'favorite Movile',
        uniqueItems: false,
        default: '0',
    })
    @Column('text', {
        unique: false,
    })
    favorite: string;

    @ManyToOne(
        () => User,
        ( user ) => user.movie,
        { eager: true }
    )
    user: User


    /* @Column('float',{
        default: 0
    })
    price: number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column('text', {
        unique: true
    })
    slug: string;

    @Column('int', {
        default: 0
    })
    stock: number;

    @Column('text',{
        array: true
    })
    sizes: string[];

    @Column('text')
    gender: string;


    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    // images

    @BeforeInsert()
    checkSlugInsert() {

        if ( !this.slug ) {
            this.slug = this.title;
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')

    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    } */


}