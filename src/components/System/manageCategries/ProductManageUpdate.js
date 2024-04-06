import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { path, Role } from '../../../utils';
import Loading from '../../common/Loading/Loading';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebars/Sidebar';
import { BuildOptionSelect } from '../../../utils';
import CommonUtils from '../../../utils/CommonUtils';
import { Buffer } from 'buffer';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

function ProductManageUpdate({actives}) {
    const dispatch = useDispatch()
    const {isLoading, productTypes} = useSelector(state => state.productType)
    const {categories} = useSelector(state => state.category)
    const [name, setName] = useState('')
    const [selectCategory, setSelectCategory] = useState({})
    const [selectStatus, setSelectStatus] = useState({})
    const [selectImage, setSelectImage] = useState({ value: '', url: '' })
    const [listCategories, setListCategories] = useState([])
    const [listStatus, setListStatus] = useState([])
    const navigate = useNavigate()
    const [params] = useSearchParams()

    // ComponentDidMount
    useEffect(() => {
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
    }

    const handleOnchangeStatus = (selectStatus) => {
        setSelectStatus(selectStatus)
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
        const formData = new FormData()
        const data = {
            name,
            imageUrl: selectImage.url,
            categoryId: selectCategory?.value,
            status: selectStatus?.value,
        }
        formData.append('productType', JSON.stringify(data))
        if(selectImage.value) {
            formData.append('image', selectImage.value)
        }
        dispatch(actions.updateProductType(formData, +params.get('id'), params.get('page'), 'single'))
        navigate({
            pathname: path.MANAGE_PRODUCT_TYPE,
            search: createSearchParams({
                page: params.get('page') ? params.get('page') : 1
            }).toString()
        })
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
                                <Sidebar active={'user'} />
                            </div>
                            <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                                <div className='d-flex justify-content-between'>
                                    <h2>Update {actives?.active}</h2>
                                </div>
                                <hr />

                                <div className='mx-2 my-4'>
                                    <form>
                                        <div className='form row'>
                                            <div class="col-4 mb-3">
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
                                            <div className="col-4 mb-3">
                                                <label htmlFor="exampleInputBrand" className="form-label">Category name</label>
                                                <Select
                                                    value={selectCategory}
                                                    onChange={handleOnchangeCategory}
                                                    options={listCategories}
                                                />
                                            </div>
                                            <div className="col-4 mb-3">
                                                <label htmlFor="exampleInputBrand" className="form-label">Status</label>
                                                <Select
                                                    value={selectStatus}
                                                    onChange={handleOnchangeStatus}
                                                    options={listStatus}
                                                />
                                            </div>
                                            <div className="mb-3 col-4">
                                                <label htmlFor="exampleInputImage" className="form-label">Image root</label>
                                                <input 
                                                    type="file" 
                                                    className="form-control mb-2" 
                                                    id="exampleInputImage" 
                                                    onChange={(e) => handleOnchangeImage(e)}
                                                />
                                                {
                                                    selectImage.url ? 
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
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-root text-white fw-500 mt-2"
                                            onClick={(e) => handleUpdateProductType(e)}
                                        >
                                            <FontAwesomeIcon icon={faFloppyDisk} className='pe-1'/>
                                            Save
                                        </button>
                                    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductManageUpdate);
