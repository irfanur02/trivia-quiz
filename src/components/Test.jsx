export default function Test() {
	return(
		<>
			<section className="w-sm flex flex-col items-center text-[1.3rem]">
				<div className="w-full bg-gray-200 border-2 rounded-xl px-3 pb-3 pt-2 mb-3 text-center font-medium">
					<p className="font-normal text-[.9rem] mb-3">soal ke 1 dari 5 soal</p>
					<p>siapa ada apa.</p>
				</div>
				<div className="flex flex-col gap-1 w-full">
					<label className="dark:has-checked:bg-yellow-300 dark:has-checked:text-black dark:has-checked:ring-blue-900 bg-yellow-100 w-full text-center p-3 border-2 border-yellow-700 rounded-xl font-medium cursor-pointer"
					>
					  Google Pay
					  <input type="radio" className="checked:border-blue-500 peer hidden" />
					</label>
					<label className="dark:has-checked:bg-yellow-300 dark:has-checked:text-black dark:has-checked:ring-blue-900 bg-yellow-100 w-full text-center p-3 border-2 border-yellow-700 rounded-xl font-medium cursor-pointer"
					>
					  Google Pay
					  <input type="radio" className="checked:border-blue-500 peer hidden" />
					</label>
				</div>
			</section>
		</>
	)
}