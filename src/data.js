let id = 0;
let NodeJSON = [
  {
    id: id++,
    active: true,
    completed: false,
    childrenID: [1, 2, 3],
    parentID: null,
  },
  {
    id: id++,
    active: false,
    completed: false,
    childrenID: [2],
    parentID: [0],
  },
  {
    id: id++,
    active: false,
    completed: false,
    childrenID: [],
    parentID: [0, 1],
  },
  {
    id: id++,
    active: false,
    completed: false,
    childrenID: [],
    parentID: [0],
  },
];

export default NodeJSON;