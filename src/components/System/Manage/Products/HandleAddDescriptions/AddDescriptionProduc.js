import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Nav from '../../../nav/nav'
import './AddDescriptionProduct.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { path, Role } from '../../../../../utils';
import * as actions from '../../../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Loading from '../../../../Loading/Loading';

const mdParser = new MarkdownIt(/* Markdown-it options */);
const initState = {
    contentMarkdown: '',
    contentHTML: ''
}

function AddDescriptionProduct({
    isLogin, 
    descriptions, 
    accessToken, 
    isLoading,
    fetchDescriptionProductRedux, 
    addDescriptionProductRedux,
    refreshIsloadingStateProductRedux
}) {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [markdown, setMarkdown] = useState(initState)

    useEffect(() => {
        refreshIsloadingStateProductRedux()
        fetchDescriptionProductRedux(state, accessToken)
    }, [])

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
        }, accessToken)
        setMarkdown(initState)
        navigate(path.MANAGE_PRODUCTS_SHOES)
    }
    return (    
        <>
            {
                isLoading ?
                <Loading />
                :
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
            }
        </>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin,
        descriptions: state.product.descriptions,
        accessToken: state.auth.token,
        isLoading: state.product.isLoadingProduct
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDescriptionProductRedux: (productId, accessToken) => dispatch(actions.fetchDescriptionProduct(productId, accessToken)),
        addDescriptionProductRedux: (data, accessToken) => dispatch(actions.addDescriptionProduct(data, accessToken)),
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDescriptionProduct);
