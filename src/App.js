import React, { useState, useEffect } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import DataTable from './Components/DataTable'
import 'bootstrap/dist/css/bootstrap.min.css'
import { paginationSize } from './util/pagination'

function App() {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [q, setQ] = useState('')
	const [page, setPage] = useState(1)
	const [modifiedData, setModifiedData] = useState([])

	useEffect(() => {
		setLoading(true)
		fetch(`https://www.balldontlie.io/api/v1/teams`)
			.then((res) => res.json())
			.then((res) => {
				setData(res.data)
				setLoading(false)
				console.log('data in useeffect', data)
			})
			.catch((err) => {
				setError(err)
				setLoading(false)
			})
	}, [])

	function search(rows) {
		return rows.filter((row) => {
			return Object.values(row).some((col) => String(col).toLowerCase().includes(q.toLowerCase()))
		})
	}

	return (
		<div className='App'>
			<h1>Hello World!</h1>
			<div>
				<input type='text' value={q} onChange={(e) => setQ(e.target.value)} />
			</div>
			{data.length === 0 ? <>Nothing here</> : <DataTable data={search(data)} />}
		</div>
	)
}

export default App
