import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Navbar from '../../../components/server/navbar/Navbar'
import Sidebar from '../../../components/server/sidebars/Sidebar';
import TableProductType from './TableProductType';
import CreateProductType from './CreateProductType';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import * as actions from '../../../store/actions'
import { useSearchParams } from 'react-router-dom';

let timerId
function ProductTypeManage({ categoryType, actives }) {
    const dispatch = useDispatch()
    const [textSearch, setTextSearch] = useState('')
    const [params] = useSearchParams()

    useEffect(() => {
        document.title = 'Quản lý kiểu sản phẩm'
    }, [])

    useEffect(() => {
        if (!textSearch) {
            dispatch(actions.getLimitProductTypes(params?.get('page') || 1))
        }
        else {
            searchAPI(1000, textSearch)
        }
    }, [textSearch])

    const searchAPI = (delay, productTypeName) => {
        delay = delay || 0
        if (timerId) {
            clearTimeout(timerId)
            timerId = null
        }
        timerId = setTimeout(() => {
            if (productTypeName.trim()) {
                dispatch(actions.getLimitProductTypesByName(params?.get('page') || 1, productTypeName))
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
                    <Sidebar active='category' activeChild={actives?.active} />
                </div>
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <h2>Các kiểu sản phẩm</h2>
                    <div className='d-flex justify-content-end gap-3 align-items-center'>
                        <div className='col-5'>
                            <InputGroup>
                                <InputGroup.Text className=''><FontAwesomeIcon icon={faMagnifyingGlass} /></InputGroup.Text>
                                <Form.Control
                                    value={textSearch}
                                    className='rounded-end position-relative'
                                    placeholder={'Nhập tên kiểu sản phẩm'}
                                    aria-label={'Nhập tên kiểu sản phẩm'}
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
                        <CreateProductType />
                    </div>
                    <hr />
                    <TableProductType textSearch={textSearch} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductTypeManage);
