// Quản lý bộ đề kiểm tra Khoa học tự nhiên - Giữa kì 1
let currentQuizData = {
  questions: [],
  atomsData: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  timeStarted: null,
  timeEnded: null,
}

// Helper function để render MathJax với debug
function renderMathJax(element, description = '') {
  if (window.MathJax) {
    console.log(`Rendering MathJax for: ${description}`)
    return MathJax.typesetPromise([element])
      .then(() => {
        console.log(`MathJax rendered successfully for: ${description}`)
      })
      .catch((err) => {
        console.error(`MathJax error for ${description}:`, err)
      })
  } else {
    console.warn('MathJax not available')
    return Promise.resolve()
  }
}

// Load tất cả dữ liệu cần thiết
async function loadQuizData() {
  try {
    const [questionsResponse, atomsResponse] = await Promise.all([
      fetch('data/questions_khtn_gk1_2024_2025.json'),
      fetch('data/chem_grade7.json'),
    ])

    currentQuizData.questions = await questionsResponse.json()
    currentQuizData.atomsData = await atomsResponse.json()

    console.log(
      'Đã load thành công:',
      currentQuizData.questions.length,
      'câu hỏi'
    )
    console.log(
      'Đã load thành công:',
      currentQuizData.atomsData.length,
      'nguyên tử'
    )

    return true
  } catch (error) {
    console.error('Lỗi khi load dữ liệu bộ đề:', error)
    return false
  }
}

// Tạo câu hỏi mô hình nguyên tử động (câu 22)
function generateAtomModelQuestion() {
  if (currentQuizData.atomsData.length === 0) return null

  const randomAtom =
    currentQuizData.atomsData[
      Math.floor(Math.random() * currentQuizData.atomsData.length)
    ]
  const shells = randomAtom.shells

  return {
    id: 22,
    type: 'atom-model',
    question: `Quan sát mô hình cấu tạo nguyên tử ${randomAtom.name}. Điền các thông tin còn thiếu vào bảng:`,
    atom: randomAtom,
    fields: [
      { label: 'Số lớp electron', answer: shells.length },
      {
        label: 'Số electron lớp ngoài cùng',
        answer: shells[shells.length - 1],
      },
      { label: 'Chu kì', answer: shells.length },
      { label: 'Nhóm', answer: getAtomGroup(shells) },
    ],
  }
}

// Khởi tạo bộ đề hoàn chỉnh
async function initializeQuiz() {
  // Chỉ lấy câu hỏi trắc nghiệm cho PHẦN I
  const multipleChoiceQuestions = currentQuizData.questions.filter(
    (q) => !q.type || q.type === 'fill-in-blank' || q.type === 'atom-model'
  )

  const completeQuiz = [...multipleChoiceQuestions]

  // Thêm câu hỏi mô hình nguyên tử
  const atomQuestion = generateAtomModelQuestion()
  if (atomQuestion) {
    completeQuiz.push(atomQuestion)
  }

  // Không thêm essay questions vào phần trắc nghiệm
  console.log('PHẦN I - Trắc nghiệm:', completeQuiz.length, 'câu')

  currentQuizData.questions = completeQuiz
  currentQuizData.currentQuestionIndex = 0
  currentQuizData.userAnswers = {}
  currentQuizData.timeStarted = new Date()

  return completeQuiz
}

