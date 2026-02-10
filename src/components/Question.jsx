import { useState, useEffect } from 'react'

export default function Question({ item, no, onClickAnswer }) {
	const [answers, setAnswers] = useState([]);
	const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

	const shuffleArray = (array) => {
	  return [...array].sort(() => Math.random() - 0.5);
	};

	useEffect(() => {
		const answers = shuffleArray([
		  { text: item.correct_answer, isCorrect: true },
		  ...(item.incorrect_answers ?? []).map(ans => ({
		    text: ans,
		    isCorrect: false
		  }))
		]);
		setAnswers(answers);
    // reset saat soal berganti
    setSelected(null);
    setLocked(false);
  }, [item]);

	function handleSelect(ans) {
    if (locked) return;

    setSelected(ans);
    setLocked(true);

    setTimeout(() => {
      onClickAnswer(no, item.question, ans.text, ans.isCorrect);
    }, 300);
  }

	return(
		<>
			<div className="w-full bg-gray-200 border-2 rounded-xl px-3 pb-3 pt-2 mb-3 text-center font-medium">
				<p className="font-normal text-[.9rem] mb-3">soal ke {no} dari 5 soal</p>
				<p>{item.question}</p>
			</div>
			<div className="flex flex-col gap-1 w-full">
				{answers.map((ans, index) => (
          <label
            key={index}
            className="
              bg-yellow-100
              w-full text-center p-3
              border-2 border-yellow-700
              rounded-xl font-medium cursor-pointer
             	has-[:checked]:bg-yellow-300
            "
          >
            {ans.text}
            <input
              type="radio"
              name={`question-${no}`}
              value={ans.text}
              className="hidden"
              onChange={() => handleSelect(ans)}
              disabled={locked}
            />
          </label>
        ))}
			</div>
		</>
	)
}