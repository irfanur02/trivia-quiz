import { useState, useEffect } from 'react'
import Question from '../components/Question'

export default function Test({ handleDoneTest, setAnswer }) {
	const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple"
      );
      const data = await res.json();

      setQuestions(data.results);
    } catch (err) {
      setError("Gagal mengambil soal");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (loading) return <p>Loading soal...</p>;
  if (error) return <p>{error}</p>;

  function handleClickAnswer(no, question, chooseAnswer, isCorrect) {
    setAnswer(prev => [
      ...prev,
      {
        noQuestion: no,
        textQestion: question,
        textAnswer: chooseAnswer,
        answer: isCorrect
      }
    ]);
  	setCurrentIndex(prev =>
			prev + 1 < questions.length ? prev + 1 : 0
		);

    if (currentIndex+1 == questions.length) handleDoneTest()
  }

  console.log(questions);

	return(
		<>
			<section className="w-sm flex flex-col items-center text-[1.3rem]">
				<Question 
          key={currentIndex} 
          item={questions[currentIndex]} 
          no={currentIndex+1} 
          onClickAnswer={handleClickAnswer} />
			</section>
		</>
	)
}