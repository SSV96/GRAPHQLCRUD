import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard, Roles } from 'src/auth/role.guard';
import { UserEntity } from 'src/users/entity/user.entity';
import { AddBookArgs } from './args/add.book.args';
import { UpdateBookArgs } from './args/update.book.args';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
//  Book is schema for GRAPHQL
//  resolver of Book Schema
@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) { }
  // queries and Mutations
  //Find All Books
  @Query(() => [Book], { name: 'books' })
  getAllBooks() {
    return this.bookService.findAllBooks();
  }
  // Find Single Book
  @Query(() => Book, { name: 'bookById' })
  getBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
    return this.bookService.findBookById(id);
  }
  // Mutation
  // Delelte Book
  // secured data
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
  @Mutation(() => String, { name: 'deleteBook' })
  deleteBookById(@Args({ name: 'bookId', type: () => Int }) id: number, @Context('user') user: UserEntity) {
    console.log(user, 'delted book');
    return this.bookService.deleteBook(id);
  }
  //
  @Mutation(() => String, { name: 'addBook' })
  addBook(@Args('addBookArgs') addBookArgs: AddBookArgs) {
    return this.bookService.addBook(addBookArgs);
  }
  // update Book
  @Mutation(() => String, { name: 'updateBook' })
  updateBook(@Args('updateBookArgs') updateBookArgs: UpdateBookArgs) {
    return this.bookService.updateBook(updateBookArgs);
  }
}
