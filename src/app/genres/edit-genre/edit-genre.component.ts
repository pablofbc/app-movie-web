import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { genreCreationDTO, genreDTO } from '../genres.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute,
    private _genresService: GenresService,
    private _router: Router) { }

  model: genreDTO;

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this._genresService.getById(params.id).subscribe(genre => {
        this.model = genre;
      })
    });
  }

  saveChanges(genreCreationDTO: genreCreationDTO) {
    this._genresService.edit(this.model.id, genreCreationDTO)
      .subscribe(() => {
        this._router.navigate(["/genres"]);
      });
  }

}
