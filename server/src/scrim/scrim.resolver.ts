import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { ScrimService } from "./scrim.service";
import { CreateScrimArgs } from "./CreateScrimArgs";
import { UpdateScrimArgs } from "./UpdateScrimArgs";
import { DeleteScrimArgs } from "./DeleteScrimArgs";
import { FindManyScrimArgs } from "./FindManyScrimArgs";
import { FindOneScrimArgs } from "./FindOneScrimArgs";
import { Scrim } from "./Scrim";
import { Team } from "../team/Team";

@graphql.Resolver(() => Scrim)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ScrimResolver {
  constructor(
    private readonly service: ScrimService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Scrim])
  @nestAccessControl.UseRoles({
    resource: "Scrim",
    action: "read",
    possession: "any",
  })
  async scrims(
    @graphql.Args() args: FindManyScrimArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Scrim[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Scrim",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Scrim, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Scrim",
    action: "read",
    possession: "own",
  })
  async scrim(
    @graphql.Args() args: FindOneScrimArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Scrim | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Scrim",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Scrim)
  @nestAccessControl.UseRoles({
    resource: "Scrim",
    action: "create",
    possession: "any",
  })
  async createScrim(
    @graphql.Args() args: CreateScrimArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Scrim> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Scrim",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Scrim"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        team1: {
          connect: args.data.team1,
        },

        team2: {
          connect: args.data.team2,
        },
      },
    });
  }

  @graphql.Mutation(() => Scrim)
  @nestAccessControl.UseRoles({
    resource: "Scrim",
    action: "update",
    possession: "any",
  })
  async updateScrim(
    @graphql.Args() args: UpdateScrimArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Scrim | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Scrim",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Scrim"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          team1: {
            connect: args.data.team1,
          },

          team2: {
            connect: args.data.team2,
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Scrim)
  @nestAccessControl.UseRoles({
    resource: "Scrim",
    action: "delete",
    possession: "any",
  })
  async deleteScrim(
    @graphql.Args() args: DeleteScrimArgs
  ): Promise<Scrim | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Team, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Scrim",
    action: "read",
    possession: "any",
  })
  async team(
    @graphql.Parent() parent: Scrim,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Team",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .team1();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Team, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Scrim",
    action: "read",
    possession: "any",
  })
  async team(
    @graphql.Parent() parent: Scrim,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Team",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .team2();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
