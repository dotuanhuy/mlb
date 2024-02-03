import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { Buffer } from 'buffer';
import CommonUtils from '../../../utils/CommonUtils';
import Loading from '../../common/Loading/Loading';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebars/Sidebar';
import { Modal } from 'react-bootstrap';
import { faImage, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ProductManageImage({
    images,
    accessToken,
    product,
    addImageProductRedux,
    changeImageProductByIdRedux,
    deleteImageProductRedux,
    refreshIsLoadingImagesRedux
}) {
    const [params] = useSearchParams()
    const [show, setShow] = useState(false);
    const [imageMain, setImageMain] = useState()
    const [listImageItems, setListImageItems] = useState([])
    const [listImageItemDeleted, setListImageItemDeleted] = useState([])
    const [isChangeImageMain, setIsCheckImageMain] = useState(false)

    useEffect(() => {
        setImageMain(product?.image?.data ? Buffer.from(product?.image?.data, 'base64').toString('binary') : '')
        setImageMain(product?.image?.data ? Buffer.from(product?.image?.data, 'base64').toString('binary') : '')
        if (images.length > 0) {
            setListImageItems(images.map(item => Buffer.from(item.image.data, 'base64').toString('binary')))
        }
    }, [images])


    const handleClose = () => {
        setShow(false)
        setImageMain(product?.image?.data ? Buffer.from(product?.image?.data, 'base64').toString('binary') : '')
        if (images.length > 0) {
            setListImageItems(images.map(item => Buffer.from(item.image.data, 'base64').toString('binary')))
        }
        else {
            setListImageItems([])
        }
        setListImageItemDeleted([])
    }
    const handleShow = () => setShow(true);

    const handleOnchangeImageMain = async (e) => {
        setIsCheckImageMain(true)
        let files = e.target.files
        let file = files[0]
        if (file) {
            //convert file to base64
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            if (Buffer.from(product?.image?.data, 'base64').toString('binary') !== base64) {
                setIsCheckImageMain(true)            
            }
            else {
                setIsCheckImageMain(false)
            }
            setImageMain(base64)
        }
    }

    const handleOnchangeImageItem = async (e) => {
        let files = e.target.files
        let file = files[0]
        if (file) {
            //convert file to base64
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            let arrImage = [...listImageItems]
            arrImage.push(base64)
            setListImageItems(arrImage)
        }
    }

    const handleDeleteImageItem = (image) => {
        let arr = listImageItems.filter(item => item !== image)
        setListImageItems(arr)
        if (images.some(item => Buffer.from(item.image.data, 'base64').toString('binary') === image) && !listImageItemDeleted?.some(item => item === image)) {
            setListImageItemDeleted([...listImageItemDeleted, image])
        }
    }

    const handleSaveImage = () => {
        if (isChangeImageMain) {
            changeImageProductByIdRedux({ id: product?.id, image: imageMain }, accessToken)
        }
        if (listImageItemDeleted.length > 0) {
            deleteImageProductRedux({ listImagesDeleted: listImageItemDeleted, productId: product?.id }, accessToken)
        }
        addImageProductRedux({ listImages: listImageItems, listImagesDeleted: listImageItemDeleted, productId: product.id }, accessToken)
        setShow(false)
    }

    return (
        <>
            <button 
                className='btn btn-root-2 fw-500 me-2' 
                variant="primary" 
                onClick={handleShow}
            >
                <FontAwesomeIcon className='pe-1' icon={faImage} />
                Change image
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                // centered
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Manage images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=''>
                        <div className='col-3 mt-1 mb-2'>
                            <label className='form-label fw-bold' htmlFor='addimagemain'>Choose image main:</label>
                            <input 
                                type='file' 
                                className='form-control' 
                                id='addimagemain'
                                onChange={(e) => { handleOnchangeImageMain(e) }}
                            />
                        </div>
                        {
                            product?.image && 
                                <div 
                                    style={{ 
                                        width: '100%', 
                                        height: '250px',
                                        backgroundImage: `url(${imageMain})`,
                                        backgroundPosition: '0% 0%',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                            ></div>
                        }
                    </div>
                    <hr/>
                    <div className='mt-2'>
                        <div className='col-3'>
                            <label className='form-label fw-bold' htmlFor='addImageItems'>Choose image items:</label>
                            <input 
                                type='file' 
                                className='form-control' 
                                id='addImageItems'
                                onChange={(e) => { handleOnchangeImageItem(e) }}
                            />
                        </div>
                        <div className='mt-3 row gap-4 justify-content-center'>
                            {
                                listImageItems && listImageItems.length > 0 && 
                                listImageItems.map((item, index) => {
                                    return (
                                        <div className='col-2' key={index}>
                                            <button 
                                                className='delete-image-item btn float-end'
                                                onClick={() => handleDeleteImageItem(item)}
                                            >
                                                <FontAwesomeIcon className='fs-5' icon={faRectangleXmark} />
                                            </button>
                                            <div
                                                className='border rounded'
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
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-root fw-500' variant="secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button 
                        className='btn btn-root-2 fw-500' 
                        variant="primary"
                        onClick={handleSaveImage}
                    >
                        Save
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapStateToProps = state => {
    return {
        images: state.image.images,
        accessToken: state.auth.token,
        isLoading: state.image.isLoadingImage,
        product: state.product.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshIsLoadingImagesRedux: () => dispatch(actions.refreshIsLoadingImages()),
        addImageProductRedux: (data, accessToken) => dispatch(actions.addImageProduct(data, accessToken)),
        changeImageProductByIdRedux: (data, accessToken) => dispatch(actions.changeImageProductById(data, accessToken)),
        deleteImageProductRedux: (data, accessToken) => dispatch(actions.deleteImageProduct(data, accessToken)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductManageImage);
