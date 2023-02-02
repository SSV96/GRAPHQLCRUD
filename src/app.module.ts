import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { BookEntity } from './book/entity/book.entity';
import { UserEntity } from './users/entity/user.entity';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: { path: join(process.cwd(), 'src/schema.graphql') },
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sathya',
      database: 'book_db',
      entities: [BookEntity, UserEntity],
      synchronize: true,
    }),
    BookModule,
    UsersModule,
    AuthModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
