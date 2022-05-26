import {Component, OnInit} from '@angular/core';
import {Code, CodeBlock} from "../interfases/code";
import {CategoryService} from "../services/category.service";
import {Menu, subMenu} from "../interfases/menu";
import {PostService} from "../services/post.service";
import {Router} from "@angular/router";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  menuItem: Menu[] | undefined = [];
  level1Menu = '';
  level2Menu = '';
  loading = false;
  codeId: number | null = null;
  data: Code | undefined;
  title = 'Кодовая база';

  constructor(
    private category: CategoryService,
    private postService: PostService,
    private router: Router,
    public dialog: MatDialog,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.loadData();
    if (this.codeId) {
      this.loadCode();
    }
  }

  loadCode() {
    this.loading = true;
    this.postService.getPostById(this.codeId!).then(response => {
      this.data = response as Code;
      this.title = 'Кодовая база | ' + response?.title;
      this.titleService.setTitle(this.title);
      this.loading = false;
    })
  }

  loadData() {
    this.category.getMenuList().then(res => {
      this.menuItem = res;
    })
  }

  setLevelMenu1(moduleName: string) {
    this.level1Menu = moduleName;
  }

  setLevelMenu2(sub: subMenu) {
    this.level2Menu = sub.moduleName;
    this.codeId = sub.id;
    this.loadCode();
  }

  editPost() {
    if (this.codeId !== null) {
      this.router.navigate([`edit-post/${this.codeId}`]);
    }
  }

  deletePost() {
    if (this.codeId !== null) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          this.postService.deletePost(this.codeId!).then(() => {
            this.codeId = null;
            this.loadData();
            this.data = undefined;
            this.level2Menu = '';
            this.title = 'Кодовая база';
            this.titleService.setTitle(this.title);
          });
        }
      });
    }
  }

  homePage() {
    this.codeId = null;
    this.data = undefined;
    this.level1Menu = '';
    this.level2Menu = '';
    this.title = 'Кодовая база';
    this.titleService.setTitle(this.title);
  }

  copyContent(code: string) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(code);
    } else {
      let textArea = document.createElement("textarea");
      textArea.value = code;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        document.execCommand('copy') ? res : rej();
        textArea.remove();
      });
    }
  }

  downloadFile(item: CodeBlock) {
    const blob = new Blob([item.code]);
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(blob)
    a.href = objectUrl
    a.download = item.title;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }
}
