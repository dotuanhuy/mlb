import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

function LoginOrther() {

    const handleLoginWithGoogle = async () => {
        window.open(`${process.env.REACT_APP_URL_BACKEND}/api/v1/auth/google', '_self`)
    }

    return (
        <div className='pb-3 d-flex justify-content-center text-align-center gap-2'>
            <button
                className='btn rounded text-white fw-500 col-3'
                style={{
                    background: '#1877f2'
                }}
            >
                <FontAwesomeIcon icon={faFacebook} /> Facebook
            </button>
            <button
                className='border rounded fw-500 col-3'
                onClick={handleLoginWithGoogle}
            >
                <FontAwesomeIcon icon={faGoogle} /> Google
            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginOrther);
