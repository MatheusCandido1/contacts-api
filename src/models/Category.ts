import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn,
} from 'typeorm';

import Contact from './Contact';

@Entity('categories')
class Category {
    @PrimaryGeneratedColumn('uuid')
      id: string;

    @Column()
      name: string;

    @OneToMany(() => Contact, (contact) => contact.category, {
      cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'category_id' })
      contacts: Contact[];
}

export default Category;
