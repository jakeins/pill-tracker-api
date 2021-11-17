import { DELETE, GET, Path, PathParam, POST, PUT } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { v4 } from 'uuid';

import { ServiceContainer } from '../containers';
import { ITreatment } from '../models';

@Tags('Treatments')
@Path('')
export class TreatmentController {
  private treatmentRepo = ServiceContainer.TreatmentRepository;

  @Path('/treatment')
  @POST
  public create(input: ITreatment): ITreatment {

    // Auto-generate GUIDs
    input.medications.forEach(medication => {
      medication.guid = v4();
      medication.schedule.guid = v4();

      medication.schedule.takes.forEach(take => {
        take.guid = v4();
      });
    });

    const result = this.treatmentRepo.Create(input) as ITreatment;
    return result;
  }

  @Path('/treatments')
  @GET
  public readAll(): ITreatment[] {
    return this.treatmentRepo.GetMany() as ITreatment[];
  }

  @Path('/treatment/:id')
  @GET
  public readOne(@PathParam('id') id: number): ITreatment {
    return this.treatmentRepo.GetOne(id) as ITreatment;
  }

  @Path('/treatment/:id')
  @PUT
  public update(@PathParam('id') id: number, input: ITreatment): ITreatment {
    if (id != input.id) {
      throw 'Id in path and body must match.';
    }
    const result = this.treatmentRepo.Update(input) as ITreatment;
    return result;
  }

  @Path('/treatment/:id')
  @DELETE
  public deleteOne(@PathParam('id') id: number): void {
    this.treatmentRepo.DeleteOne(id);
  }
}
