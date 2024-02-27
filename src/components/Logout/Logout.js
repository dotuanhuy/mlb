import React, {memo, useEffect} from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils';
import * as actions from '../../store/actions'

function Logout({refreshStoreProduct, refreshStoreUser}) {
    const navigate = useNavigate()
    useEffect(() => {
        refreshStoreProduct()
        refreshStoreUser()
        navigate(path.LOGIN)
    }, [])
    
    return (
        <></>
    )
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshStoreProduct: () => dispatch(actions.refreshStoreProduct()),
        refreshStoreUser: () => dispatch(actions.refreshStoreUser())
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Logout));
