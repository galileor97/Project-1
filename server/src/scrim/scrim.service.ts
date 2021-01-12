import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneScrimArgs,
  FindManyScrimArgs,
  ScrimCreateArgs,
  ScrimUpdateArgs,
  ScrimDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class ScrimService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyScrimArgs>(args: Subset<T, FindManyScrimArgs>) {
    return this.prisma.scrim.findMany(args);
  }
  findOne<T extends FindOneScrimArgs>(args: Subset<T, FindOneScrimArgs>) {
    return this.prisma.scrim.findOne(args);
  }
  create<T extends ScrimCreateArgs>(args: Subset<T, ScrimCreateArgs>) {
    return this.prisma.scrim.create<T>(args);
  }
  update<T extends ScrimUpdateArgs>(args: Subset<T, ScrimUpdateArgs>) {
    return this.prisma.scrim.update<T>(args);
  }
  delete<T extends ScrimDeleteArgs>(args: Subset<T, ScrimDeleteArgs>) {
    return this.prisma.scrim.delete(args);
  }
}
