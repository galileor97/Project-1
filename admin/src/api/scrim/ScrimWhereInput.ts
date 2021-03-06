import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type ScrimWhereInput = {
  createdAt?: Date;
  id?: string;
  team1?: TeamWhereUniqueInput;
  updatedAt?: Date;
};
