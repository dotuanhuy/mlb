import React, {memo} from 'react'
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils';

function Logout() {
    const navigate = useNavigate()
    navigate(path.LOGIN)
    
    return (
        <></>
    )
}

export default memo(Logout);
