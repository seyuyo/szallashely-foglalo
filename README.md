# szallashely-foglalo

Üdv, ez a projekt az Szegedi Tudományegyetem, Webfejlesztési keretrendszerek kurzusra készült Szállás-foglaló webalkalmazás.

## Leírás

A **Szálláshely-foglaló** alkalmazás célja, hogy a felhasználók keresni tudjanak különböző szálláshelyeket (pl. szállodák, apartmanok) adott dátumokra, és foglalásokat készíthessenek. Emellett kezelhetővé teszi a felhasználói foglalásokat, szállás adatokat, és biztosít felhasználói élményt mobilfelületen.

## Funkciók

- Szálláshelyek listázása és keresése hely, dátum és egyéb kritériumok alapján  
- Szálláshely részletek megtekintése (ár, leírás, képek)  
- Foglalás létrehozása adott szállással  
- Felhasználói foglalások listázása, törlése vagy módosítása  
- Felhasználói bejelentkezés / regisztráció (ha van)  
- Admin felület (vagy admin funkciók) a szálláshelyek kezelésére (hozzáadás, módosítás, törlés)  
- Érvényesítés: dátumok, foglaltság ellenőrzése, bemeneti adatok validálása  

## Technológiák

| Komponens | Használt technológia |
|-----------|-------------------------|
| Nyelv | Java |
| Platform | Android |
| Build rendszer | Gradle |
| Backend / szolgáltatások | Firebase (vagy más felhőszolgáltatás) |
| Adatbázis | Firebase Realtime Database / Firestore / vagy helyi SQLite |
| Képek / média | Android képkezelés, képfeltöltés és letöltés (Firebase Storage, stb.) |
| Verziókezelés | Git / GitHub |

FONTOS, MINDENKÉPP OLVASD EL!

Amennyiben NPM install után futtattásnál hasonló hibát dob:

"error TS2430: Interface 'QueryDocumentSnapshot<T>' incorrectly extends interface 'QueryDocumentSnapshot<DocumentData>'."

és hasonlók akkor kattints az adott fájlra ha felajánlja (webstormban felajánlja), ha pedig nem akkor:
node_modules -> @angular -> fire -> compat -> firestore -> interface.d.ts
és az összes (általában 4) sor felé írj egy // @ts-ignore -t, (vagy websotormban katt az errorra és suppress with @ts-ignore), bemásolom hátha így könnyebb:

----------------------------------------------------------------------------------------------------------------------------------------

// @ts-ignore

export interface DocumentSnapshotExists<T> extends firebase.firestore.DocumentSnapshot {
    readonly exists: true;
    data(options?: SnapshotOptions): T;
}

export interface DocumentSnapshotDoesNotExist extends firebase.firestore.DocumentSnapshot {
    readonly exists: false;
    data(options?: SnapshotOptions): undefined;
    get(fieldPath: string | FieldPath, options?: SnapshotOptions): undefined;
}

export declare type DocumentSnapshot<T> = DocumentSnapshotExists<T> | DocumentSnapshotDoesNotExist;

// @ts-ignore

export interface QueryDocumentSnapshot<T> extends firebase.firestore.QueryDocumentSnapshot {
    data(options?: SnapshotOptions): T;
}

// @ts-ignore

export interface QuerySnapshot<T> extends firebase.firestore.QuerySnapshot {
    readonly docs: QueryDocumentSnapshot<T>[];
}

// @ts-ignore

export interface DocumentChange<T> extends firebase.firestore.DocumentChange {
    readonly doc: QueryDocumentSnapshot<T>;
}

--------------------------------------------------------------------------------------------------------------------------------------

Követelményeket hol találod:

- Adatmodell definiálása (legalább 4 TypeScript interfész vagy class formájában (ugyanennyi kollekció)):
  - src/app/shared/models

- attribútum és struktúrális direktívák, materialok:
  - bármelyik komponens html fájljában
  
- angular formok:
  - src/app/pages/login vagy sign-up komponensben
  
- CRUD műveletek:
  - src/app/shared/services fájlok
  
- pipe osztály:
  - src/app/pipes
  
- route és authguard:
  - src/app/app-routing.module.ts
  
- 2 kompley firestore lekérdezés:
  - egyik a bejelentkező oldalon, másik a reserve oldalon találod 
  
 A többi talán evidens
