import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Nav from '../../../../nav/nav'
import './AddDescriptionProduct.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { path, Role } from '../../../../../../utils';
import * as actions from '../../../../../../store/actions'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import {Buffer} from 'buffer';
import CommonUtils from '../../../../../../utils/CommonUtils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const cookies = new Cookies();
const mdParser = new MarkdownIt(/* Markdown-it options */);
const initState = {
    contentMarkdown: '',
    contentHTML: ''
}

function AddDescriptionProduct({isLogin, descriptions, fetchDescriptionProductRedux, addDescriptionProductRedux}) {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [markdown, setMarkdown] = useState(initState)

    useEffect(() => {
        if (!cookies.get('userLogin')) {
            navigate(path.LOGIN)
        }
        else {
            let token = cookies.get('userLogin')
            let loginInfor = jwt_decode(token)
            if (loginInfor.role === Role.USER) {
                navigate(path.HOMEPAGE)
            }
        }
        fetchDescriptionProductRedux(state)
    }, [])

    // useEffect(() => {
    //     if (!cookies.get('userLogin')) {
    //         navigate(path.LOGIN)
    //     }
    // }, [isLogin])

    useEffect(() => {
        if (Object.keys(descriptions).length > 0) {
            setMarkdown({
                contentMarkdown: descriptions.contentMarkdown,
                contentHTML: descriptions.contentHTML
            })
        }
        else {
            setMarkdown(initState)
        }
    }, [descriptions])

    const handleEditOnchange = ({ html, text}) => {
        setMarkdown({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    const handleSaveDescription = () => {
        addDescriptionProductRedux({
            ...markdown,
            productId: state
        })
        setMarkdown(initState)
        navigate(path.MANAGE_PRODUCTS_SHOES)
    }
    console.log('check markdown: ', markdown)
    return (    
        <div className='add-description-product'>
            <Nav />
            <div className='add-description-product-container mx-2'>
                <MdEditor 
                    style={{ height: '600px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    value={markdown.contentMarkdown}
                    onChange={handleEditOnchange}
                />
                <button 
                    className='btn btn-success my-2 btn-save-des'
                    onClick={handleSaveDescription}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin,
        descriptions: state.product.descriptions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDescriptionProductRedux: (productId) => dispatch(actions.fetchDescriptionProduct(productId)),
        addDescriptionProductRedux: (data) => dispatch(actions.addDescriptionProduct(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDescriptionProduct);
