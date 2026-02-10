export default function Button({ text, variant, w, type, onClick }) {
	const widthMap = {
  	max: "w-max",
  	full: "w-full",
	};

	const buttonColor = 
		variant === "main" 
		? "bg-orange-700 border-2 border-yellow-500 text-white"
		: variant === "secondary" 
		? "bg-gray-300 border-2 border-gray-500 text-gray-900"
		: variant === "white" 
		? "bg-gray-300 border-2 border-gray-500 text-gray-900"
		: variant === "red" 
		? "bg-red-600 border-2 border-red-950 text-white" : "";

	return(
		<button 
			type={type}
			onClick={onClick}
			className={`${buttonColor} text-center text-[1.2rem] ${widthMap[w]} p-3 border-1 rounded-xl font-medium cursor-pointer`}>{text}</button>
	)
}