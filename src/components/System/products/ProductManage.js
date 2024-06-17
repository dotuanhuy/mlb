import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Navbar from '../common/navbar/Navbar'
import { Link, useSearchParams } from 'react-router-dom';
import TableProduct from './TableProducts';
import Sidebar from '../common/sidebars/Sidebar';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, InputGroup } from 'react-bootstrap';
import * as actions from '../../../store/actions'
import { toast } from 'react-toastify';
import { CustomToast } from '../../../utils';

let timerId
function ProductManage({ categoryType, actives }) {
    const dispatch = useDispatch()
    const { message } = useSelector(state => state.product)
    const [textSearch, setTextSearch] = useState('')
    const [params] = useSearchParams()

    useEffect(() => {
        document.title = `Quản lý ${actives.active}`
    }, [actives])

    useEffect(() => {
        if (!textSearch) {
            dispatch(actions.getProductByCategoryLimit(categoryType, params?.get('page') ? params?.get('page') : 1))
        }
        else {
            searchAPI(1000, textSearch)
        }
    }, [textSearch])

    useEffect(() => {
        if (message) {
            toast.success(CustomToast(message), { autoClose: 2000 })
            dispatch(actions.refreshInfoReponseProduct())
        }
    }, [message])

    const searchAPI = (delay, productName) => {
        delay = delay || 0
        if (timerId) {
            clearTimeout(timerId)
            timerId = null
        }
        timerId = setTimeout(() => {
            if (productName.trim()) {
                dispatch(actions.findNameProductByCategory(productName, categoryType, params.get('page') || 1))
            }
        }, delay)
    }

    const handleClearTextSearch = () => {
        setTextSearch('')
    }

    return (
        <div className='manage-product'>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar active='product' activeChild={actives?.active} />
                </div>
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <h2>Quản lý {actives?.active?.toLowerCase()}</h2>
                    <div className='d-flex justify-content-end gap-3'>
                        <div className='col-5'>
                            <InputGroup>
                                <InputGroup.Text className=''><FontAwesomeIcon icon={faMagnifyingGlass} /></InputGroup.Text>
                                <Form.Control
                                    value={textSearch}
                                    className='rounded-end position-relative'
                                    placeholder={`Nhập tên ${actives?.active?.toLowerCase()}`}
                                    aria-label={`Nhập tên ${actives?.active?.toLowerCase()}`}
                                    aria-describedby="basic-addon2"
                                    onChange={e => setTextSearch(e.target.value)}
                                />
                                {
                                    textSearch ?
                                        <FontAwesomeIcon
                                            className='position-absolute'
                                            style={{
                                                cursor: 'pointer',
                                                zIndex: '10',
                                                right: '6px',
                                                top: '10px'
                                            }}
                                            onClick={handleClearTextSearch}
                                            icon={faCircleXmark}
                                        /> : ''
                                }

                            </InputGroup>
                        </div>
                        <Link
                            className='text-white fw-500 btn btn-root text-center'
                            to={actives?.pathToCreate}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Thêm mới
                        </Link>
                    </div>
                    <hr />
                    <TableProduct textSearch={textSearch} categoryType={categoryType} actives={actives} />
                </div>
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
