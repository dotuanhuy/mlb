import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { path } from '../../../utils';
import Loading from '../../common/Loading/Loading';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebars/Sidebar';
import { BuildOptionSelect } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import { validateRequire } from '../../../validate/valiedate';

function UpdateProductType({ actives }) {
    const dispatch = useDispatch()
    const { isLoading, productTypes } = useSelector(state => state.productType)
    const { categories } = useSelector(state => state.category)
    const [name, setName] = useState('')
    const [selectCategory, setSelectCategory] = useState({})
    const [selectStatus, setSelectStatus] = useState({})
    const [selectImage, setSelectImage] = useState({ value: '', url: '' })
    const [listCategories, setListCategories] = useState([])
    const [listStatus, setListStatus] = useState([])
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const inputFileRef = useRef()
    const [errors, setErrors] = useState({ errName: '', errCategory: '', errImage: '' })


    // ComponentDidMount
    useEffect(() => {
        document.title = 'Chỉnh sửa kiểu sản phẩm'
        dispatch(actions.refreshStoreProductType())
        dispatch(actions.getAllCategories())
        dispatch(actions.getProductTypeById(params.get('id')))
    }, [])

    useEffect(() => {
        setName(productTypes?.name)
        if (productTypes?.imageRoot) {
            setSelectImage({
                value: '',
                url: productTypes?.imageRoot
            })
        }
        setSelectCategory({
            label: productTypes?.dataProductTypeCategory?.name ? productTypes?.dataProductTypeCategory?.name : '',
            value: productTypes?.dataProductTypeCategory?.id ? productTypes?.dataProductTypeCategory?.id : ''
        })
        setSelectStatus({
            label: productTypes?.status ? 'Active' : 'Not active',
            value: productTypes?.status ? true : false,
        })
    }, [productTypes])

    useEffect(() => {
        let dataCategories = BuildOptionSelect(categories)
        let dataStatus = [
            {
                label: 'Active',
                value: true
            },
            {
                label: 'Not active',
                value: false
            }
        ]

        setListCategories(dataCategories)
        setListStatus(dataStatus)
    }, [categories])

    // ComponentDidUpdate
    useEffect(() => {
        setSelectCategory({
            label: productTypes?.dataProductTypeCategory?.name ? productTypes.dataProductTypeCategory?.name : '',
            value: productTypes?.dataProductTypeCategory?.id ? productTypes.dataProductTypeCategory?.id : ''
        })
        setSelectStatus({
            label: productTypes?.status ? 'Active' : 'Not active',
            value: productTypes?.status ? true : false
        })
    }, [categories])

    const handleOnchangeCategory = (selectCategory) => {
        setSelectCategory(selectCategory)
        setErrors({
            ...errors,
            errCategory: ''
        })
    }

    const handleOnchangeStatus = (selectStatus) => {
        setSelectStatus(selectStatus)
    }

    const handleClick = () => {
        inputFileRef.current?.click()
    }

    const handleOnchangeImage = async (e) => {
        if (e.target.files[0]) {
            setSelectImage({
                value: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleUpdateProductType = (e) => {
        e.preventDefault()
        const errName = validateRequire('Tên kiểu sản phẩm', name)
        const errCategory = validateRequire('Tên thể loại', selectCategory?.value)
        const errImage = validateRequire('Ảnh', selectImage?.value)
        if (errName || errCategory || errImage) {
            setErrors({ errName, errCategory, errImage })
        }
        else {
            const formData = new FormData()
            const data = {
                name,
                imageUrl: selectImage.url,
                categoryId: selectCategory?.value,
                status: selectStatus?.value,
            }
            formData.append('productType', JSON.stringify(data))
            if (selectImage.value) {
                formData.append('image', selectImage.value)
            }
            dispatch(actions.updateProductType(formData, +params.get('id'), params.get('page'), 'single', 'productType'))
            navigate({
                pathname: path.MANAGE_PRODUCT_TYPE,
                search: createSearchParams({
                    page: params.get('page') ? params.get('page') : 1
                }).toString()
            })
        }
    }

    return (
        <>
            {
                isLoading ?
                    <Loading />
                    :
                    <>
                        <Navbar />
                        <div className='row gx-0'>
                            <div className='col-2'>
                                <Sidebar active={'category'} activeChild={actives?.active} />
                            </div>
                            <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                                <div className='d-flex justify-content-between'>
                                    <h2>Chỉnh sửa kiểu sản phẩm</h2>
                                </div>
                                <hr />

                                <div className='mx-2 my-4'>
                                    <Form>
                                        <div className='form row'>
                                            <Form.Group className='col-4 mb-3'>
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

                                            <div className="col-4 mb-3">
                                                <label htmlFor="exampleInputBrand" className="form-label fw-500 text-muted">Loại sản phẩm<span className='text-danger'>*</span></label>
                                                <Select
                                                    value={selectCategory}
                                                    onChange={handleOnchangeCategory}
                                                    options={listCategories}
                                                />
                                                {
                                                    errors && errors.errCategory ? <span className='error'>{errors.errCategory}</span> : ''
                                                }
                                            </div>
                                            <div className="col-4 mb-3">
                                                <label htmlFor="exampleInputBrand" className="form-label fw-500 text-muted">Trạng thái<span className='text-danger'>*</span></label>
                                                <Select
                                                    value={selectStatus}
                                                    onChange={handleOnchangeStatus}
                                                    options={listStatus}
                                                />
                                            </div>
                                            <div className="mb-3 col-4">
                                                <label htmlFor="exampleInputImage" className="form-label fw-500 text-muted">Ảnh gốc<span className='text-danger'>*</span></label>
                                                <input
                                                    ref={inputFileRef}
                                                    type="file"
                                                    className="d-none"
                                                    id="exampleInputImage"
                                                    onChange={(e) => handleOnchangeImage(e)}
                                                />
                                                <button
                                                    type='button'
                                                    className='btn btn-root fw-500 ms-2'
                                                    onClick={handleClick}
                                                >
                                                    Chọn ảnh
                                                </button>
                                                {
                                                    selectImage && selectImage.url ?
                                                        <div
                                                            className='mt-2'
                                                            style={{
                                                                width: '80%',
                                                                height: '100px',
                                                                background: `url(${selectImage.url}) 0% 0% / contain no-repeat`,
                                                            }}
                                                        ></div>
                                                        :
                                                        <div
                                                            className='border rounded mt-2'
                                                            style={{
                                                                width: '80%',
                                                                height: '100px'
                                                            }}
                                                        >
                                                        </div>
                                                }
                                                {
                                                    errors && errors.errImage ?
                                                        <>
                                                            <br></br>
                                                            <span className='error'>{errors.errImage}</span>
                                                        </> : ''

                                                }
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-root text-white fw-500 mt-2"
                                            onClick={(e) => handleUpdateProductType(e)}
                                        >
                                            <FontAwesomeIcon icon={faBookmark} /> Lưu
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </>
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProductType);
