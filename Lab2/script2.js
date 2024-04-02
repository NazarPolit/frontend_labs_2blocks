document.addEventListener('DOMContentLoaded', function () {
	const canvas = document.getElementById('gameCanvas')
	const ctx = canvas.getContext('2d')

	const platformWidth = 100
	const platformHeight = 10
	let platformX = (canvas.width - platformWidth) / 2
	const platformY = canvas.height - platformHeight
	let ballRadius = 10
	let ballX = canvas.width / 2
	let ballY = canvas.height - 30
	let ballSpeedX = 2
	let ballSpeedY = -2
	let rightPressed = false
	let leftPressed = false
	let score = 0

	function drawPlatform() {
		ctx.beginPath()
		ctx.rect(platformX, platformY, platformWidth, platformHeight)
		ctx.fillStyle = '#0095DD'
		ctx.fill()
		ctx.closePath()
	}

	function drawBall() {
		ctx.beginPath()
		ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
		ctx.fillStyle = '#0095DD'
		ctx.fill()
		ctx.closePath()
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		drawPlatform()
		drawBall()
		update()
		requestAnimationFrame(draw)
	}

	function update() {
		if (
			ballX + ballSpeedX > canvas.width - ballRadius ||
			ballX + ballSpeedX < ballRadius
		) {
			ballSpeedX = -ballSpeedX
		}

		if (ballY + ballSpeedY < ballRadius) {
			ballSpeedY = -ballSpeedY
		} else if (ballY + ballSpeedY > canvas.height - ballRadius) {
			if (ballX > platformX && ballX < platformX + platformWidth) {
				ballSpeedY = -ballSpeedY
				score++
			} else {
				alert('Гра завершена. Ваш результат: ' + score + ' балів!')
				document.location.reload()
			}
		}

		if (rightPressed && platformX < canvas.width - platformWidth) {
			platformX += 7
		} else if (leftPressed && platformX > 0) {
			platformX -= 7
		}

		ballX += ballSpeedX
		ballY += ballSpeedY
	}

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Right' || event.key === 'ArrowRight') {
			rightPressed = true
		} else if (event.key === 'Left' || event.key === 'ArrowLeft') {
			leftPressed = true
		}
	})

	document.addEventListener('keyup', function (event) {
		if (event.key === 'Right' || event.key === 'ArrowRight') {
			rightPressed = false
		} else if (event.key === 'Left' || event.key === 'ArrowLeft') {
			leftPressed = false
		}
	})

	draw()
})