// Render từng loại câu hỏi
function renderQuestion(question, questionNumber) {
  const questionContainer = document.createElement('div')
  questionContainer.className = 'quiz-question'
  questionContainer.id = `question-${question.id}`

  let questionHtml = ''

  if (question.type === 'fill-in-blank') {
    // Sử dụng hàm có sẵn cho fill-in-blank
    questionHtml = renderFillBlankQuestion(question)
  } else if (question.type === 'atom-model') {
    // Sử dụng hàm có sẵn cho atom model
    questionHtml = renderAtomModelQuestion(question)
  } else if (
    question.type === 'essay-formula' ||
    question.type === 'essay-percentage'
  ) {
    // Câu hỏi tự luận - không hiển thị trong phần trắc nghiệm
    questionHtml = `
      <div class="essay-placeholder">
        <h3>Câu ${questionNumber}. ${question.question}</h3>
        <p style="text-align: center; padding: 2rem; background: #f0f8ff; border-radius: 8px; margin: 1rem 0;">
          📝 <strong>Câu hỏi tự luận</strong><br>
          Vui lòng nhấn nút "Chuyển sang Phần II - Tự Luận" để làm bài.
        </p>
      </div>
    `
  } else if (question.choices && Array.isArray(question.choices)) {
    // Câu hỏi trắc nghiệm thông thường
    questionHtml = `
      <div class="multiple-choice-question">
        <h3>Câu ${questionNumber}. ${question.question}</h3>
        <div class="choices">
          ${question.choices
            .map(
              (choice, index) => `
            <label class="choice-option">
              <input type="radio" name="question_${question.id}" value="${index}" 
                     onchange="saveAnswer(${question.id}, ${index})">
              <span class="choice-text">${choice}</span>
            </label>
          `
            )
            .join('')}
        </div>
      </div>
    `
  } else {
    // Câu hỏi không xác định hoặc bị lỗi
    questionHtml = `
      <div class="error-question">
        <h3>Câu ${questionNumber}. Lỗi hiển thị câu hỏi</h3>
        <p style="color: red;">Không thể hiển thị câu hỏi này. Vui lòng báo cho giáo viên.</p>
        <details>
          <summary>Chi tiết lỗi</summary>
          <pre>${JSON.stringify(question, null, 2)}</pre>
        </details>
      </div>
    `
  }

  questionContainer.innerHTML = questionHtml

  // Render MathJax cho các công thức LaTeX
  renderMathJax(questionContainer, `Question ${question.id}`)

  return questionContainer
}

// Render atom model question riêng
function renderAtomModelQuestion(question) {
  const atomModel = createAtomModel(question.atom)
  const shells = question.atom.shells

  return `
    <div class="atom-question-container">
      <h3>Câu 22. ${question.question}</h3>
      
      <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: flex-start;">
        <div class="atom-model">
          ${atomModel}
          <p style="text-align: center; margin-top: 0.5rem;">
            <strong>Cấu hình electron:</strong> ${shells.join(', ')}
          </p>
        </div>
        
        <div class="atom-table">
          <table border="1" cellpadding="8" style="border-collapse: collapse;">
            <tr style="background: #f0f0f0;">
              <th>Nguyên tử nguyên tố</th>
              <th>${question.atom.symbol}</th>
            </tr>
            ${question.fields
              .map(
                (field, index) => `
              <tr>
                <td>${field.label}</td>
                <td><input type="text" id="atom-field-${index}" 
                          data-answer="${field.answer}" 
                          onchange="saveAtomAnswer(${question.id}, ${index}, this.value)"
                          style="width: 80px; padding: 4px;" /></td>
              </tr>
            `
              )
              .join('')}
          </table>
        </div>
      </div>
      
      <div style="margin-top: 1rem; color: #666;">
        <strong>Thông tin tham khảo:</strong><br>
        • Tên nguyên tố: ${question.atom.name}<br>
        • Số hiệu nguyên tử: ${question.atom.atomic_number}<br>
        • Khối lượng nguyên tử: ${question.atom.atomic_mass} amu
      </div>
    </div>
  `
}

// Lưu đáp án
function saveAnswer(questionId, answerIndex) {
  currentQuizData.userAnswers[questionId] = answerIndex
  // Phát âm thanh khi chọn đáp án
  if (window.QuizSound) {
    QuizSound.play('ui-click', {volume: 0.5});
  }
}

function saveAtomAnswer(questionId, fieldIndex, value) {
  if (!currentQuizData.userAnswers[questionId]) {
    currentQuizData.userAnswers[questionId] = {}
  }
  currentQuizData.userAnswers[questionId][fieldIndex] = value.trim()
}

