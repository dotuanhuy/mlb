import React, { memo, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { MutatingDots } from 'react-loader-spinner'
import axios from "../axios";
import {createAxios} from '../axiosJWT'
import Cookies from 'js-cookie';
import { Active, path } from '../utils';

function PrivateRouter({categoryType=null, active=null, users, isLogin, accessToken, Component}) {
    const [isAdmin, setIsAdmin] = useState(null)
    const [actives, setActives] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post('/api/authentication', { accessToken });
                setIsAdmin(res?.isAdmin)
            } catch (error) {
                console.error('Error fetching data:', error);
                console.error(':');
                navigate('/')
            }
        };
        fetchData()
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
                pathToImage: path.MANAGE_PRODUCTS_SHOES_IMAGES
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
                pathToImage: path.MANAGE_PRODUCTS_BAG_BALO_IMAGES
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
                pathToImage: path.MANAGE_PRODUCTS_HAT_IMAGES
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
                pathToImage: path.MANAGE_PRODUCTS_CLOTHES_IMAGES
            })
        }
        else {
            setActives({
                active: active
            })
        }
    }, [active])

    if (isAdmin !== null) {
        return ( 
            isAdmin ? <Component actives={actives} categoryType={categoryType}/> : <Navigate to='/' />
        );
    }
    return (
        <>Loading.....</>
    )
}

const mapStateToProps = state => {
    return {
        users: state.auth.users,
        isLogin: state.auth.isLogin,
        accessToken: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(PrivateRouter));
