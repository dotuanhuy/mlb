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

function ProductManageUpdate({
    actives,
    isLoading,
    categories,
    productType,
    refreshStoreProductTypeRedux,
    getProductTypeByIdRedux,
    getAllCategoriesRedux,
    updateProductTypeRedux
}) {
    const [name, setName] = useState('')
    const [selectCategory, setSelectCategory] = useState({})
    const [selectStatus, setSelectStatus] = useState({})
    const [selectImage, setSelectImage] = useState('')
    const [listCategories, setListCategories] = useState([])
    const [listStatus, setListStatus] = useState([])
    const navigate = useNavigate()
    const [params] = useSearchParams()

    // ComponentDidMount
    useEffect(() => {
        refreshStoreProductTypeRedux()
        getAllCategoriesRedux()
        getProductTypeByIdRedux(params.get('id'))
    }, [])

    useEffect(() => {
        setName(productType?.name)
        if (productType?.imageRoot) {
            let imageBase64 = Buffer.from(productType?.imageRoot?.data, 'base64').toString('binary')
            setSelectImage(imageBase64)
        }
        setSelectCategory({
            label: productType?.dataProductTypeCategory?.name ? productType?.dataProductTypeCategory?.name : '',
            value: productType?.dataProductTypeCategory?.id ? productType?.dataProductTypeCategory?.id : ''
        })
        setSelectStatus({
            label: productType?.status ? 'Active' : 'Not active',
            value: productType?.status ? true : false,
        })
    }, [productType])

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
            label: productType?.dataProductTypeCategory?.name ? productType.dataProductTypeCategory?.name : '',
            value: productType?.dataProductTypeCategory?.id ? productType.dataProductTypeCategory?.id : ''
        })
        setSelectStatus({
            label: productType?.status ? 'Active' : 'Not active',
            value: productType?.status ? true : false
        })
    }, [categories])

    const handleOnchangeCategory = (selectCategory) => {
        setSelectCategory(selectCategory)
    }

    const handleOnchangeStatus = (selectStatus) => {
        setSelectStatus(selectStatus)
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

    const handleUpdateUser = (e) => {
        e.preventDefault()
        let data = {
            id: +params.get('id'),
            name,
            categoryId: selectCategory?.value,
            imageRoot: selectImage,
            status: selectStatus?.value,
        }
        updateProductTypeRedux(data, params.get('page'))
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
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-root text-white fw-500"
                                            onClick={(e) => handleUpdateUser(e)}
                                        >
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
        isLoading: state.productType.isLoading,
        categories: state.category.categories,
        productType: state.productType.productTypes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshStoreProductTypeRedux: () => dispatch(actions.refreshStoreProductType()),
        getAllCategoriesRedux: () => dispatch(actions.getAllCategories()),
        getProductTypeByIdRedux: (id) => dispatch(actions.getProductTypeById(id)),
        updateProductTypeRedux: (data, page) => dispatch(actions.updateProductType(data, page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductManageUpdate);
