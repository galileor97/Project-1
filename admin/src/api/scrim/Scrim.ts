import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type Scrim = {
  createdAt: Date;
  id: string;
  team1: TeamWhereUniqueInput;
  updatedAt: Date;
};
