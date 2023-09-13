import React, { useEffect, useState } from 'react';
import './Loading.scss'
import { MutatingDots } from 'react-loader-spinner'

function Loading() {
    
    return (    
        <div className='loading'>
            <MutatingDots 
                height="100"
                width="100"
                color="#4fa94d"
                secondaryColor= '#4fa94d'
                radius='12.5'
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            <span>Loading...</span>
        </div>
    );
}


export default Loading;
