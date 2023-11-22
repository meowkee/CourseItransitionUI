import { makeAutoObservable } from "mobx";

export default class ThemeStore {
    constructor() {
        this._themes = [];
        makeAutoObservable(this);
    }

    setThemes(themes) {
        this._themes = themes;
    }

    get themes() {
        return this._themes;
    }
}