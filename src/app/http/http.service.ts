import { AuthService } from "./../authentication/authentication.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { CollectionService } from "./../../collection/collection.service";
import { Pokemon } from "../pokemon/pokemon.model";

@Injectable({
  providedIn: "root"
})
export class HTTPService {
  // . . .

  constructor(
    private http: HttpClient,
    private collectionService: CollectionService
  ) {}

  // . . .

  fetchMonsFromFirebase() {
    return this.http.get<Pokemon[]>(this.firebaseRootURL, {}).pipe(
      tap(pokemon => {
        this.collectionService.setPokemon(pokemon);
      })
    );
  }
}
