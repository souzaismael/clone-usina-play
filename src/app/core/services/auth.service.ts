import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const fakeUser = { uid: '7a0a1910-162e-45a5-9df0-ee91d1160621' };

@Injectable({
  providedIn: 'root',
})
export class AngularFireAuthMock {
  private authState = new BehaviorSubject<typeof fakeUser>(fakeUser);

  constructor() {}

  get authState$(): Observable<any> {
    return this.authState.asObservable();
  }
}
