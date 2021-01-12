import { ArgsType, Field } from "@nestjs/graphql";
import { ScrimWhereUniqueInput } from "./ScrimWhereUniqueInput";

@ArgsType()
class FindOneScrimArgs {
  @Field(() => ScrimWhereUniqueInput, { nullable: false })
  where!: ScrimWhereUniqueInput;
}

export { FindOneScrimArgs };
