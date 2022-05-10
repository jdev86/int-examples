import React, {useState, useEffect} from 'react';
import './index.css'

export default function Tree() {
    return (
        <div className="tree">
            <span>mammals</span><br />
            <span>     cheetah</span><br />
            <span>     bear</span><br />
            <span>          lion</span><br />
            <span>          dog</span><br />
            <span>               elephant</span><br />
            <span>     ape</span><br />
        </div>
    )
}
