import { StatusCodes } from "http-status-codes";

import {
  Body,
  Controller,
  OperationId,
  Post,
  Route,
  Security,
  Tags,
} from "tsoa";

import {
  LoginParams,
  UserAndCredentials,
  UserCreationParams,
} from "../services/models/auth-models";

import AuthService from "../services/auth-service";

@Route("/api/v1/auth")
@Tags("Auth")

export class AuthController extends Controller {
  @Post("register")
  @OperationId("registerUser")
  public async register(
    @Body() requestBody: UserCreationParams
  ): Promise<UserAndCredentials> {
    this.setStatus(StatusCodes.CREATED);
    return new AuthService().register(requestBody);
  }

  
  @Post("login")
  @OperationId("loginUser")
  public async login(
    @Body() requestBody: LoginParams
  ): Promise<UserAndCredentials> {
    this.setStatus(StatusCodes.OK);
    return new AuthService().login(requestBody);
  }
  
  @Post("dummy")
  @OperationId("dummy")
  @Security("jwt")
  public async dummy(): Promise<void> {
    this.setStatus(StatusCodes.OK);
    return Promise.resolve();
  }
  
}