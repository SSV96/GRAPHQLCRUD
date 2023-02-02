import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;
  // nullable true means price is not required
  @Field(() => Int)
  price: number;
}
