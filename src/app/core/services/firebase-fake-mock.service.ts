import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseMockService {
  private db: { [collection: string]: { [id: string]: any } } = {
    users: {
      '7a0a1910-162e-45a5-9df0-ee91d1160621': {
        id: '7a0a1910-162e-45a5-9df0-ee91d1160621',
        name: 'Ismael Souza',
        level: 'Roxo',
        avatar: 'assets/user-avatar/7a0a1910-162e-45a5-9df0-ee91d1160621.jpg',
      },
    },
    modalities: {
      '80da6c63-8164-49be-a611-0bcdaa11036a': {
        id: '80da6c63-8164-49be-a611-0bcdaa11036a',
        title: 'Levantamento de Peso',
        image: 'assets/images/weightlifting.jpg',
      },
      '9a7563dd-8a64-4746-89fa-a0df70ec422b': {
        id: '9a7563dd-8a64-4746-89fa-a0df70ec422b',
        title: 'Yoga Expression',
        image: 'assets/images/yoga.jpg',
      },
      '3b220d26-d6a6-412c-bc57-d6d5222932bb': {
        id: '3b220d26-d6a6-412c-bc57-d6d5222932bb',
        title: 'Pilates',
        image: 'assets/images/pilates.jpg',
      },
    },
    workouts: {
      '9b8a3004-0953-4a0f-8f2f-ca23278ca04f': {
        id: '9b8a3004-0953-4a0f-8f2f-ca23278ca04f',
        userId: '7a0a1910-162e-45a5-9df0-ee91d1160621',
        modalityId: '80da6c63-8164-49be-a611-0bcdaa11036a',
      },
      '35187664-b105-45bc-a7cd-5a267d8952fe': {
        id: '35187664-b105-45bc-a7cd-5a267d8952fe',
        userId: '7a0a1910-162e-45a5-9df0-ee91d1160621',
        modalityId: '9a7563dd-8a64-4746-89fa-a0df70ec422b',
      }
    }
  };
  private dbSubject: BehaviorSubject<any> = new BehaviorSubject(this.db);

  constructor() {}

  private parsePath(path: string): { collection: string; id: string } {
    const parts = path.split('/');
    return { collection: parts[0], id: parts[1] };
  }

  set(path: string, data: any): void {
    const parsed = this.parsePath(path);

    const { collection, id } = parsed;

    this.db[collection][id] = data;

    this.dbSubject.next(this.db);
  }

  get(path: string): Observable<any> {
    const parsed = this.parsePath(path);

    const { collection, id } = parsed;

    return new Observable((observer) => {
      observer.next(this.db[collection][id]);
    });
  }

  update(path: string, data: any): void {
    const parsed = this.parsePath(path);

    const { collection, id } = parsed;

    if (this.db[collection][id]) {
      this.db[collection][id] = data;
      this.dbSubject.next(this.db);
    }
  }

  remove(path: string): void {
    const parsed = this.parsePath(path);

    const { collection, id } = parsed;

    delete this.db[collection][id];
    this.dbSubject.next(this.db);
  }

  getAll(): Observable<any> {
    return this.dbSubject.asObservable();
  }

  getCollection(collection: string): Observable<any[]> {
    const items = Object.values(this.db[collection] || {});
    return of(items);
  }

  getUserWorkouts(userId: string): Observable<any[]> {
    const workouts = Object.values(this.db['workouts'] || {}).filter(workout => workout.userId === userId);
    return of(workouts);
  }
}
