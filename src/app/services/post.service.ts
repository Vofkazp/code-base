import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Code} from "../interfases/code";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPostById(id: number) {
    return this.httpClient.get<Code>(`${environment.apiUrl}/posts/get/${id}`).toPromise();
  }

  createPost(post: Code) {
    return this.httpClient.post(`${environment.apiUrl}/posts/create`, post).toPromise();
  }

  updatePost(id:number, post: Code) {
    return this.httpClient.put(`${environment.apiUrl}/posts/update/${id}`, post).toPromise();
  }

  deletePost(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/posts/delete/${id}`).toPromise();
  }
}
