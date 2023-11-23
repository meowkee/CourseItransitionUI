import { makeAutoObservable } from "mobx";

export default class ItemStore {
    constructor() {
        this._items = [];
        this._currentItem = {};
        this._search = "";
        makeAutoObservable(this);
    }

    setItems(items) {
        this._items = items;
    }

    setCurrentItem(item) {
        this._currentItem = item;
    }

    setSearch(search) {
        this._search = search;
    }

    get items() {
        return this._items;
    }

    get currentItem() {
        return this._currentItem;
    }
    
    get search() {
        return this._search;
    }
}
