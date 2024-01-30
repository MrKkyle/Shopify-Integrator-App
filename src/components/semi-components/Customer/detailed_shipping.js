import {useEffect} from 'react';
import '../../../CSS/detailed.css';

function Detailed_shipping(props)
{
    useEffect(()=> 
    {
        /* Ensures the navbar is set correctly */
        let navigation = document.getElementById("navbar");
        window.onload = function(event)
        {
            navigation.style.left = "0%";
            navigation.style.position = "relative";
            navigation.style.width = "100%";
        }
        
    }, []);

    return (
        <>
            <div className = "details-tables">
                <h2>{props.Address_type}</h2>
                <table>
                    <tbody>
                        <tr>
                            <th> Address 1</th>
                        </tr>
                        <tr>
                            <td>{props.Shipping1}</td>
                        </tr>

                        <tr>
                            <th> Address 2</th>
                        </tr>
                        <tr>
                            <td>{props.Shipping2}</td>
                        </tr>

                        <tr>
                            <th> Address 3</th>
                        </tr>
                        <tr>
                            <td>{props.Shipping3}</td>
                        </tr>

                        <tr>
                            <th> Address 4</th>
                        </tr>
                        <tr>
                            <td>{props.Shipping4}</td>
                        </tr>
                        <tr>
                            <th> Address 5</th>
                        </tr>
                        <tr>
                            <td>{props.Shipping5}</td>
                        </tr>
                    </tbody>
                </table> 
            </div>    
        </>
    );
}
Detailed_shipping.defaultProps = 
{
    Shipping1: 'Address1',
    Shipping2: 'Address2',
    Shipping3: 'Address3',
    Shipping4: 'Address4'
}
export default Detailed_shipping;