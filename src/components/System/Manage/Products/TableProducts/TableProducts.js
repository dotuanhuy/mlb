import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './TableProducts.scss'
import { Link } from 'react-router-dom';
import { path } from '../../../../../utils';
import * as actions from '../../../../../store/actions'
import { useNavigate } from 'react-router-dom';

function TableProducts() {
    const navigate = useNavigate()

    useEffect(() => {
        
    }, [])


    return (
        <div className='products-all-system'>
            <div className='products-all-container'>
                <div className='products-all-table'>
                    <table id="customers">
                        <tr>
                            <th>ID</th>
                            <th>CategoreId</th>
                            <th>Name</th>
                            <th>ProductCode</th>
                            <th>Price</th>
                            <th>DiscountId</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Site</th>
                            <th>Release date</th>
                            <th>BrandId</th>
                            <th>List color</th>
                            <th>LogoId</th>
                        </tr>
                        
                    </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableProducts);
