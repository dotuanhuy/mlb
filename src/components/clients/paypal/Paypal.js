
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import * as action from '../../../store/actions'

// This value is from the props in the UI
const style = { "layout": "vertical" };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, amount, orders, setIsLoading, showSpinner }) => {
    const [{ isPending, options }, dispath] = usePayPalScriptReducer();
    const dispatchRedux = useDispatch()

    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                fundingSource="paypal"
                style={{ "layout": "vertical", "label": "donate" }}
                disabled={false}
                forceReRender={[style, currency, amount]}
                createOrder={
                    (data, actions) => actions.order.create({
                        purchase_units: [
                            { amount: { currency_code: currency, value: amount } }
                        ]
                    }).then(orderId => orderId)}
                onApprove={(data, actions) => {
                    actions.order.capture().then(async (reponse) => {
                        if (reponse.status === 'COMPLETED') {
                            setIsLoading(true)
                            dispatchRedux(action.createOrder(orders))
                        }
                    })
                }}
            />
        </>
    );
}

export default function Paypal({ amount, orders, setIsLoading }) {
    return (
        <div>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper currency={'USD'} amount={amount} orders={orders} setIsLoading={setIsLoading} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}