// Hiển thị bộ đề hoàn chỉnh
async function displayQuiz() {
  const quizContainer = document.getElementById('khtn-quiz-container')
  if (!quizContainer) return

  const quiz = await initializeQuiz()

  let quizHtml = `
    <div class="quiz-header">
      <h2>BÀI KIỂM TRA KHOA HỌC TỰ NHIÊN - GIỮA KÌ 1</h2>
      <p><strong>Thời gian:</strong> 45 phút | <strong>PHẦN I:</strong> ${
        quiz.length
      } câu trắc nghiệm | <strong>PHẦN II:</strong> 2 câu tự luận</p>
      <hr>
    </div>
    
    <div class="quiz-content">
      <div class="quiz-instructions">
        <h4>PHẦN I - TRẮC NGHIỆM:</h4>
        <ul>
          <li>Câu 1-20: Trắc nghiệm, chọn đáp án đúng nhất</li>
          <li>Câu 21: Điền từ thích hợp vào chỗ trống (kéo thả)</li>
          <li>Câu 22: Quan sát mô hình nguyên tử và điền thông tin</li>
        </ul>
        <div style="text-align: center; margin: 1rem 0; padding: 1rem; background: #e3f2fd; border-radius: 8px;">
          <p style="margin: 0.5rem 0;"><strong>📝 PHẦN II - TỰ LUẬN (Câu 23-24)</strong></p>
          <p style="margin: 0.5rem 0; color: #666;">
            Sau khi hoàn thành phần trắc nghiệm, nhấn nút bên dưới để làm phần tự luận
          </p>
          <button onclick="showEssaySection()" class="btn-secondary" style="padding: 0.8rem 2rem;">
            📝 Chuyển sang Phần II - Tự Luận
          </button>
        </div>
      </div>
      
      <div class="quiz-questions">
        ${quiz
          .map((question, index) => {
            const questionDiv = renderQuestion(question, index + 1)
            return questionDiv.outerHTML
          })
          .join('')}
      </div>
      
      <div class="quiz-actions">
        <button onclick="submitQuiz()" class="submit-btn">Nộp bài</button>
        <button onclick="resetQuiz()" class="reset-btn">Làm lại</button>
        <br><br>
        <div style="text-align: center; padding: 1rem; background: #ffeb3b; border-radius: 8px; margin: 1rem 0;">
          <h3 style="color: #d32f2f; margin: 0.5rem 0;">🔥 PHẦN II - TỰ LUẬN 🔥</h3>
          <button onclick="showEssaySection()" class="btn-secondary" style="padding: 1rem 2rem; background: #4caf50; color: white;">
            📝 CHUYỂN SANG TỰ LUẬN NGAY
          </button>
        </div>
      </div>
      
      <div id="quiz-results" style="display: none;"></div>
    </div>
  `

  // Debug: In ra HTML để kiểm tra
  console.log(
    'Quiz HTML contains essay button:',
    quizHtml.includes('showEssaySection')
  )
  console.log('Quiz HTML sample:', quizHtml.substring(0, 500))

  quizContainer.innerHTML = quizHtml

  // Re-initialize các câu hỏi đặc biệt
  initializeSpecialQuestions()

  // Render MathJax cho toàn bộ quiz sau khi render xong
  renderMathJax(quizContainer, 'Complete Quiz Display')

  // Debug: Kiểm tra nút tự luận có hiển thị không
  setTimeout(() => {
    const essayButton = quizContainer.querySelector(
      'button[onclick="showEssaySection()"]'
    )
    console.log('Essay button found:', essayButton)
    if (essayButton) {
      console.log('Essay button is visible:', essayButton.offsetHeight > 0)
      essayButton.style.border = '2px solid red' // Highlight để dễ thấy
    } else {
      console.error('Essay button not found in DOM!')
    }
  }, 1000)
}

// Khởi tạo lại các câu hỏi đặc biệt sau khi render
function initializeSpecialQuestions() {
  // Khởi tạo lại fill-in-blank nếu có
  const fillBlankQuestion = currentQuizData.questions.find(
    (q) => q.type === 'fill-in-blank'
  )
  if (fillBlankQuestion) {
    currentFillBlankQuestion = fillBlankQuestion
  }

  // Khởi tạo lại atom model nếu có
  const atomQuestion = currentQuizData.questions.find(
    (q) => q.type === 'atom-model'
  )
  if (atomQuestion) {
    currentAtom = atomQuestion.atom
  }
}

