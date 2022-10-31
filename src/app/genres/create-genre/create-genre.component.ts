import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { firstLetterUppercase } from 'src/app/validators/firstLetterUppercase';
import { genreCreationDTO } from '../genres.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css']
})
export class CreateGenreComponent implements OnInit {

  errors: string[] = [];

  constructor(private _router: Router, private _genresService: GenresService) { }

  ngOnInit(): void {

  }

  saveChanges(genreCreationDTO: genreCreationDTO) {
    this._genresService.create(genreCreationDTO).subscribe(() => {
      this._router.navigate(['/genres']);
    }, error => this.errors = parseWebAPIErrors(error));

  }
}
