import React from 'react';
import './Loading.scss'
import { RotatingTriangles } from 'react-loader-spinner'

function Loading() {

    return (
        <div className='loading w-100 h-100 d-flex justify-content-center align-items-center'>
            <RotatingTriangles
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="rotating-triangles-loading"
            />
        </div>
    );
}


export default Loading;
