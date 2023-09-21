import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './AddImageProduct.scss'
import Nav from '../../../nav/nav'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { path, Role } from '../../../../../utils';
import * as actions from '../../../../../store/actions'
import {Buffer} from 'buffer';
import CommonUtils from '../../../../../utils/CommonUtils';
import Loading from '../../../../Loading/Loading';


function AddImageProduct({
    isLogin, 
    images, 
    accessToken, 
    isLoading,
    fetchAllImageProductRedux, 
    addImageProductRedux, 
    deleteImageProductRedux,
    refreshIsloadingStateProductRedux
}) {
    const navigate = useNavigate()
    const [imageMain, setImageMain] = useState()
    const [listImage, setListImage] = useState([])
    const { state } = useLocation()

    useEffect(() => {
        refreshIsloadingStateProductRedux()
        if (state.product.image) {
            let imageBase64 = Buffer.from(state.product.image, 'base64').toString('binary')
            setImageMain(imageBase64)
        }
        fetchAllImageProductRedux(state.product.id, accessToken)
    }, [])

    useEffect(() => {
        setListImage([])
    }, [images])

    const handleOnchangeImage = async (e) => {
        let files = e.target.files
        let file = files[0]
        if (file) {
            //convert file to base64
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            let arrImage = [...listImage]
            arrImage.push(base64)
            setListImage(arrImage)
        }
    }
    
    const handleSaveImage = () => {
        let data = {
            image: listImage,
            productId: state.product.id
        }
        addImageProductRedux(data, accessToken)
        setListImage([])
        navigate(state.path)
    }

    const handleDeleteImage = (id) => {
        deleteImageProductRedux(id, state.product.id, accessToken)
    }

    return (    
        <>
            {
                isLoading ?
                <Loading />
                :
                <div className='add-image-product'>
                    <div className='add-image-product-container'>
                        <Nav />
                        <div className='image-product-list'>
                            <div className='container '>
                                <div className='box-input col-2 my-4'>
                                    <label className='form-label fw-bold' htmlFor='addimage'>Add image</label>
                                    <input 
                                        type='file' 
                                        className='form-control' 
                                        id='addimage'
                                        onChange={(e) => { handleOnchangeImage(e) }}
                                    />
                                </div>
                                <div className='shadow-lg'>
                                    <div className='row'>
                                        <div className='image-product-main col-2'>
                                            <div
                                                style={{ 
                                                    width: '100%', 
                                                    height: '200px',
                                                    backgroundImage: `url(${imageMain})`,
                                                    backgroundPosition: '0% 0%',
                                                    backgroundSize: 'contain',
                                                    backgroundRepeat: 'no-repeat'
                                                }}
                                            >

                                            </div>
                                        </div>
                                        {
                                            images && images.length > 0 && 
                                            images.map((item, index) => {
                                                let imageBase64 = ''
                                                if (item.image) {
                                                    imageBase64 = Buffer.from(item.image.data, 'base64').toString('binary')
                                                }
                                                return (
                                                    <div className='col-2' key={index}>
                                                        <div 
                                                            className='delete-image-item'
                                                            onClick={() => handleDeleteImage(item.id)}
                                                        >
                                                            X
                                                        </div>
                                                        <div
                                                            style={{ 
                                                                width: '100%', 
                                                                height: '200px',
                                                                backgroundImage: `url(${imageBase64})`,
                                                                backgroundPosition: '0% 0%',
                                                                backgroundSize: 'contain',
                                                                backgroundRepeat: 'no-repeat'
                                                            }}
                                                        >
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        {
                                            listImage && listImage.length > 0 && 
                                            listImage.map((item, index) => {
                                                return (
                                                    <div className='col-2' key={index}>
                                                        <div className='delete-image-item'>
                                                            X
                                                        </div>
                                                        <div
                                                            style={{ 
                                                                width: '100%', 
                                                                height: '200px',
                                                                backgroundImage: `url(${item})`,
                                                                backgroundPosition: '0% 0%',
                                                                backgroundSize: 'contain',
                                                                backgroundRepeat: 'no-repeat'
                                                            }}
                                                        >
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>  
                                </div>
                                <button 
                                    className='btn btn-success my-4 btn-add-image'
                                    onClick={() => handleSaveImage()}
                                >
                                    Save
                                </button>
                            </div>
                        </div>                
                    </div>
                </div>
            }
        </>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin,
        images: state.product.images,
        accessToken: state.auth.token,
        isLoading: state.product.isLoadingProduct
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllImageProductRedux: (id, accessToken) => dispatch(actions.fetchAllImageProduct(id, accessToken)),
        addImageProductRedux: (data, accessToken) => dispatch(actions.addImageProduct(data, accessToken)),
        deleteImageProductRedux: (id, type, accessToken) => dispatch(actions.deleteImageProduct(id, type, accessToken)),
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddImageProduct);
