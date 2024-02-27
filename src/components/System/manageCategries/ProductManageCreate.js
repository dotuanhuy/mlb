import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { useSearchParams } from 'react-router-dom';
import { BuildOptionSelect } from '../../../utils';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommonUtils from '../../../utils/CommonUtils';

function ProductManageCreate({
    categories,
    getAllCategoriesRedux,
    createProductTypeRedux
}) {
    const accessToken = window.localStorage.getItem('accessToken')
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [selectType, setSelectType] = useState([])
    const [dataSelect, setDataSelect] = useState('')
    const [selectImage, setSelectImage] = useState('')
    const [params] = useSearchParams()

    
    useEffect(() => {
        getAllCategoriesRedux()
    }, [])

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
        let files = e.target.files
        let file = files[0]
        if (file) {
            //convert file to base64
            let base64 = await CommonUtils.getBase64(file)
            setSelectImage(base64)
        }
    }

    const handleAdd = () => {
        let data = {
            name,
            categoryId: +dataSelect?.value,
            imageRoot: selectImage
        }
        createProductTypeRedux(data, params.get('page') ? params.get('page') : 1)
        handleClose()
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
                                        background: `url(${selectImage}) 0% 0% / contain no-repeat`, 
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
        categories: state.category.categories,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCategoriesRedux: () => dispatch(actions.getAllCategories()),
        createProductTypeRedux: (data, page) => dispatch(actions.createProductType(data, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductManageCreate);
