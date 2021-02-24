import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface pkmFromApi {
  created: string,
  modified: string,
  name: string,
  pokemon: any[],
  resource_uri: string
}

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private url = 'https://dev.treinaweb.com.br/pokeapi/';
  pokeList = [];
  constructor(private http: HttpClient) { }

  listAll() {
    this.http.get<pkmFromApi>(`${this.url}/pokedex/1`)
      .subscribe((res) => {
        const { pokemon } = res;
        pokemon.forEach(pkm => {
          pkm.number = this.getNumberFromUrl(pkm.resource_uri);
        });
        this.pokeList = this.sortPokemon(pokemon).filter(pkm => {
          return pkm.number < 1000;
        });
      });
  }

  private getNumberFromUrl(url) {
   return parseInt(url.replace(/.*\/(\d+)\/$/, '$1'));
  }

  private sortPokemon(pokeList) {
    return pokeList.sort((a, b) => {
      return (a.number > b.number ? 1 : -1);
    })
  }
}
