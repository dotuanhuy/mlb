import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './AddImageProduct.scss'
import { useLocation, useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import * as actions from '../../../store/actions'
import {Buffer} from 'buffer';
import CommonUtils from '../../../utils/CommonUtils';
import Loading from '../../common/Loading/Loading';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebars/Sidebar';


function AddImageProduct({
    actives,
    images, 
    accessToken, 
    isLoading,
    getAllImagesByProductIdRedux, 
    addImageProductRedux, 
    deleteImageProductRedux,
    refreshIsLoadingImagesRedux
}) {
    const navigate = useNavigate()
    const [imageMain, setImageMain] = useState()
    const [listImage, setListImage] = useState([])
    const { state } = useLocation()
    const [params] = useSearchParams()

    useEffect(() => {
        refreshIsLoadingImagesRedux()
        // if (images && images.lenth > 0) {

        //     let imageBase64 = Buffer.from(state.product.image, 'base64').toString('binary')
        //     setImageMain(imageBase64)
        // }
        getAllImagesByProductIdRedux(params.get('id'), accessToken)
    }, [])

    // useEffect(() => {
    //     setListImage([])
    // }, [images])

    // const handleOnchangeImage = async (e) => {
    //     let files = e.target.files
    //     let file = files[0]
    //     if (file) {
    //         //convert file to base64
    //         let base64 = await CommonUtils.getBase64(file)
    //         let objectUrl = URL.createObjectURL(file)
    //         let arrImage = [...listImage]
    //         arrImage.push(base64)
    //         setListImage(arrImage)
    //     }
    // }

    // const handleSaveImage = () => {
    //     let data = {
    //         image: listImage,
    //         productId: state.product.id
    //     }
    //     addImageProductRedux(data, accessToken)
    //     setListImage([])
    //     navigate({
    //         pathname: state.path,
    //         search: createSearchParams({
    //             page: state.pageCurrent
    //         }).toString(),
    //     })
    // }

    // const handleDeleteImage = (id) => {
    //     deleteImageProductRedux(id, state.product.id, accessToken)
    // }

    // const handleDeleteImageClient = (item) => {
    //     let arr = listImage.filter(image => image !== item)
    //     setListImage(arr)
    // }

    return (    
        <>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar active={'product'} activeChild={actives?.active}/>
                </div> 
                {
                    isLoading ?
                    <Loading />
                    :
                    <div className='col-10 image-product-list container bg-light mt-4 px-5 py-3 rounded'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h2>Images</h2>
                        </div>
                        <hr/>
                        <div className='box-input col-2 my-4'>
                            <label className='form-label fw-bold' htmlFor='addimage'>Image main</label>
                            <input 
                                type='file' 
                                className='form-control' 
                                id='addimage'
                                // onChange={(e) => { handleOnchangeImage(e) }}
                            />
                        </div>
                        <div className='shadow-lg'>
                            <div className='row'>
                                {/* <div className='image-product-main col-2'>
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
                                </div> */}
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
                                                    // onClick={() => handleDeleteImage(item.id)}
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
                                {/* {
                                    listImage && listImage.length > 0 && 
                                    listImage.map((item, index) => {
                                        return (
                                            <div className='col-2' key={index}>
                                                <div 
                                                    className='delete-image-item'
                                                    onClick={() => handleDeleteImageClient(item)}
                                                >
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
                                } */}
                            </div>  
                        </div>
                        <button 
                            className='btn btn-success my-4 btn-add-image'
                            // onClick={() => handleSaveImage()}
                        >
                            Save
                        </button>
                    </div>                
                }
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        images: state.image.images,
        accessToken: state.auth.token,
        isLoading: state.image.isLoadingImage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshIsLoadingImagesRedux: () => dispatch(actions.refreshIsLoadingImages()),
        getAllImagesByProductIdRedux: (id, accessToken) => dispatch(actions.getAllImagesByProductId(id, accessToken)),
        addImageProductRedux: (data, accessToken) => dispatch(actions.addImageProduct(data, accessToken)),
        // deleteImageProductRedux: (id, type, accessToken) => dispatch(actions.deleteImageProduct(id, type, accessToken)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddImageProduct);
