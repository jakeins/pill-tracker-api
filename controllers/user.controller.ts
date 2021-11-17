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
    const result = this.service.Create(input) as IUser;
    return result;
  }

  @Path('/users')
  @GET
  public readAll(): IUser[] {
    return this.service.GetMany() as IUser[];
  }

  @Path('/user/:id')
  @GET
  public readOne(@PathParam('id') id: number): IUser {
    return this.service.GetOne(id) as IUser;
  }

  @Path('/user/:id')
  @PUT
  public update(@PathParam('id') id: number, input: IUser): IUser {
    if (id != input.id) {
      throw 'Id in path and body must match.';
    }
    const result = this.service.Update(input) as IUser;
    return result;
  }

  @Path('/user/:id')
  @DELETE
  public deleteOne(@PathParam('id') id: number): void {
    this.service.DeleteOne(id);
  }
}
