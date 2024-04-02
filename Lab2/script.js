// Отримання даних форми і збереження їх в LocalStorage
const form = document.getElementById('surveyForm')
form.addEventListener('submit', function (event) {
	event.preventDefault()

	const formData = new FormData(form)
	const surveyData = {}
	for (const [key, value] of formData.entries()) {
		surveyData[key] = value
	}

	let surveys = JSON.parse(localStorage.getItem('rockSurveys')) || []
	surveys.push(surveyData)
	localStorage.setItem('rockSurveys', JSON.stringify(surveys))

	alert('Дані збережено')
	form.reset()
})

// Отримати дані з LocalStorage
const surveys = JSON.parse(localStorage.getItem('rockSurveys')) || []


const allGenres = surveys.map(survey => survey.genre)
const allAlbums = surveys.map(survey => survey.favAlbum)
const allInstruments = surveys.map(survey => survey.instrument)

// Функція для підрахунку кількості кожного елемента в масиві
function countOccurrences(arr) {
	return arr.reduce((acc, curr) => {
		acc[curr] ? acc[curr]++ : (acc[curr] = 1)
		return acc
	}, {})
}

// Підрахунок 
const genresCount = countOccurrences(allGenres)
const albumsCount = countOccurrences(allAlbums)
const instrumentsCount = countOccurrences(allInstruments)

// Функція для знаходження найпопулярніших елементів
function findMostPopularItems(counts) {
	const maxCount = Math.max(...Object.values(counts))
	return Object.keys(counts).filter(item => counts[item] === maxCount)
}

// Знаходження найпопулярніших рок-жанрів
const popularGenres = findMostPopularItems(genresCount)
const popularAlbums = findMostPopularItems(albumsCount) 
const popularInstruments = findMostPopularItems(instrumentsCount)

// Відображення результатів
const popularGenresList = document.getElementById('popularGenres')
popularGenres.forEach(genre => {
	const listItem = document.createElement('li')
	listItem.textContent = genre
	popularGenresList.appendChild(listItem)
})

const popularAlbumsList = document.getElementById('popularAlbum')
const albumItem = document.createElement('li')
albumItem.textContent = popularAlbums
popularAlbumsList.appendChild(albumItem)

const popularInstrumentsList = document.getElementById('popularInstrument')
popularInstruments.forEach(instrument => {
	const listItem = document.createElement('li')
	listItem.textContent = instrument
	popularInstrumentsList.appendChild(listItem)
})
