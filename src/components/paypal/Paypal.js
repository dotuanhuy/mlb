
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

// This value is from the props in the UI
const style = {"layout":"vertical"};

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, amount, showSpinner }) => {
    const [{ isPending, options }, dispath] = usePayPalScriptReducer();
    const navigate = useNavigate()
    
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

                        }
                    })
                }}
            />
        </>
    );
}

export default function Paypal({amount}) {
    return (
        <div>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper currency={'USD'} amount={amount}  showSpinner={false}/>
            </PayPalScriptProvider>
        </div>
    );
}