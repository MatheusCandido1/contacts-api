import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,
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

    @OneToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
      category: Category;
}

export default Contact;
