export interface Menu {
  title: string;
  moduleName: string;
  icon: string;
  submenu: subMenu[];
}

export interface subMenu {
  path: string;
  title: string;
  description: string;
  moduleName: string;
}
