import { ArgsType, Field } from "@nestjs/graphql";
import { ScrimWhereInput } from "./ScrimWhereInput";

@ArgsType()
class FindManyScrimArgs {
  @Field(() => ScrimWhereInput, { nullable: true })
  where?: ScrimWhereInput;
}

export { FindManyScrimArgs };
