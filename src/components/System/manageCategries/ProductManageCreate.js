import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import TableUser from '../common/tableUsers/TableUser';
import { useSearchParams } from 'react-router-dom';
import { BuildOptionSelectType, path } from '../../../utils';
import { validate, validateSelect } from '../../../validate/valiedate';
import Sidebar from '../common/sidebars/Sidebar';
import Navbar from '../common/navbar/Navbar';
import { BuildOptionSelectSame, BuildOptionSelect } from '../../../utils';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProductManageCreate({
    accessToken,
    categories,
    getAllCategoriesRedux,
    createProductTypeRedux
}) {
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [selectType, setSelectType] = useState([])
    const [dataSelect, setDataSelect] = useState('')
    const [params] = useSearchParams()

    
    useEffect(() => {
        getAllCategoriesRedux(accessToken)
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
    }

    const handhandleOnchangeType = (selectType) => {
        setDataSelect(selectType)
    }

    const handleAdd = () => {
        let data = {
            name,
            categoryId: +dataSelect?.value
        }
        createProductTypeRedux(accessToken, data, params.get('page') ? params.get('page') : 1)
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
                // variant="primary"
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
        accessToken: state.auth.token,
        categories: state.category.categories,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCategoriesRedux: (accessToken) => dispatch(actions.getAllCategories(accessToken)),
        createProductTypeRedux: (accessToken, data, page) => dispatch(actions.createProductType(accessToken, data, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductManageCreate);
