import {useEffect} from 'react';
import '../../../CSS/login.css';


function Output_Table(props)
{
    useEffect(()=> 
    {
        let outputs = document.querySelectorAll(".outputs");
        for(let i = 0; i < outputs.length; i++)
        {
            if(outputs[i].innerHTML == "")
            {
                outputs[i].innerHTML = "N/A";
            }
        }

    }, []);

    return (

        <table className = 'output-table'>
            <tbody>
                <tr>
                    <th>Failed </th>
                    <th>Processed</th>
                    <th>Proucts Added</th>
                    <th>Proucts Updated</th>
                    <th>Variants Added</th>
                    <th>Variants Updated</th>

                </tr>
                <tr>
                    <td className = "outputs">{props.failed}</td>
                    <td className = "outputs">{props.processed}</td>
                    <td iclassNamed = "outputs">{props.products_added}</td>
                    <td className = "outputs">{props.products_updated}</td>
                    <td className = "outputs">{props.variants_added}</td>
                    <td className = "outputs">{props.variants_updated}</td>
                </tr>
            </tbody>
        </table>
    );
};


Output_Table.defaultProps = 
{
    Queue_Creation_Date: 'N/A',
    Queue_Instruction: 'N/A',
    Queue_Updated_At: 'N/A',
    Queue_Type: 'N/A',
    Queue_Status: 'N/A',
    Queue_ID: 'N/A',
}
export default Output_Table;