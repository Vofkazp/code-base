import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {AddCategoryComponent} from "./add-category/add-category.component";
import {AddPostComponent} from "./add-post/add-post.component";

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'add-category', component: AddCategoryComponent},
  { path: 'add-post', component: AddPostComponent},
  { path: 'edit-post/:id', component: AddPostComponent},
  { path: '**', component:  HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
