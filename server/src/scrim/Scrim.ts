import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";
@ObjectType()
class Scrim {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
  @ApiProperty({
    required: true,
    type: TeamWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => TeamWhereUniqueInput)
  team1!: TeamWhereUniqueInput;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Scrim };
