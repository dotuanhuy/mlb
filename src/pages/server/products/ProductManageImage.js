import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import CommonUtils from '../../../utils/CommonUtils';
import { Form, Modal } from 'react-bootstrap';
import { faBookmark, faImage, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { CustomToast, MAX_LENGTH_IMAGE } from '../../../utils';
import { toast } from 'react-toastify';
import Loading from '../../../components/loading/Loading';

function ProductManageImage() {
    const dispatch = useDispatch()
    const { images } = useSelector(state => state.image)
    const messageImage = useSelector(state => state.image.message)
    const errCodeImage = useSelector(state => state.image.errCode)
    const { products, message, errCode } = useSelector(state => state.product)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [imageMain, setImageMain] = useState({ url: '', value: '' })
    const [listImageItems, setListImageItems] = useState([])
    const [listImageItemDeleted, setListImageItemDeleted] = useState([])
    const [listImageItemAdded, setListImageItemAdded] = useState([])
    const inputFileRootRef = useRef()
    const inputFileItemRef = useRef()

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
        if (messageImage) {
            if (errCodeImage === 0) {
                toast.success(CustomToast(messageImage), { autoClose: 2000 })
            }
            else {
                toast.error(CustomToast(messageImage), { autoClose: 2000 })
            }
            setIsLoading(false)
            dispatch(actions.refreshInfoResponseImage())
        }
    }, [messageImage])

    useEffect(() => {
        if (message) {
            if (errCode === 0) {
                toast.success(CustomToast(message), { autoClose: 2000 })
            }
            else {
                toast.error(CustomToast(message), { autoClose: 2000 })
            }
            setIsLoading(false)
            dispatch(actions.refreshInfoReponseProduct())
        }
    }, [message])

    const handleClose = () => {
        setShow(false)
        setIsLoading(false)
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

    const handleClick = () => {
        inputFileRootRef.current?.click()
    }

    const handleClickChooseImgItem = () => {
        inputFileItemRef.current?.click()
    }

    const handleSaveImageMain = () => {
        if (imageMain.value) {
            const formData = new FormData()
            formData.append('image', imageMain.value)
            dispatch(actions.changeImageProductById(products?.id, formData, 'single', 'product'))
            setIsLoading(true)
        }
        else {
            toast.warn(CustomToast('Vui lòng chọn ảnh!'), { autoClose: 2000 })
        }
    }

    const handleOnchangeImageItem = async (e) => {
        const files = e.target.files
        const newImages = [];
        for (let i = 0; i < files.length; i++) {
            const base64 = await CommonUtils.getBase64(files[i]);
            newImages.push({
                url: URL.createObjectURL(files[i]),
                value: files[i],
                base64
            });
        }
        setListImageItemAdded([...listImageItemAdded, ...newImages])
        setListImageItems([...listImageItems, ...newImages])
    }


    const handleDeleteImageItem = (image) => {
        const arr = listImageItems.filter(item => item?.url !== image.url)
        setListImageItems(arr)
        const arrAdded = listImageItemAdded.filter(item => item?.base64 !== image.base64)
        setListImageItemAdded(arrAdded)
        const temp = images.find(item => item.image === image.url)
        if (temp) {
            setListImageItemDeleted([...listImageItemDeleted, { id: temp?.id, url: temp?.image }])
        }
    }

    const handleSaveImageItem = () => {
        if (listImageItems.length > MAX_LENGTH_IMAGE) {
            toast.warn(CustomToast('Số lượng ảnh con tối đa là 12 ảnh. Vui lòng xóa bớt'), { autoClose: 2000 })
        }
        else if (listImageItemAdded.length === 0 && listImageItemDeleted.length === 0) {
            toast.warn(CustomToast('Vui lòng chọn ảnh'), { autoClose: 2000 })
        }
        else {
            if (listImageItemDeleted.length === 0 && listImageItemAdded.length === 0) {
                toast.error(CustomToast('Vui lòng chọn ảnh'), { autoClose: 2000 })
            }
            else {
                setIsLoading(true)
            }

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
                dispatch(actions.addImageProduct(formData, products?.id, 'multiple', 'childProduct'))
            }
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
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý ảnh sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        isLoading ? <Loading /> : ''
                    }
                    <div className=''>
                        <div className='col-3 mt-1 mb-2'>
                            <label className='form-label fw-bold' htmlFor='image'>Chỉnh sửa ảnh chính</label>
                            <Form.Control
                                ref={inputFileRootRef}
                                type='file'
                                id='image'
                                name='image'
                                className='d-none'
                                onChange={e => handleOnchangeImageMain(e)}
                            />
                            <button
                                type='button'
                                className='btn border fw-500 ms-2'
                                onClick={handleClick}
                            >
                                Chọn ảnh
                            </button>
                            {

                                imageMain?.url &&
                                <div
                                    className='my-2'
                                    style={{
                                        width: '100%',
                                        height: '250px',
                                        backgroundImage: `url(${imageMain?.url})`,
                                        backgroundPosition: '0% 0%',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                ></div>
                            }
                            <button
                                className='btn btn-root fw-500'
                                onClick={handleSaveImageMain}
                            >
                                <FontAwesomeIcon icon={faBookmark} /> Lưu
                            </button>
                        </div>

                    </div>
                    <hr />
                    <div className='mt-2'>
                        <div className='col-3'>
                            <label className='form-label fw-bold' htmlFor='addImageItems'>Chỉnh sửa ảnh con</label>
                            <input
                                ref={inputFileItemRef}
                                type='file'
                                multiple
                                className='d-none'
                                id='addImageItems'
                                onChange={e => { handleOnchangeImageItem(e) }}
                            />
                            <button
                                className='btn border fw-500 ms-2'
                                onClick={handleClickChooseImgItem}
                            >
                                Chọn ảnh
                            </button>
                        </div>
                        <div className='my-3 row gy-3'>
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
                                                    height: '180px',
                                                    backgroundImage: `url(${item.url})`,
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'
                                                }}
                                            >
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                (!listImageItems || listImageItems.length === 0) &&
                                [1, 2, 3].map((item, index) => (
                                    <div key={index} className='col-2'>
                                        <div
                                            className='border rounded'
                                            style={{
                                                width: '100%',
                                                height: '180px',
                                            }}
                                        >
                                        </div>
                                    </div>
                                ))


                            }
                        </div>
                        <button
                            className='btn btn-root fw-500'
                            variant="primary"
                            onClick={handleSaveImageItem}
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
