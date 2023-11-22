import { makeAutoObservable } from "mobx";

export default class CollectionStore {
    constructor() {
        this._collections = [];
        this._currentCollection = {};
        makeAutoObservable(this);
    }

    setCollections(collections) {
        this._collections = collections;
    }

    setCurrentCollection(collection) {
        this._currentCollection = collection;
    }

    get collections() {
        return this._collections;
    }

    get currentCollection(){
        return this._currentCollection;
    }
}