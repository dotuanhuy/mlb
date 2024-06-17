import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { useSearchParams } from 'react-router-dom';
import { BuildOptionSelect, CustomToast } from '../../../utils';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { validateRequire } from '../../../validate/valiedate';

function CreateProductType() {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)
    const { message, errCode } = useSelector(state => state.productType)
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [selectType, setSelectType] = useState([])
    const [dataSelect, setDataSelect] = useState('')
    const [selectImage, setSelectImage] = useState({ value: '', url: '' })
    const [params] = useSearchParams()
    const inputFileRef = useRef()
    const [errors, setErrors] = useState({ errName: '', errCategory: '', errImage: '' })

    useEffect(() => {
        dispatch(actions.getAllCategories())
    }, [])

    useEffect(() => {
        if (message) {
            if (errCode === 0) {
                toast.success(CustomToast(message), { autoClose: 2000 })
            }
            else {
                toast.error(CustomToast(message), { autoClose: 2000 })
            }
            dispatch(actions.refreshInfoProductType())
        }
    }, [message])

    useEffect(() => {
        let dataType = BuildOptionSelect(categories)
        setSelectType(dataType)
    }, [categories])

    const handleShow = () => setShow(true)

    const handleClose = () => {
        setShow(false)
        setName('')
        setDataSelect('')
        setSelectImage('')
    }

    const handleClick = () => {
        inputFileRef.current?.click()
    }

    const handhandleOnchangeType = (selectType) => {
        setDataSelect(selectType)
        setErrors({
            ...errors,
            errCategory: ''
        })
    }

    const handleOnchangeImage = async (e) => {
        if (e.target.files[0]) {
            setSelectImage({
                value: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
            setErrors({
                ...errors,
                errImage: ''
            })
        }
    }

    const handleAdd = () => {
        const errName = validateRequire('Tên kiểu sản phẩm', name)
        const errCategory = validateRequire('Tên thể loại', dataSelect?.value)
        const errImage = validateRequire('Ảnh', selectImage?.value)
        if (errName || errCategory || errImage) {
            setErrors({ errName, errCategory, errImage })
        }
        else {
            const data = {
                name,
                categoryId: +dataSelect?.value,
            }
            const formData = new FormData()
            formData.append('image', selectImage.value)
            formData.append('productType', JSON.stringify(data))
            dispatch(actions.createProductType(formData, params.get('page') ? params.get('page') : 1, 'single'))
            handleClose()
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        handleAdd()
    }


    return (
        <>
            <button
                className='btn btn-root fw-500 me-2'
                onClick={handleShow}
            >
                <FontAwesomeIcon icon={faPlus} /> Thêm mới
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tạo mới kiểu sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => handleOnSubmit(e)}>
                        <div class="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label className='fw-500 text-muted'>Tên<span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tên kiểu sản phẩm"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                        setErrors({
                                            ...errors,
                                            errName: ''
                                        })
                                    }}
                                />
                                {
                                    errors && errors.errName ? <span className='error'>{errors.errName}</span> : ''
                                }
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-500 text-muted">Loại sản phẩm<span className='text-danger'>*</span></label>
                            <Select
                                value={dataSelect}
                                onChange={handhandleOnchangeType}
                                options={selectType}
                            />
                            {
                                errors && errors.errCategory ? <span className='error'>{errors.errCategory}</span> : ''
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputImage" className="form-label fw-500 text-muted">Ảnh gốc<span className='text-danger'>*</span></label>
                            <input
                                ref={inputFileRef}
                                type="file"
                                className="d-none"
                                id="exampleInputImage"
                                onChange={(e) => handleOnchangeImage(e)}
                            />
                            <br></br>
                            <button
                                type='button'
                                className='btn btn-root fw-500'
                                onClick={handleClick}
                            >
                                Chọn ảnh
                            </button>
                            {
                                selectImage && selectImage?.url ?
                                    <div
                                        className='mt-2'
                                        style={{
                                            width: '80%',
                                            height: '100px',
                                            background: `url(${selectImage.url}) 0% 0% / contain no-repeat`,
                                        }}
                                    ></div>
                                    : ''
                            }
                            {
                                errors && errors.errImage ?
                                    <>
                                        <br></br>
                                        <span className='error'>{errors.errImage}</span>
                                    </> : ''

                            }
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-root fw-500' variant="secondary" onClick={handleClose}>
                        Hủy
                    </button>
                    <button
                        className='btn btn-root-2 fw-500'
                        variant="primary"
                        onClick={handleAdd}
                    >
                        Tạo
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductType);
