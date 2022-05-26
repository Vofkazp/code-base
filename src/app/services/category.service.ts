import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {category, Menu} from "../interfases/menu";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCategoryList() {
    return this.httpClient.get<category[]>(`${environment.apiUrl}/category/list`).toPromise();
  }

  getMenuList() {
    return this.httpClient.get<Menu[]>(`${environment.apiUrl}/category/menuList`).toPromise();
  }

  addCategory(category: category) {
    return this.httpClient.post(`${environment.apiUrl}/category/create`, category).toPromise();
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/category/delete/${id}`).toPromise();
  }

  getCategoryById(id: number) {
    return this.httpClient.get<category>(`${environment.apiUrl}/category/get/${id}`).toPromise();
  }

  editCategoryById(id: number, category: category) {
    return this.httpClient.put<category>(`${environment.apiUrl}/category/edit/${id}`, category).toPromise();
  }

  sortCategory(data: any) {
    return this.httpClient.put<category>(`${environment.apiUrl}/category/sort`, data).toPromise();
  }
}