// Nộp bài và chấm điểm
function submitQuiz() {
  currentQuizData.timeEnded = new Date()
  const timeTaken = Math.round(
    (currentQuizData.timeEnded - currentQuizData.timeStarted) / 1000 / 60
  )

  // Phát âm thanh hoàn thành
  if (window.QuizSound) {
    QuizSound.play('quiz-complete');
  }

  let totalScore = 0
  let maxScore = currentQuizData.questions.length
  let results = []

  currentQuizData.questions.forEach((question, index) => {
    const questionNumber = index + 1
    let isCorrect = false
    let userAnswer = 'Không trả lời'
    let correctAnswer = ''

    if (question.type === 'fill-in-blank') {
      // Chấm câu fill-in-blank
      const userInputs = document.querySelectorAll('.blank-input')
      let correctBlanks = 0
      let totalBlanks = 0

      question.parts.forEach((part) => {
        totalBlanks += part.blanks.length
        part.blanks.forEach((blank) => {
          // Logic chấm điểm fill-in-blank
        })
      })

      isCorrect = correctBlanks === totalBlanks
      userAnswer = `${correctBlanks}/${totalBlanks} chỗ trống đúng`
      correctAnswer = 'Điền đầy đủ các từ phù hợp'
    } else if (question.type === 'atom-model') {
      // Chấm câu atom model
      let correctFields = 0
      let totalFields = question.fields.length

      question.fields.forEach((field, fieldIndex) => {
        const input = document.getElementById(`atom-field-${fieldIndex}`)
        if (
          input &&
          input.value.trim().toLowerCase() ===
            field.answer.toString().toLowerCase()
        ) {
          correctFields++
        }
      })

      isCorrect = correctFields === totalFields
      userAnswer = `${correctFields}/${totalFields} trường đúng`
      correctAnswer = question.fields.map((f) => f.answer).join(', ')
    } else {
      // Chấm câu trắc nghiệm
      const userAnswerIndex = currentQuizData.userAnswers[question.id]
      isCorrect = userAnswerIndex === question.answer
      userAnswer =
        userAnswerIndex !== undefined
          ? question.choices[userAnswerIndex]
          : 'Không trả lời'
      correctAnswer = question.choices[question.answer]
    }

    if (isCorrect) totalScore++

    results.push({
      questionNumber,
      isCorrect,
      userAnswer,
      correctAnswer,
      question: question.question,
    })
  })

  const percentage = Math.round((totalScore / maxScore) * 100)

  // Hiển thị kết quả
  displayResults(totalScore, maxScore, percentage, timeTaken, results)
}

