import {useEffect} from 'react';
import '../../../CSS/detailed.css';

function Detailed_Table_View(props)
{
    useEffect(()=> 
    {
        let shipping = document.getElementById("Shipping_Type"); let shipping_amount = document.getElementById("Shipping_Amount");
        let shipping_total = document.getElementById("Shipping_Total");

        if(shipping.innerHTML == "") { shipping.innerHTML = "N/A";}
        if(shipping_amount.innerHTML == "") { shipping_amount.innerHTML = 0; }
        if(shipping_total.innerHTML == "") { shipping_total.innerHTML = 0; }
        
    }, []);

    return (
        <>
            <tr className="order_totals_line">
                <td className="order_totals_headers"> Sub total </td>
                <td className="order_totals_middle"></td>
                <td className="order_totals_value">{props.Sub_Total}</td>
            </tr>
            <tr className="order_totals_line">
                <td className="order_totals_headers">
                    Tax
                </td>
                <td className="order_totals_middle">{props.Tax_Percent}</td>
                <td className="order_totals_value">{props.Tax_Amount}</td>
            </tr>
            <tr className="order_totals_line">
                <td className="order_totals_headers"> Shipping </td>
                <td className="order_totals_middle" id = "Shipping_Type">{props.Shipping_Type}</td>
                <td className="order_totals_value" id = "Shipping_Amount">{props.Shipping_Amount}</td>
            </tr>
            <tr className="order_totals_line">
                <td className="order_totals_headers"> Total </td>
                <td className="order_totals_middle"></td>
                <td className="order_totals_value" id = "Shipping_Total">{props.Total}</td>
            </tr>

        </>
    );
}

Detailed_Table_View.defaultProps = 
{
    Sub_Total: 'Sub Total',
    Tax_Percent: 'Tax Percent',
    Tax_Amount: 'Tax Total',
    Shipping_Type: 'Shipping Type',
    Shipping_Amount: 'Shipping Amount',
    Total: 'Total'
}
export default Detailed_Table_View;