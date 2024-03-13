import React, { memo } from 'react';
import { connect, useSelector } from 'react-redux';
import { formatDateVN } from '../../utils';

function DescriptionProduct() {
    const {products} = useSelector(state => state.product)

    return (
        <div className='d-flex col-10'>
            <table className='table table-striped-columns'>
                <tbody>
                    <tr>
                        <th>Chất liệu:</th>
                        <td>{products?.material}</td>
                    </tr>
                    <tr>
                        <th>Giới tính:</th>
                        <td>{products?.gender}</td>
                    </tr>
                    <tr>
                        <th>Hãng:</th>
                        <td>{products?.dataBrands?.name}</td>
                    </tr>
                    <tr>
                        <th>Ra mắt:</th>
                        <td>{formatDateVN(products?.releaseDate)}</td>
                    </tr>
                </tbody>
            </table>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(DescriptionProduct));
