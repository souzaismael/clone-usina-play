import { Component, OnInit } from '@angular/core';
import { FirebaseMockService } from '../core/services/firebase-fake-mock.service';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../core/models/user.model';
import { AngularFireAuthMock } from '../core/services/auth.service';
import { Modality } from '../core/models/modality.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  user$: Observable<User> | undefined;
  modalities$!: Observable<Modality[]>

  constructor(
    private firebaseMock: FirebaseMockService,
    private ofAuth: AngularFireAuthMock
  ) {}

  ngOnInit() {
    this.modalities$ = this.ofAuth.authState$.pipe(
      switchMap((userAuthenticated) => {
        this.user$ = this.firebaseMock.get(`users/${userAuthenticated.uid}`);

        return this.firebaseMock.getCollection('modalities').pipe(
          switchMap((modalities) =>
            this.firebaseMock.getUserWorkouts(userAuthenticated.uid).pipe(
              map((workouts) => {
                console.log(workouts);
                const teste =  modalities.map(modality => {
                  const workout = workouts.find(w => w.modalityId === modality.id);
                  return {
                    ...modality,
                    started: workout ? true : false
                  };
                });

                console.log(teste)

                return teste;
              })
            )
          )
        )
      })
    );
  }
}
