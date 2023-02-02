import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddBookArgs } from './args/add.book.args';
import { UpdateBookArgs } from './args/update.book.args';
import { BookEntity } from './entity/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    public readonly bookRepo: Repository<BookEntity>,
  ) {}
  // FindBook
  async findBookById(id: number): Promise<BookEntity> {
    return await this.bookRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  //Find All Books
  async findAllBooks(): Promise<BookEntity[]> {
    return await this.bookRepo.find();
  }

  //Delete Book
  async deleteBook(id: number): Promise<string> {
    await this.bookRepo.delete(id);
    return `Book with Id : ${id}  has been deleted`;
  }
  //Add Book
  async addBook(addBookArgs: AddBookArgs): Promise<string> {
    const book: BookEntity = new BookEntity();
    book.title = addBookArgs.title;
    book.price = addBookArgs.price;
    await this.bookRepo.save(book);
    return 'Book Added Successfully';
  }
  // update Book

  async updateBook(updateBookArgs: UpdateBookArgs): Promise<string> {
    const book: BookEntity = await this.bookRepo.findOne({
      where: {
        id: updateBookArgs.id,
      },
    });
    book.title = updateBookArgs.title;
    book.price = updateBookArgs.price;
    await this.bookRepo.save(book);
    return 'Book Updated Successfully';
  }
}
