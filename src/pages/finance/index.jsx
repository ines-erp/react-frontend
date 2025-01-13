import {Link} from "react-router-dom";

export const FinancesDashboard = () => {
    return (
        <>
            <h1>Finances Dashboard</h1>
            <div>Balance overview overview</div>

            <div>Transactions overview
                <Link to={"transactions"}>more</Link>
            </div>

            <div>Payment methods overview
                <Link to={"payment-methods"}>more</Link>
            </div>

            <div>Categories overview
                <Link to={"categories"}>more</Link>
            </div>

            <div>Transaction types overview
                <Link to={"transactions"}>more</Link>
            </div>
        </>
    );
};