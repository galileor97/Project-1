import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type Scrim = {
  createdAt: Date;
  id: string;
  team1: TeamWhereUniqueInput;
  team2: TeamWhereUniqueInput;
  updatedAt: Date;
};
