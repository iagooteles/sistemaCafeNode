import { Injectable } from "@angular/core";

export interface Menu {
    state:string;
    name:string;
    icon:string;
    role:string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' }
];

@Injectable({
    providedIn: 'root'
}) export class MenuItens {
    getMenuItem(): Menu[] {
        return MENUITEMS;
    }
}
