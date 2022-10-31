import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorCreationDTO, actorDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute,
    private _actorsService: ActorsService,
    private _router: Router) { }

  model: actorDTO;
  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this._actorsService.getById(params.id).subscribe(actor => this.model = actor);
    });
  }

  saveChanges(actorCreationDTO: actorCreationDTO) {
    console.log(actorCreationDTO);
    this._actorsService.edit(this.model.id, actorCreationDTO).subscribe(() => {
      this._router.navigate(['/actors']);
    });
  }

}
