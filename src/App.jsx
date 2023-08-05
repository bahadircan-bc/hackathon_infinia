import logo from "./logo.svg";
import "./App.css";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import { motio, useAnimate } from "framer-motion";

let id = 0;
let NodeJSON = [
  {
    id: id++,
    active: true,
    completed: false,
    childrenID: [1, 3, 4],
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
  {
    id: id++,
    active: false,
    completed: false,
    childrenID: [],
    parentID: [0],
  },
];

function Node(params) {
  const onClick = (e) => {
    if (!params.active) return;

    // console.log(NodeJSON[params.id]);
    NodeJSON[params.id].completed = !NodeJSON[params.id].completed;

    // NodeJSON[params.id].active = NodeJSON[params.id].parentID?.every((id) => {return NodeJSON[id].completed});
    NodeJSON.forEach((node) => {
      if (node.parentID === null) return;
      node.active = node.parentID?.every((id) => {
        return NodeJSON[id].completed;
      });
    });

    e.currentTarget.style.left = e.currentTarget.offsetLeft + 'px'
    e.currentTarget.style.top = e.currentTarget.offsetTop + 'px'

    console.log(e.currentTarget)
  };

  return (
    <div
      style={{ gridColumnStart: params.col, gridRowStart: params.row}}
      className={`${
        params.active
          ? params.completed
            ? "bg-green-500 absolute "
            : "bg-red-500"
          : "bg-gray-500"
      } w-10 aspect-square rounded-full flex justify-center items-center`}
      onClick={onClick}
    >
      {params.id}
    </div>
  );
}

function App() {
  // const startNode = React.useRef(null);
  const [nodes, setNodes] = React.useState([]);
  let nodesBuilt = [];
  let lastGridPos = [1, 1];
  const [rerender, setRerender] = React.useState(false);

  const buildNodes = (id, col, row) => {
    if (nodesBuilt.includes(id)) return;
    const node = NodeJSON.find((node) => node.id === id);
    const nodeObj = (
      <Node
        row={row}
        col={col}
        key={node.id}
        id={node.id}
        active={node.active}
        completed={node.completed}
      />
    );
    setNodes((nodes) => [...nodes, nodeObj]);
    nodesBuilt.push(id);
    // nodes.push(<Node row={lastGridPos[0]} col={lastGridPos[1]} key={node.id} id={node.id} active={node.active} completed={node.completed}/>);
    node.childrenID.forEach((id, index) => buildNodes(id, col + 1, index + 1));
  };

  useEffect(() => {
    setNodes([]);
    buildNodes(0, 1);
    // setNodes(NodeJSON.map((node) => {setLastGridPos([lastGridPos[0]+1, lastGridPos[1]+1]) ;return <Node row={lastGridPos[0]} col={lastGridPos[1]} key={node.id} id={node.id} active={node.active} completed={node.completed}/>}));
  }, [rerender]);

  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(scope.current, {
      width: "0",
      },
      {duration: 30, ease: "linear"})
  }, []);

  return (
    <div className="flex flex-row-reverse items-center w-screen h-screen">
      <div
      ref={scope}
        className="grid grid-cols-[repeat(3,_minmax(40px,1fr))] grid-rows-[repeat(3,1fr)] w-full h-full items-center min-w-min "
        onClick={() => setRerender(!rerender)}
      >
        {nodes}
      </div>
      <div className="left-0 h-full border-r-2 border-yellow-500 z-10"></div>
    </div>
  );
}

export default App;
