import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsInt } from "class-validator";
@InputType()
class TeamCreateInput {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  balance?: number | null;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  seasonPoints!: number;
}
export { TeamCreateInput };
