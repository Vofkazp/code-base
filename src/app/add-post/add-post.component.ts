import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Code} from "../interfases/code";
import {CategoryService} from "../services/category.service";
import {category} from "../interfases/menu";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  form!: FormGroup;
  title = 'Создать новый пост';
  title2 = 'Кодовая база | Создать пост';
  visibleCode = false;
  id!: number;
  category: category[] | undefined = [];
  postItem: Code | undefined;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: ActivatedRoute,
    private routs: Router,
    private categoryService: CategoryService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.title2);
  }

  get codeBlockControl(): FormArray {
    return this.form.get('codeBlock') as FormArray;
  }

  ngOnInit(): void {
    this.loadData();
    this.initForm();
    this.id = this.router.snapshot.params['id'];
    if(this.id) {
      this.title = 'Редактировать пост';
      this.title2 = 'Кодовая база | Редактировать пост';
      this.titleService.setTitle(this.title2);
      this.postService.getPostById(this.id).then(res=>{
        this.form.patchValue(res as Code);
        this.postItem = res;
        this.setCodItems();
      })
    } else {
      this.addBlock();
    }
  }

  loadData() {
    this.categoryService.getCategoryList().then(result=>{
      this.category = result;
    })
  }

  initForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      moduleName: ['', Validators.required],
      categoryId: ['', Validators.required],
      codeBlock: this.fb.array([])
    });
  }

  setCodItems() {
    if(this.postItem!.codeBlock.length !== 0) {
      this.postItem!.codeBlock.forEach(item=>{
        this.codeBlockControl.push(this.addCodeSection(item));
      });
    }
  }

  addCodeSection(item: any) {
    return this.fb.group({
      id: item.id,
      title: [item.title, Validators.required],
      code: [item.code, Validators.required],
      isDeleted: false
    })
  }

  addSection() {
    return this.fb.group({
      id: null,
      title: ['', Validators.required],
      code: ['', Validators.required],
      isDeleted: false
    })
  }

  addBlock() {
    this.codeBlockControl.push(this.addSection());
  }

  deleteSection(i: number) {
    this.codeBlockControl.value[i].isDeleted = true;
  }

  save() {
    if (this.form.valid) {
      if(this.id) {
        this.postService.updatePost(this.id, this.form.value).then((res) => {
          this.routs.navigate([`/`]);
        });
      } else {
        this.postService.createPost(this.form.value).then(() => {
          this.routs.navigate([`/`]);
        });
      }
    }
  }
}
