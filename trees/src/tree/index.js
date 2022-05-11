import React, { useState } from 'react';
import './index.css'

import originalTreeData from "./data.json";

export default function Tree() {

    const dataDeepCopy = JSON.parse(JSON.stringify(originalTreeData));

    const [treeData, setTreeData] = useState(dataDeepCopy);

    const findNestedNode = (nodes, nodeName) => {
        // For loop can be replaced by something like reduce but I wanted to keep each step legible
        for (let index = 0; index < nodes.length; index++) {
            const node = nodes[index];
            if (node.name.includes(nodeName)) {
              return node;
            } else {
              if (node.sub?.length) {
                const found = findNestedNode(node.sub, nodeName);
        
                if (found) {
                  return found;
                }
              }
            }
        }
    };

    const addNode = (e, node) => {
        const newValue = e.target.value;
        const newTreeData = { ...treeData };
        let found = false;

        // Used to prepend appropriate spacing to text
        const newName = `${' '.repeat((node.name.split(' ').length - 1) + 5)}${newValue}`;

        if(newTreeData.name === node.name) {
            newTreeData.sub.push({
                name: newName,
                parent: node.name,
                sub: []
            })

            found = true;
        }

        if(!found) {
            const nestedNode = findNestedNode(newTreeData['sub'], node.name, 'sub');

            nestedNode.sub.push({
                name: newName,
                parent: node.name,
                sub: []
            })
        }

        setTreeData(newTreeData);
    }

    // Renders Data in a Tree List
    const RenderTree = ({data}) => {
        return (
            <div>
                <div className="nodeName">{data.name}</div>
                <input
                    className="nodeInput"
                    type="input" 
                    placeholder="Enter Animal Name" 
                    onKeyUp={(e) => 
                        e.key === "Enter" && 
                        e.target.value !== '' && 
                        addNode(e, data)} 
                /> 
                <br />
                {/* Using recursion to iterate through and render child nodes */}
                {
                    data.sub && data.sub.map(child => {
                        return (
                            // Calls parent function to render child node
                            // Math.floor is used with a combination of parameters to create as unique a key as possible without use of a third party library
                            <div key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}>
                                <RenderTree data={child} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className="tree">
            {
                <>
                    <RenderTree data={treeData} />
                </>
            }
        </div>
    )
}