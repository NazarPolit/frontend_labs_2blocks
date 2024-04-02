// Очікування завантаження DOM перед виконанням скрипта
document.addEventListener('DOMContentLoaded', function () {
	// Отримання посилань на елементи DOM, які будуть використовуватися
	const questionsContainer = document.getElementById('questions')
	const resultsContainer = document.getElementById('results')
	const submitButton = document.getElementById('submitBtn')

	// Ініціалізація змінних для збереження правильних відповідей та загальної кількості питань
	let correctAnswers = []
	let totalQuestions = 0

	// Запит до файлу questions.json для отримання списку питань та відповідей
	fetch('questions.json')
		.then(response => response.json()) // Парсимо відповідь сервера в форматі JSON
		.then(data => {
			const questions = data.questions // Отримуємо список питань з отриманих даних
			let html = ''

			// Генерація HTML для кожного питання та його варіантів відповідей
			questions.forEach((question, index) => {
				html += `<div class="question">
                    <p>${index + 1}. ${question.question}</p>
                    <ul>`
				question.answers.forEach(answer => {
					html += `<li>
                      <input type="radio" name="question${index}" value="${answer.isCorrect}">
                      <label>${answer.answer}</label>
                    </li>`
					// Якщо відповідь правильна, зберігаємо її текст
					if (answer.isCorrect) {
						correctAnswers[index] = answer.answer
					}
				})
				html += `</ul></div>`
			})

			// Виведення згенерованого HTML з питаннями у контейнер на сторінці
			totalQuestions = questions.length
			questionsContainer.innerHTML = html
		})
		.catch(error => console.error('Error fetching questions:', error))

	// Обробник події для кнопки "Перевірити відповіді"
	submitButton.addEventListener('click', function () {
		// Отримання всіх питань на сторінці
		const questions = document.querySelectorAll('.question')
		// Змінна для підрахунку правильних відповідей
		let score = 0
		// Масив для зберігання номерів питань з неправильними відповідями
		let incorrectQuestions = []

		// Перевірка кожної відповіді на кожне питання
		questions.forEach((question, index) => {
			// Отримання відповіді, яку вибрав користувач
			const selectedAnswer = question.querySelector(
				'input[type="radio"]:checked'
			)
			// Перевірка, чи була вибрана відповідь
			if (selectedAnswer !== null) {
				// Перевірка, чи ця відповідь правильна
				if (selectedAnswer.value === 'true') {
					score++
				} else {
					// Якщо вибрана відповідь неправильна, додаємо номер питання у масив
					incorrectQuestions.push(index + 1)
				}
			} else {
				// Якщо ж відповідь не була вибрана, теж додаємо номер питання у масив
				incorrectQuestions.push(index + 1)
			}
		})

		// Формування повідомлення з результатами тестування
		let resultMessage = `<p>Ви відповіли правильно на ${score} з ${totalQuestions} питань.</p>`
		if (incorrectQuestions.length > 0) {
			// Якщо є неправильні відповіді, додаємо номери питань до повідомлення
			resultMessage += `<p>Питання з неправильними відповідями: ${incorrectQuestions.join(
				', '
			)}</p>`
		} else {
			// Якщо всі відповіді вірні, додаємо відповідну інформацію
			resultMessage += `<p>Відповіді на всі питання вірні!</p>`
		}

		// Виведення результатів на сторінці
		resultsContainer.innerHTML = resultMessage
	})
})
