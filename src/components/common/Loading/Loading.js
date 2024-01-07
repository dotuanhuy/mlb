import React, { useEffect, useState } from 'react';
import './Loading.scss'
import { RotatingTriangles } from 'react-loader-spinner'

function Loading() {
    
    return (    
        <div className='loading'>
            <RotatingTriangles
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="rotating-triangles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}


export default Loading;
