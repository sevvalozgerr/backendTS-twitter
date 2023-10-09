import { StatusCodes } from "http-status-codes";
import {
  Controller,
  OperationId,
  Delete,
  Get,
  Path,
  Post,
  Query,
  Request,
  Response,
  Route,
  Security,
  Tags,
} from "tsoa";

import { Request as ExpressRequest } from "express";
import AuthenticatedUser from "../middleware/models/authenticated-user";

import FollowService from "../services/follow-service";
import { Follow, FollowsResponse } from "../services/models/follow-models";

@Route("/api/v1/follow")
@Tags("Follow")
export class FollowController extends Controller {
  /**
   * allows a user to follow another user.
   */
  @Post("/{userId}")
  @OperationId("followUser")
  @Security("jwt")
  @Response(StatusCodes.OK)
  @Response(StatusCodes.BAD_REQUEST, "Bad Request")
  public async followUser(
    @Request() request: ExpressRequest,
    @Path() userId: string
  ): Promise<Follow> {
    const user = request.user as AuthenticatedUser;
    const followerUserId = user.id;
    const followingUserId = userId;
    return new FollowService().followUser({ followerUserId, followingUserId });
  }

  /**
   * allows a user to unfollow another user.
   */
  @Delete("/{userId}")
  @OperationId("unfollowUser")
  @Security("jwt")
  @Response(StatusCodes.OK)
  @Response(StatusCodes.BAD_REQUEST, "Bad Request")
  public async unfollowUser(
    @Request() request: ExpressRequest,
    @Path() userId: string
  ): Promise<Follow> {
    const user = request.user as AuthenticatedUser;
    const followerUserId = user.id;
    const followingUserId = userId;
    return new FollowService().unfollowUser({
      followerUserId,
      followingUserId,
    });
  }

  /**
   * returns a list of users that the specified user is following.
   */
  @Get("/following/{userId}")
  @OperationId("getUserFollowing")
  @Security("jwt")
  @Response(StatusCodes.OK)
  @Response(StatusCodes.BAD_REQUEST, "Bad Request")
  public async getUserFollowing(
    @Path() userId: string,
    @Query() resultsPerPage?: number,
    @Query() page?: number
  ): Promise<FollowsResponse> {
    return new FollowService().getUserFollowing({
      userId,
      resultsPerPage,
      page,
    });
  }


  /**
   * returns a list of users that are following the specified user.
   */
  @Get("/followers/{userId}")
  @OperationId("getUserFollowers")
  @Security("jwt")
  @Response(StatusCodes.OK)
  @Response(StatusCodes.BAD_REQUEST, "Bad Request")
  public async getUserFollowers(
    @Path() userId: string,
    @Query() resultsPerPage?: number,
    @Query() page?: number
  ): Promise<FollowsResponse> {
    return new FollowService().getUserFollowers({
      userId,
      resultsPerPage,
      page,
    });
  }
}