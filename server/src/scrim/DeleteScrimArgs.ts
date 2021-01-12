import { ArgsType, Field } from "@nestjs/graphql";
import { ScrimWhereUniqueInput } from "./ScrimWhereUniqueInput";

@ArgsType()
class DeleteScrimArgs {
  @Field(() => ScrimWhereUniqueInput, { nullable: false })
  where!: ScrimWhereUniqueInput;
}

export { DeleteScrimArgs };
