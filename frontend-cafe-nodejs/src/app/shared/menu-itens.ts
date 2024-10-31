import { Injectable } from "@angular/core";

export interface Menu {
    state:string;
    name:string;
    icon:string;
    role:string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
    { state: 'category', name: 'Categorias', icon: 'category', role: 'admin' },
    { state: 'product', name: 'Produtos', icon: 'inventory_2', role: 'admin' },
    { state: 'order', name: 'Ordens', icon: 'list_alt', role: '' }
];

@Injectable({
    providedIn: 'root'
}) export class MenuItens {
    getMenuItem(): Menu[] {
        return MENUITEMS;
    }
}
