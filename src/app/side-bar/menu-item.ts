import {Menu} from "../interfases/menu";

export const ITEMS: Menu[] = [
  {
    title: 'Директивы',
    moduleName: 'directives',
    icon: 'integration_instructions',
    submenu: [
      {
        path: 'directives/max-string-length',
        title: 'Максимальная длина',
        description: "Максимальная длина строки с добавлением кнопки больше/меньше",
        moduleName: 'max-string-length'
      },
      {
        path: 'directives/moreButn',
        title: 'Кнопка дальше',
        description: "Кнопка дальше",
        moduleName: 'moreButn'
      },
    ]
  },
]
