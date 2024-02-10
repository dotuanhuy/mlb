import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { Link, createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { path, Role } from '../../../utils';
import Loading from '../../common/Loading/Loading';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebars/Sidebar';
import { BuildOptionSelectSame, BuildOptionSelect } from '../../../utils';

function ProductManageUpdate({
    actives,
    isLoading,
    accessToken,
    categories,
    productType,
    refreshStoreProductTypeRedux,
    getProductTypeByIdRedux,
    getAllCategoriesRedux,
    updateUserRedux
}) {
    const [name, setName] = useState('')
    const [selectCategory, setSelectCategory] = useState({})
    const [selectStatus, setSelectStatus] = useState({})
    const [listCategories, setListCategories] = useState([])
    const [listStatus, setListStatus] = useState([])
    const navigate = useNavigate()
    const [params] = useSearchParams()

    // ComponentDidMount
    useEffect(() => {
        refreshStoreProductTypeRedux()
        getAllCategoriesRedux(accessToken)
        getProductTypeByIdRedux(accessToken, params.get('id'))
    }, [])

    useEffect(() => {
        let dataCategories = BuildOptionSelect(categories)
        let dataStatus = [
            {
                label: 'Active',
                value: true
            },
            {
                label: 'Not active',
                value: true
            }
        ]

        setListCategories(dataCategories)
        setListStatus(dataStatus)
    }, [productType])

    console.log(productType)

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

    const handleUpdateUser = (e) => {
        e.preventDefault()
        let newUser = {
            id: params.get('id'),
            categoryId: selectCategory?.value,
            status: selectStatus?.value,
        }
        // if (params.get('page')) {
        //     updateUserRedux(newUser, accessToken, params.get('page'))
        //     navigate(
        //         {
        //             pathname: path.MANAGE_USER,
        //             search: createSearchParams({ page: params.get('page') ? params.get('page') : 1 }).toString(),
        //         }
        //     )
        // }
        // else {
        //     updateUserRedux(newUser, accessToken)
        //     navigate({
        //         pathname: path.MANAGE_USER_DETAIL,
        //         search: createSearchParams({ id: users?.id }).toString()
        //     })
        // }
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
        accessToken: state.auth.token,
        isLoading: state.productType.isLoading,
        categories: state.category.categories,
        productType: state.productType.productTypes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshStoreProductTypeRedux: () => dispatch(actions.refreshStoreProductType()),
        getAllCategoriesRedux: (accessToken) => dispatch(actions.getAllCategories(accessToken)),
        getProductTypeByIdRedux: (accessToken, id) => dispatch(actions.getProductTypeById(accessToken, id)),
        updateUserRedux: (data, accessToken, page) => dispatch(actions.updateUser(data, accessToken, page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductManageUpdate);
