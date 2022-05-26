import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {category, Menu, subMenu} from "../interfases/menu";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  create = true;
  id: number | null = null;
  form!: FormGroup;
  category: Menu[] | undefined = [];
  title = 'Кодовая база | Категории';

  constructor(
    private Category: CategoryService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.form = this.fb.group({
      title: [''],
      moduleName: [''],
    })
    this.Category.getMenuList().then(res => {
      this.category = res;
    });
  }

  addCategory() {
    if (this.form.valid) {
      this.Category.addCategory(this.form.value).then((res) => {
        this.loadData();
      });
    }
  }

  deleteCategory(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.Category.deleteCategory(id).then(() => {
          this.loadData();
        });
      }
    });
  }

  getCategory(id: number) {
    this.Category.getCategoryById(id).then(res => {
      this.form.patchValue(res as category);
      this.create = false;
      this.id = id;
    });
  }

  editCategory() {
    if (this.form.valid) {
      this.Category.editCategoryById(this.id!, this.form.value).then(res => {
        this.loadData();
        this.create = true;
        this.id = null;
      });
    }
  }

  validator() {
    return this.form.value.title === '' || this.form.value.moduleName === '';
  }

  dropSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.category!, event.previousIndex, event.currentIndex);
    const data: any = {
      data: this.category!.map((e, i) => ({
        id: e.id,
        sort: ++i
      }))
    }
    this.Category.sortCategory(data).then((res) => {
      this.loadData();
    });
  }

  getTitle(submenu: subMenu[]) {
    return submenu.length !== 0 ? 'Нельзя удалить, так как к категории привязаны записи' : '';
  }
}
