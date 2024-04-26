import { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function App() {
	const [users, setUsers] = useState([])
	const [page, setPage] = useState(1)
	const [usersPerPage, setUsersPerPage] = useState(5)

	const API_URL = new URL(
		'https://662a99bee226cd4604e3e4b7.mockapi.io/api/v1/articles'
	)
	API_URL.searchParams.append('limit', usersPerPage)
	API_URL.searchParams.append('page', page)

	useEffect(() => {
		fetch(`${API_URL}`)
			.then(res => res.json())
			.then(data => setUsers(data))
	}, [page])

	const dec = () => {
		if (page === 1) return
		setPage(prev => prev - 1)
	}

	const inc = () => {
		if (Math.floor(100 / usersPerPage) === page) return
		setPage(prev => prev + 1)
	}
	return (
		<div className='w-[500px] mx-auto'>
			<h2 className='text-3xl text-center'>Users</h2>
			<div className='shadow-lg px-5 py-2'>
				{users.map((user, index) => (
					<div key={index}>
						{user.name} {user.lastName}
					</div>
				))}
			</div>
			<div className='flex justify-center items-center gap-4 mt-6 text-xl'>
				<FaChevronLeft onClick={dec} />
				<div className='text-2xl select-none'>{page}</div>
				<FaChevronRight onClick={inc} />
			</div>
		</div>
	)
}

export default App
