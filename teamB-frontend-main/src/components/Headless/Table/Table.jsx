import { HeadlessTable } from "./HeadlessTable";
/*Rendering */
function Table({
    columns,
    data,
    errorMessage
}) {
    return (
        
        <HeadlessTable columns={columns} data={data}>
            {({ columns, sortedData, requestSort, sortConfig }) => (
                <div className="relative flex justify-center">
                    <table className="text-sm text-center rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                {columns.map(column => (
                                    <th key={column.key} onClick={() => requestSort(column.key)} scope="col" className="px-6 py-3 text-center" >
                                        {column.label}
                                        {sortConfig && sortConfig.key === column.key ? (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓') : ''}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData && sortedData.length > 0 && sortedData[0] != "{"? sortedData.map((item, index) => (
                              
                                <tr className="bg-white border-b" key={index}>
                                    {columns.map(column => (
                                        <td className="px-6 py-4 text-center" key={column.key}>{item[column.key]}</td>
                                    ))}
                                </tr>
                            )) : (<tr className="bg-white border-b"> <td className="px-6 py-4 text-center" colSpan="3">{ errorMessage}</td> </tr>)}
                        </tbody>
                    </table>
                </div>
            )}
        </HeadlessTable>
    );
}



export { Table };
