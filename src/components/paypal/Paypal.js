
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from '../../store/actions'
import { toast } from "react-toastify";
import { CustomToast } from "../../utils/customToast";
import { path } from "../../utils";


// This value is from the props in the UI
const style = {"layout":"vertical"};

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, amount, orders, showSpinner }) => {
    const [{ isPending, options }, dispath] = usePayPalScriptReducer();
    const navigate = useNavigate()
    const dispatchRedux = useDispatch()
    const { errorOrder } = useSelector(state => state.order)

    useEffect(() => {
        if (errorOrder) {
            if (errorOrder === 'none') {
                navigate(path.ORDER_TRACKING)
            }
            else {
                toast.error(CustomToast(errorOrder), { autoClose: 3000 })
            }
        }
    }, [errorOrder])
    
    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                fundingSource="paypal"
                style={{"layout":"vertical","label":"donate"}}
                disabled={false}
                forceReRender={[style, currency, amount]}
                createOrder={
                    (data, actions) => actions.order.create({
                        purchase_units: [
                            {amount: { currency_code: currency, value: amount}}
                        ]
                    }).then(orderId => orderId)}
                onApprove={(data, actions) => {
                    actions.order.capture().then(async(reponse) => {
                        if (reponse.status === 'COMPLETED') {
                            dispatchRedux(action.createOrder(orders))
                        }
                    })
                }}
            />
        </>
    );
}

export default function Paypal({amount, orders}) {
    return (
        <div>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper currency={'USD'} amount={amount} orders={orders} showSpinner={false}/>
            </PayPalScriptProvider>
        </div>
    );
}