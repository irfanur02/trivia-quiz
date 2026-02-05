export default function ResultTest() {
	return(
		<>
			<section className="w-sm flex flex-col items-center text-[1.1rem]">
				<div className="w-full bg-gray-300 border-2 border-black-800 rounded-xl p-3 mb-3 text-center font-medium">
					<p>hasil perolehan</p>
					<p>benar <span className="font-medium text-red-600">2 soal</span>.</p>
					<p>salah <span className="font-medium text-red-600">1 soal</span>.</p>
					<p>terjawab <span className="font-medium text-red-600">3 soal dari 5 soal</span>.</p>
				</div>
				<button className="bg-red-600 border-2 border-red-950 text-white text-[1.5rem] px-5 cursor-pointer rounded-xl mx-0">mulai</button>
			</section>
		</>
	)
}