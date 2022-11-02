export interface actorCreationDTO {
  name: string;
  surname: string;
  dateOfBirth: Date;
  picture: File;
  biography: string;
}

export interface actorDTO {
  id: number;
  name: string;
  surname: string;
  dateOfBirth: Date;
  picture: string;
  biography: string;
}

export interface actorsMovieDTO {
  id: number;
  name: string;
  surname: string;
  character: string;
  picture: string;
}
