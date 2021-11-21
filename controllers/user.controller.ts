import { DELETE, GET, Path, PathParam, POST, PUT } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';

import { ServiceContainer } from '../containers';
import { IUser } from '../models';

@Tags('Users')
@Path('')
export class UserController {
  private service = ServiceContainer.UserRepository; 

  @Path('/user')
  @POST
  public create(input: IUser): IUser {
    let result = this.service.Create(input) as IUser;
    result = this.readOne(result.id);
    return result;
  }

  @Path('/users')
  @GET
  public readAll(): IUser[] {
    const users = this.service.GetMany() as IUser[];
    return users;
  }

  @Path('/user/:id')
  @GET
  public readOne(@PathParam('id') id: number): IUser {
    const user = this.service.GetOne(id) as IUser;
    return user;
  }

  @Path('/user/:id')
  @PUT
  public update(@PathParam('id') id: number, input: IUser): IUser {
    if (id != input.id) {
      throw 'Id in path and body must match.';
    }
    this.service.Update(input) as IUser;
    const result = this.readOne(id);
    return result;
  }

  @Path('/user/:id')
  @DELETE
  public deleteOne(@PathParam('id') id: number): void {
    this.service.DeleteOne(id);
  }
}
