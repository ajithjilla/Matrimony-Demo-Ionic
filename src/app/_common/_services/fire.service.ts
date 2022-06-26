import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { convertSnaps } from "./db-utils";
import { map } from "rxjs/operators";
import { users } from "../../_common/_model/users"

@Injectable({
  providedIn: 'root'
})

export class FireService {

  constructor(private firestore: AngularFirestore) { }

  getProfiles(): Observable<users[]> {
    return this.firestore.collection("users").get()
      .pipe(map(results => {
        let courses: any = convertSnaps<users[]>(results);
        console.log(courses);
        return courses;
      })
      );
  }

  getProfilesByMid(mid: any): Observable<users | null> {
    return this.firestore.collection("users",
      ref => ref.where("mid", "==", mid)).get()
      .pipe(map(results => {
        const courses = convertSnaps<users>(results);
        return courses.length == 1 ? courses[0] : null;
      })
      );
  }
}

