import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
	return (
		<>
			<main className="w-full h-screen bg-blue-900 grid place-content-center">
				<div className="w-sm">
					<h1 className="font-bold text-[3rem] text-white text-center text-shadow-lg/30">TRIVIA QUIZ</h1>
					<Outlet />
				</div>
			</main>
		</>
	)
}