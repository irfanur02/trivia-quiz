import { useState, useEffect } from 'react'
import Question from '../components/Question'

export default function Test({ 
  handleDoneTest, 
  setAnswer, 
  onQuestionsReady, 
  questionCount, 
  questionSet, 
  questionGet,
  indexQuestionContinueTest,
  answersGet
}) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [currentIndex, setCurrentIndex] = useState(indexQuestionContinueTest);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple"
        );
        const data = await res.json();
        questionSet(data.results);
      } catch {
        setError("Gagal mengambil soal");
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!loading && questionCount() > 0) {
      onQuestionsReady();
    }
  }, [loading]);

  useEffect(() => {
    const savedAnswers = answersGet();
    if (savedAnswers && Array.isArray(savedAnswers)) {
      setAnswer(savedAnswers);
    }
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
			prev + 1 < questionCount() ? prev + 1 : 0
		);

    if (currentIndex+1 == questionCount()) handleDoneTest()
  }

	return(
		<>
			<section className="w-sm flex flex-col items-center text-[1.3rem]">
				<Question 
          key={currentIndex} 
          item={questionGet(currentIndex)}
          no={currentIndex+1} 
          onClickAnswer={handleClickAnswer} />
			</section>
		</>
	)
}