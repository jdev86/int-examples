import React from 'react';
import './index.css'

import data from "./data.json";

export default function Tree() {
    // Renders Data in a Tree List
    const TreeData = ({data}) => {
        return (
            <>
                <span>{data.name}</span> <br/>
                {/* Using recursion to iterate through and render child nodes */}
                {
                    data.sub && data.sub.map(child => {
                        return (
                            // Calls parent function to render child node
                            <div key={child.name}>
                                <TreeData data={child} />
                            </div>
                        )
                    })
                }
            </>
        )
    }

    return (
        <div className="tree">
            {
                <TreeData data={data} />
            }
        </div>
    )
}