// Hiển thị kết quả
function displayResults(score, maxScore, percentage, timeTaken, results) {
  const resultsHtml = `
    <div class="quiz-results">
      <h3>KẾT QUẢ BÀI KIỂM TRA</h3>
      <div class="score-summary">
        <div class="score-main">Điểm: ${score}/${maxScore} (${percentage}%)</div>
        <div class="time-taken">Thời gian làm bài: ${timeTaken} phút</div>
        <div class="grade">Xếp loại: ${getGrade(percentage)}</div>
      </div>
      
      <div class="detailed-results">
        <h4>Chi tiết từng câu:</h4>
        ${results
          .map(
            (result) => `
          <div class="result-item ${
            result.isCorrect ? 'correct' : 'incorrect'
          }" data-question-num="${result.questionNumber}">
            <strong>Câu ${result.questionNumber}:</strong> ${
              result.isCorrect ? '✅' : '❌'
            }
            <br><em class="result-question"></em>
            <br><strong>Bạn trả lời:</strong> <span class="result-user-answer"></span>
            ${
              !result.isCorrect
                ? `<br><strong>Đáp án đúng:</strong> <span class="result-correct-answer"></span>`
                : ''
            }
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `

  const resultsContainer = document.getElementById('quiz-results')
  resultsContainer.innerHTML = resultsHtml
  resultsContainer.style.display = 'block'

  // Điền nội dung động vào các span bằng innerHTML để hỗ trợ LaTeX
  results.forEach((result) => {
    const resultItem = resultsContainer.querySelector(
      `.result-item[data-question-num="${result.questionNumber}"]`
    )
    if (resultItem) {
      // Hiển thị câu hỏi (rút gọn)
      const questionSpan = resultItem.querySelector('.result-question')
      if (questionSpan) {
        questionSpan.innerHTML = result.question.substring(0, 80) + '...'
      }

      // Hiển thị câu trả lời của học sinh
      const userAnswerSpan = resultItem.querySelector('.result-user-answer')
      if (userAnswerSpan) {
        userAnswerSpan.innerHTML = result.userAnswer
      }

      // Hiển thị đáp án đúng nếu trả lời sai
      const correctAnswerSpan = resultItem.querySelector('.result-correct-answer')
      if (correctAnswerSpan && !result.isCorrect) {
        correctAnswerSpan.innerHTML = result.correctAnswer
      }
    }
  })

  // Render MathJax cho các công thức LaTeX trong kết quả
  renderMathJax(resultsContainer, 'Quiz Results')

  // Scroll đến kết quả
  resultsContainer.scrollIntoView({ behavior: 'smooth' })
}

// Xếp loại
function getGrade(percentage) {
  if (percentage >= 90) return 'Xuất sắc'
  if (percentage >= 80) return 'Giỏi'
  if (percentage >= 65) return 'Khá'
  if (percentage >= 50) return 'Trung bình'
  return 'Yếu'
}

// Reset bài thi
async function resetQuiz() {
  if (confirm('Bạn có chắc muốn làm lại? Tất cả đáp án sẽ bị xóa.')) {
    await displayQuiz()
  }
}

// Khởi tạo khi click vào "Thi Giữa kì 1"
async function startKHTNQuiz() {
  // Phát âm thanh bắt đầu
  if (window.QuizSound) {
    QuizSound.play('quiz-start');
  }

  const success = await loadQuizData()
  if (success) {
    await displayQuiz()
  } else {
    alert('Lỗi khi tải dữ liệu bài thi. Vui lòng thử lại.')
  }
}

// Thêm event listener cho menu
document.addEventListener('DOMContentLoaded', function () {
  // Tìm và thêm event cho "Thi Giữa kì 1" trong phần KHTN
  const khtnSection = document.getElementById('khtn')
  if (khtnSection) {
    const examLinks = khtnSection.querySelectorAll('li')
    examLinks.forEach((link) => {
      if (link.textContent.includes('Thi Giữa kì 1')) {
        link.style.cursor = 'pointer'
        link.onclick = function () {
          // Ẩn tất cả sections khác
          document.querySelectorAll('main section').forEach((section) => {
            section.style.display = 'none'
          })

          // Hiển thị container bài thi
          let quizContainer = document.getElementById('khtn-quiz-container')
          if (!quizContainer) {
            quizContainer = document.createElement('section')
            quizContainer.id = 'khtn-quiz-container'
            quizContainer.style.cssText =
              'max-width: 900px; margin: 2rem auto; padding: 0 1rem; display: block;'
            document.querySelector('main').appendChild(quizContainer)
          }

          quizContainer.style.display = 'block'
          startKHTNQuiz()
        }
      }
    })
  }
})

// Hiển thị phần tự luận
function showEssaySection() {
  console.log('showEssaySection called')
  const container = document.getElementById('khtn-quiz-container')
  console.log('Container found:', !!container)

  if (!container) return

  console.log('startEssaySection function available:', typeof startEssaySection)

  if (typeof startEssaySection === 'function') {
    console.log('Calling startEssaySection...')
    startEssaySection()
  } else {
    console.log('startEssaySection not available, showing fallback')
    container.innerHTML = `
      <div class="essay-section">
        <h2>PHẦN II: TỰ LUẬN</h2>
        <p style="text-align: center; color: #666; margin: 2rem 0;">
          Đang tải hệ thống hỗ trợ làm bài tự luận...
        </p>
        <div style="text-align: center;">
          <button onclick="location.reload()" class="btn-primary">Tải lại trang</button>
        </div>
      </div>
    `
  }
}
