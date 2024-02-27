import React, { memo, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createAxios } from '../axiosJWT';
import { Active, path } from '../utils';

function PrivateRouter({categoryType=null, active=null, Component}) {
    const [isAdmin, setIsAdmin] = useState(null)
    const [actives, setActives] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')
                const axiosJWT = createAxios()
                const res = await axiosJWT.post('/api/authentication', {accessToken});
                setIsAdmin(res?.isAdmin)
            } catch (error) {
                console.error('Error fetching data:', error);
                console.error(':');
                navigate('/')
            }
        };
        fetchData()
        setIsAdmin()
    }, [])

    useEffect(() => {
        if (active === Active.SHOSE) {
            setActives({
                active: active,
                pathToHome: path.MANAGE_PRODUCTS_SHOES,
                pathToCreate: path.MANAGE_PRODUCTS_SHOES_CREATE, 
                pathToBack: path.MANAGE_PRODUCTS_SHOES,
                pathToEdit: path.MANAGE_PRODUCTS_SHOES_EDIT,
                pathToDetail: path.MANAGE_PRODUCTS_SHOES_DETAIL,
                // pathToImage: path.MANAGE_PRODUCTS_SHOES_IMAGES
            })
        }
        else if (active === Active.BAG_BALO) {
            setActives({
                active: active,
                pathToHome: path.MANAGE_PRODUCTS_BAG_BALO,
                pathToCreate: path.MANAGE_PRODUCTS_BAG_BALO_CREATE,
                pathToBack: path.MANAGE_PRODUCTS_BAG_BALO,
                pathToEdit: path.MANAGE_PRODUCTS_BAG_BALO_EDIT,
                pathToDetail: path.MANAGE_PRODUCTS_BAG_BALO_DETAIL,
                // pathToImage: path.MANAGE_PRODUCTS_BAG_BALO_IMAGES
            })
        }
        else if (active === Active.HAT) {
            setActives({
                active: active,
                pathToHome: path.MANAGE_PRODUCTS_HAT,
                pathToCreate: path.MANAGE_PRODUCTS_HAT_CREATE,
                pathToBack: path.MANAGE_PRODUCTS_HAT,
                pathToEdit: path.MANAGE_PRODUCTS_HAT_EDIT,
                pathToDetail: path.MANAGE_PRODUCTS_HAT_DETAIL,
                // pathToImage: path.MANAGE_PRODUCTS_HAT_IMAGES
            })
        }
        else if (active === Active.CLOTHES) {
            setActives({
                active: active,
                pathToHome: path.MANAGE_PRODUCTS_CLOTHES,
                pathToCreate: path.MANAGE_PRODUCTS_CLOTHES_CREATE,
                pathToBack: path.MANAGE_PRODUCTS_CLOTHES,
                pathToEdit: path.MANAGE_PRODUCTS_CLOTHES_EDIT,
                pathToDetail: path.MANAGE_PRODUCTS_CLOTHES_DETAIL,
                // pathToImage: path.MANAGE_PRODUCTS_CLOTHES_IMAGES
            })
        }
        else {
            setActives({
                active: active
            })
        }
    }, [active])
    
    if (isAdmin) {
        return ( 
            isAdmin === 1 ? <Component actives={actives} categoryType={categoryType}/> : <Navigate to='/' />
        );
    }
    return (
        <>Loading.....</>
    )
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(PrivateRouter));
