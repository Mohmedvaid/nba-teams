import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { ignoreFields, columnTitles } from '../util/dataTable'
import { paginationSize } from '../util/pagination'
import BasicPagination from './BasicPagination'

// create chunks for pagination
function splitDataInChunks(data, chunkSize) {
	if (data.length === 0) return []
	const chunks = []
	for (let i = 0; i < data.length; i += chunkSize) {
		chunks.push(data.slice(i, i + chunkSize))
	}
	return chunks
}

function Datatable({ data }) {
	const [page, setPage] = useState(0)
	const columns = data[0] && Object.keys(data[0]).filter((key) => !ignoreFields.includes(key))
	const dataChunks = splitDataInChunks(data, paginationSize)
	console.log('==>', dataChunks)
	const [currentData, setCurrentData] = useState(dataChunks[page])
	if (!currentData) return <div>Loading...</div>
	return (
		<Container>
			<div>Datatable</div>
			{/* basic table layout */}
			<Table striped bordered hover responsive='md'>
				<thead>
					<tr>
						{currentData[0] &&
							columns.map((heading) => <th>{columnTitles[heading] ? columnTitles[heading] : heading}</th>)}
					</tr>
				</thead>
				<tbody>
					{currentData.map((row) => (
						<tr>
							{columns.map((column) => (
								<td>{row[column]}</td>
							))}
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	)
}

export default Datatable
