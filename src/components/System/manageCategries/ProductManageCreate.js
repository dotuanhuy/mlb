import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { useSearchParams } from 'react-router-dom';
import { BuildOptionSelect } from '../../../utils';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CustomToast = (message) => (
    <span className='fw-light' style={{ fontSize: 14, fontFamily:'serif' }}>
        {message}
    </span>
)

function ProductManageCreate() {
    const dispatch = useDispatch()
    const {categories} = useSelector(state => state.category)
    const {error} = useSelector(state => state.error)
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [selectType, setSelectType] = useState([])
    const [dataSelect, setDataSelect] = useState('')
    const [selectImage, setSelectImage] = useState({ value: '', url: '' })
    const [params] = useSearchParams()

    useEffect(() => {
        dispatch(actions.getAllCategories())
    }, [])

    useEffect(() => {
        if (error) {
            toast.error(CustomToast(error), { autoClose: 3000 })
        }
    }, [error])

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

    const handhandleOnchangeType = (selectType) => {
        setDataSelect(selectType)
    }

    const handleOnchangeImage = async (e) => {
        if (e.target.files[0]) {
            setSelectImage({
                value: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleAdd = () => {
        if (!selectImage?.value) {
            toast.warn(CustomToast('Please select a photo!'), { autoClose: 3000 })
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
                <FontAwesomeIcon className='pe-1' icon={faCirclePlus} />
                Add new
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
                    <Modal.Title>Create new produt type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={e => handleOnSubmit(e)}>
                        <div class="mb-3">
                            <label for="exampleInputName" class="form-label fw-500 text-muted">Name product type</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="exampleInputName" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputBrand" className="form-label">Category name</label>
                            <Select
                                value={dataSelect}
                                onChange={handhandleOnchangeType}
                                options={selectType}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputImage" className="form-label">Image root</label>
                            <input 
                                type="file" 
                                className="form-control" 
                                id="exampleInputImage" 
                                onChange={(e) => handleOnchangeImage(e)}
                            />
                            {
                                selectImage ? 
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
                        </div> 
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-root fw-500' variant="secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button
                        className='btn btn-root-2 fw-500'
                        variant="primary"
                        onClick={handleAdd}
                    >
                        Add
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductManageCreate);
