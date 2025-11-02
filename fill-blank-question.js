// Hàm xử lý câu hỏi điền vào chỗ trống (fill-in-blank)
let currentFillBlankQuestion = null

// Render câu hỏi điền vào chỗ trống
function renderFillBlankQuestion(questionData) {
  currentFillBlankQuestion = questionData

  let html = `
    <div class="fill-blank-question">
      <h3>Câu ${questionData.id}. ${questionData.question}</h3>
      
      <!-- Ngân hàng từ -->
      <div class="word-bank">
        <strong>Ngân hàng từ:</strong>
        <div class="word-options">
          ${questionData.word_bank
            .map(
              (word) =>
                `<span class="word-option" draggable="true" ondragstart="dragStart(event)" data-word="${word}">${word}</span>`
            )
            .join('')}
        </div>
      </div>
      
      <!-- Các phần câu hỏi -->
      <div class="question-parts">
        ${questionData.parts
          .map((part, partIndex) => {
            let partText = part.text
            // Thay thế chỗ trống bằng input
            part.blanks.forEach((blank, blankIndex) => {
              const inputId = `blank_${partIndex}_${blankIndex}`
              const inputHtml = `<input type="text" 
              class="blank-input" 
              id="${inputId}" 
              data-part="${partIndex}" 
              data-blank="${blankIndex}"
              data-answer="${blank.answer.toLowerCase()}"
              placeholder="..."
              ondrop="drop(event)" 
              ondragover="allowDrop(event)">`
              partText = partText.replace('_____', inputHtml)
            })

            return `<div class="question-part">${partText}</div>`
          })
          .join('')}
      </div>
      
      <!-- Nút kiểm tra và gợi ý -->
      <div class="action-buttons">
        <button onclick="checkFillBlankAnswer()" class="check-btn">Kiểm tra đáp án</button>
        <button onclick="showHints()" class="hint-btn">Hiển thị gợi ý</button>
        <button onclick="clearFillBlankAnswers()" class="clear-btn">Xóa đáp án</button>
      </div>
      
      <!-- Kết quả -->
      <div id="fill-blank-result"></div>
      
      <!-- Gợi ý (ẩn mặc định) -->
      <div id="hints-container" style="display: none;">
        <h4>Gợi ý:</h4>
        ${questionData.parts
          .map((part, partIndex) =>
            part.blanks
              .map(
                (blank, blankIndex) =>
                  `<p><strong>Chỗ trống ${partIndex + 1}.${
                    blankIndex + 1
                  }:</strong> ${blank.hint}</p>`
              )
              .join('')
          )
          .join('')}
      </div>
    </div>
  `

  return html
}

// Drag and Drop functions
function dragStart(event) {
  event.dataTransfer.setData('text', event.target.getAttribute('data-word'))
  event.target.style.opacity = '0.5'
}

function allowDrop(event) {
  event.preventDefault()
}

function drop(event) {
  event.preventDefault()
  const word = event.dataTransfer.getData('text')
  event.target.value = word

  // Tìm và làm mờ từ đã sử dụng
  const wordOptions = document.querySelectorAll('.word-option')
  wordOptions.forEach((option) => {
    if (option.getAttribute('data-word') === word) {
      option.style.opacity = '0.3'
      option.style.textDecoration = 'line-through'
    }
  })
}

// Reset trạng thái từ khi xóa input
function resetWordOption(word) {
  const wordOptions = document.querySelectorAll('.word-option')
  wordOptions.forEach((option) => {
    if (option.getAttribute('data-word') === word) {
      option.style.opacity = '1'
      option.style.textDecoration = 'none'
    }
  })
}

// Xóa tất cả đáp án
function clearFillBlankAnswers() {
  const inputs = document.querySelectorAll('.blank-input')
  inputs.forEach((input) => {
    if (input.value) {
      resetWordOption(input.value)
    }
    input.value = ''
  })

  document.getElementById('fill-blank-result').innerHTML = ''
  document.getElementById('hints-container').style.display = 'none'
}

// Hiển thị gợi ý
function showHints() {
  const hintsContainer = document.getElementById('hints-container')
  hintsContainer.style.display =
    hintsContainer.style.display === 'none' ? 'block' : 'none'
}

// Kiểm tra đáp án
function checkFillBlankAnswer() {
  if (!currentFillBlankQuestion) return

  const inputs = document.querySelectorAll('.blank-input')
  let totalBlanks = 0
  let correctAnswers = 0
  let results = []

  currentFillBlankQuestion.parts.forEach((part, partIndex) => {
    part.blanks.forEach((blank, blankIndex) => {
      totalBlanks++
      const inputId = `blank_${partIndex}_${blankIndex}`
      const input = document.getElementById(inputId)
      const userAnswer = input.value.toLowerCase().trim()
      const correctAnswer = blank.answer.toLowerCase().trim()

      const isCorrect = userAnswer === correctAnswer
      if (isCorrect) correctAnswers++

      // Thêm class để styling
      input.classList.remove('correct', 'incorrect')
      input.classList.add(isCorrect ? 'correct' : 'incorrect')

      results.push({
        part: partIndex + 1,
        blank: blankIndex + 1,
        userAnswer: input.value || '(Trống)',
        correctAnswer: blank.answer,
        isCorrect: isCorrect,
      })
    })
  })

  // Hiển thị kết quả
  const score = Math.round((correctAnswers / totalBlanks) * 100)
  let resultHtml = `
    <div class="result-summary">
      <h4>Kết quả: ${correctAnswers}/${totalBlanks} (${score}%)</h4>
    </div>
    <div class="detailed-results">
      ${results
        .map(
          (result) => `
        <div class="result-item ${result.isCorrect ? 'correct' : 'incorrect'}">
          <strong>Phần ${result.part}, chỗ trống ${result.blank}:</strong>
          ${result.isCorrect ? '✅' : '❌'} 
          Bạn trả lời: "${result.userAnswer}" 
          ${result.isCorrect ? '' : `(Đúng: "${result.correctAnswer}")`}
        </div>
      `
        )
        .join('')}
    </div>
  `

  document.getElementById('fill-blank-result').innerHTML = resultHtml
}

// Tìm và render câu hỏi fill-in-blank từ danh sách câu hỏi
function loadFillBlankQuestion(questions, questionId = 21) {
  const question = questions.find(
    (q) => q.id === questionId && q.type === 'fill-in-blank'
  )
  if (question) {
    const container = document.getElementById('fill-blank-container')
    if (container) {
      container.innerHTML = renderFillBlankQuestion(question)
    }
  } else {
    console.log('Không tìm thấy câu hỏi fill-in-blank với ID:', questionId)
  }
}

// Load và hiển thị câu hỏi fill-in-blank từ file JSON
async function loadAndDisplayFillBlankQuestion() {
  try {
    const response = await fetch('data/questions_khtn_gk1_2024_2025.json')
    const questions = await response.json()
    loadFillBlankQuestion(questions, 21)
  } catch (error) {
    console.error('Lỗi khi load câu hỏi fill-in-blank:', error)
  }
}

// Khởi tạo khi DOM ready
document.addEventListener('DOMContentLoaded', function () {
  // Tự động load câu hỏi fill-in-blank nếu có container
  if (document.getElementById('fill-blank-container')) {
    loadAndDisplayFillBlankQuestion()
  }
})
