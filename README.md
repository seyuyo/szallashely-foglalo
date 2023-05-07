# szallashely-foglalo

Üdv, ez a projekt az Szegedi Tudományegyetem, Webfejlesztési keretrendszerek kurzusra készült.


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

Így már működnie kéne.
