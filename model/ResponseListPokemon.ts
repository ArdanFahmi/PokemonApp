export interface ResponseListPokemon {
  count: number;
  next: string;
  previous: any;
  results: ListPokemon[];
}

export interface ListPokemon {
  name: string;
  url: string;
  imageUri?: string;
}
