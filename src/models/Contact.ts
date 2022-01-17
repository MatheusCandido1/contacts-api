import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
} from 'typeorm';
import Category from './Category';

@Entity('contacts')
class Contact {
    @PrimaryGeneratedColumn('uuid')
      id: string;

    @Column()
      name: string;

    @Column()
      email: string;

    @Column()
      phone: string;

    @ManyToOne(() => Category, (category: Category) => category.contacts, {nullable: true})
    @JoinColumn({name: 'category_id' })
      category!: Category;
}

export default Contact;
