import { useState, useEffect } from 'react'
import Question from '../components/Question'

export default function Test({ handleDoneTest, setAnswer, onQuestionsReady }) {
	const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple"
        );
        const data = await res.json();
        setQuestions(data.results);
      } catch {
        setError("Gagal mengambil soal");
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!loading && questions.length > 0) {
      onQuestionsReady();
    }
  }, [loading, questions]);

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