import { ArgsType, Field } from "@nestjs/graphql";
import { ScrimCreateInput } from "./ScrimCreateInput";

@ArgsType()
class CreateScrimArgs {
  @Field(() => ScrimCreateInput, { nullable: false })
  data!: ScrimCreateInput;
}

export { CreateScrimArgs };
