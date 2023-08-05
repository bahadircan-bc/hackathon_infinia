import logo from "./logo.svg";
import "./App.css";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

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

function Node(params) {

  const onClick = () => {
    if (!params.active) return;

    // console.log(NodeJSON[params.id]);
    NodeJSON[params.id].completed = !NodeJSON[params.id].completed;
    
    // NodeJSON[params.id].active = NodeJSON[params.id].parentID?.every((id) => {return NodeJSON[id].completed});
    NodeJSON.forEach((node) => {
      if (node.parentID === null) return;
      node.active = node.parentID?.every((id) => {return NodeJSON[id].completed});
    });
      
  };

  return (
    <div
      className={`${params.active ? (params.completed ? 'bg-green-500' : 'bg-red-500') : 'bg-gray-500'} w-10 aspect-square rounded-full`}
      onClick={onClick}
    >{params.id}</div>
  );
}

function App() {
  // const startNode = React.useRef(null);
  const [nodes, setNodes] = React.useState([]);
  const [rerender, setRerender] = React.useState(false);

  useEffect(() => {
    setNodes(NodeJSON.map((node) => <Node key={node.id} id={node.id} active={node.active} completed={node.completed}/>));
  }, [rerender]);

  return <div className="grid" onClick={()=>setRerender(!rerender)}>{nodes}</div>;
}

export default App;
