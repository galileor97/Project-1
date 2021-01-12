import { ArgsType, Field } from "@nestjs/graphql";
import { ScrimWhereUniqueInput } from "./ScrimWhereUniqueInput";
import { ScrimUpdateInput } from "./ScrimUpdateInput";

@ArgsType()
class UpdateScrimArgs {
  @Field(() => ScrimWhereUniqueInput, { nullable: false })
  where!: ScrimWhereUniqueInput;
  @Field(() => ScrimUpdateInput, { nullable: false })
  data!: ScrimUpdateInput;
}

export { UpdateScrimArgs };
