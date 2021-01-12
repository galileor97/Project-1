import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class ScrimCreateInput {
  @ApiProperty({
    required: true,
    type: TeamWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => TeamWhereUniqueInput)
  @Field(() => TeamWhereUniqueInput)
  team1!: TeamWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: TeamWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => TeamWhereUniqueInput)
  @Field(() => TeamWhereUniqueInput)
  team2!: TeamWhereUniqueInput;
}
export { ScrimCreateInput };
