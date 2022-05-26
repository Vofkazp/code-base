export interface Menu {
  id: number;
  title: string;
  moduleName: string;
  sort: string;
  submenu: subMenu[];
}

export interface subMenu {
  id: number;
  title: string;
  moduleName: string;
}

export interface category {
  id: number;
  title: string;
  moduleName: string;
  sort: string;
}
