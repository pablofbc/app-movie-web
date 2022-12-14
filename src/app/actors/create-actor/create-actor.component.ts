import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { actorCreationDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.css']
})
export class CreateActorComponent implements OnInit {

  constructor(private _actorsService: ActorsService, private _router: Router) { }

  ngOnInit(): void {
  }

  saveChanges(actorCreationDTO: actorCreationDTO) {
    console.log("create actor", actorCreationDTO);
    this._actorsService.create(actorCreationDTO).subscribe(() => {
      this._router.navigate(['/actors']);
    });
  }

}
