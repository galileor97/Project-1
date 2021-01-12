import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { ScrimService } from "./scrim.service";
import { ScrimController } from "./scrim.controller";
import { ScrimResolver } from "./scrim.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [ScrimController],
  providers: [ScrimService, ScrimResolver],
  exports: [ScrimService],
})
export class ScrimModule {}
