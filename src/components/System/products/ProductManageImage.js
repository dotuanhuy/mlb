import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import CommonUtils from '../../../utils/CommonUtils';
import { Form, Modal } from 'react-bootstrap';
import { faBookmark, faImage, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { MAX_LENGTH_IMAGE } from '../../../utils';
import { toast } from 'react-toastify';

const CustomToast = (message) => (
    <span className='fw-light' style={{ fontSize: 14, fontFamily:'serif' }}>
        {message}
    </span>
)

function ProductManageImage() {
    const dispatch = useDispatch()
    const {images, isLoadingImage, infoResponse} = useSelector(state => state.image)
    const {products} = useSelector(state => state.product)
    const [show, setShow] = useState(false);
    const [imageMain, setImageMain] = useState({url: '', value: ''})
    const [listImageItems, setListImageItems] = useState([])
    const [listImageItemDeleted, setListImageItemDeleted] = useState([])
    const [listImageItemAdded, setListImageItemAdded] = useState([])

    useEffect(() => {
        if (products?.image) {
            setImageMain({
                ...imageMain,
                url: products?.image
            })
        }
        if (images.length > 0) {
            setListImageItems(images.map(item => {
                return {
                    url: item.image
                }
            }))
        }
    }, [images, products])

    useEffect(() => {
        if (infoResponse) {
            if (infoResponse.errCode === 0) {
                toast.success(CustomToast(infoResponse.errMessage), { autoClose: 3000 })
            }
            else {
                toast.error(CustomToast(infoResponse.errMessage), { autoClose: 3000 })
            }
            dispatch(actions.refreshErrorImage())
        }
    }, [infoResponse])

    const handleClose = () => {
        setShow(false)
        setListImageItemDeleted([])
        setListImageItemAdded([])
        setListImageItems([])
    }

    const handleShow = () => {
        setShow(true)
        if (images.length > 0) {
            setListImageItems(images.map(item => {
                return {
                    url: item.image
                }
            }))
        }
    };

    const handleOnchangeImageMain = async (e) => {
        setImageMain({
            url: URL.createObjectURL(e.target.files[0]),
            value: e.target.files[0]
        })
    }
    
    const handleSaveImageMain = (e) => {
        e.preventDefault()
        if (imageMain.value) {
            const formData = new FormData()
            formData.append('image', imageMain.value)
            dispatch(actions.changeImageProductById(products?.id, formData, 'single'))
            setShow(false)
        }
        else {
            toast.warn(CustomToast('Please select a photo!'), { autoClose: 3000 })
        }
    }
    
    const handleOnchangeImageItem = async (e) => {
        let base64 = await CommonUtils.getBase64(e.target.files[0])
        setListImageItemAdded([...listImageItemAdded, {
            url: URL.createObjectURL(e.target.files[0]),
            value: e.target.files[0],
            base64
        }])
        setListImageItems([...listImageItems, {
            url: URL.createObjectURL(e.target.files[0]),
            value: e.target.files[0],
            base64 
        }])
    }


    const handleDeleteImageItem = (image) => {
        let arr = listImageItems.filter(item => item?.url !== image.url)
        setListImageItems(arr)
        let arrAdded = listImageItemAdded.filter(item => item?.base64 !== image.base64)
        setListImageItemAdded(arrAdded)
        // !listImageItemDeleted?.some(item => item === image)
        const temp = images.find(item => item.image === image.url)
        if (temp) {
            setListImageItemDeleted([...listImageItemDeleted, { id: temp?.id, url: temp?.image}])
        }
    }

    const handleSaveImage = () => {
        if (listImageItems.length > MAX_LENGTH_IMAGE) {
            toast.warn(CustomToast('The number of photos has exceeded 12, please delete more photos!'), { autoClose: 3000 })
        }
        else if (listImageItemAdded.length === 0 && listImageItemDeleted.length === 0) {
            toast.warn(CustomToast('Please, choose image!'), { autoClose: 3000 })
        }
        else {
            if (listImageItemDeleted.length > 0) {
                const arrId = []
                const formData = new FormData()
                listImageItemDeleted.map(item => {
                    formData.append('image[]', item.url)
                    arrId.push(item.id)
                })
                formData.append('arrId', arrId)
                dispatch(actions.deleteImageProduct(formData, products?.id, 'multiple'))
            }
            if (listImageItemAdded.length > 0) {
                const formData = new FormData()
                listImageItemAdded.map(item => {
                    formData.append('image[]', item.value)
                })
                dispatch(actions.addImageProduct(formData, products?.id, 'multiple'))
            }
            handleClose()
        }
    }


    return (
        <>
            <button 
                className='btn btn-root-2 fw-500 me-2' 
                variant="primary" 
                onClick={handleShow}
            >
                <FontAwesomeIcon icon={faImage} /> Chỉnh sửa ảnh
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
                    <Modal.Title>Quản lý ảnh sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=''>
                        <div className='col-3 mt-1 mb-2'>
                            <label className='form-label fw-bold' htmlFor='image'>Chọn ảnh gốc:</label>
                            <Form onSubmit={(e) => handleSaveImageMain(e)}>
                                <Form.Control 
                                    type='file'
                                    id='image'
                                    name='image'
                                    onChange={(e) => { handleOnchangeImageMain(e) }}
                                />
                                {

                                    imageMain?.url && 
                                    <div 
                                        className='mt-1'
                                        style={{ 
                                            width: '100%', 
                                            height: '250px',
                                            // backgroundImage: `url(${imageMain})`,
                                            backgroundImage: `url(${imageMain?.url})`,
                                            backgroundPosition: '0% 0%',
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    ></div>
                                }
                                <button 
                                    className='btn btn-root fw-500 mt-2'
                                    type='submmit'
                                >
                                    <FontAwesomeIcon icon={faBookmark} /> Lưu
                                </button>
                            </Form>
                        </div>
                        
                    </div>
                    <hr/>
                    <div className='mt-2'>
                        <div className='col-3'>
                            <label className='form-label fw-bold' htmlFor='addImageItems'>Chọn ảnh con:</label>
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
                                                    backgroundImage: `url(${item.url})`,
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
                        <button 
                            className='btn btn-root fw-500 mt-2' 
                            variant="primary"
                            onClick={handleSaveImage}
                        >
                            <FontAwesomeIcon icon={faBookmark} /> Lưu
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-root-2 fw-500' variant="secondary" onClick={handleClose}>
                        Đóng
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductManageImage);
