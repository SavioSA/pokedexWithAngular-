import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  nameFilter = '';
  selectedPkm = null;

  constructor(private pokeApiService: PokeapiService) { }

  ngOnInit() {
    this.pokeApiService.listAll();
  }

  get pkmSprite() {
    const number = ('000' + this.selectedPkm.number).slice(-3);
    return  `//serebii.net/sunmoon/pokemon/${number}.png`
  }

  get pokemonList() {
    return this.pokeApiService.pokeList.filter(pokemon => {
      return pokemon.name.indexOf(this.nameFilter) !== -1
    })
  }

  selectPokemon(pkm) {
    this.selectedPkm = pkm;
  }

}
