// Hệ thống hỗ trợ làm bài tự luận Hóa học
let currentEssayData = {
  questions: [],
  atomicMasses: {
    H: 1,
    C: 12,
    N: 14,
    O: 16,
    Na: 23,
    Mg: 24,
    Al: 27,
    P: 31,
    S: 32,
    Cl: 35.5,
    Br: 80,
    K: 39,
    Ca: 40,
    Fe: 56,
    Cu: 64,
    Zn: 65,
    Ag: 108,
  },
  currentStep: 0,
  userWork: {},
}

// Load dữ liệu câu hỏi tự luận
async function loadEssayQuestions() {
  try {
    console.log('Loading essay questions...')
    const response = await fetch('data/essay_questions_khtn_gk1.json')
    console.log('Fetch response:', response.status, response.statusText)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    currentEssayData.questions = await response.json()
    console.log('Đã load', currentEssayData.questions.length, 'câu hỏi tự luận')
    console.log('Questions:', currentEssayData.questions)
    return currentEssayData.questions
  } catch (error) {
    console.error('Lỗi load câu hỏi tự luận:', error)
    return []
  }
}

// Hiển thị giao diện làm bài tự luận
function displayEssaySection() {
  let container = document.getElementById('khtn-quiz-container')

  if (!container) {
    console.log('Container not found, creating new one...')
    // Tạo container mới nếu không tìm thấy
    container = document.createElement('section')
    container.id = 'khtn-quiz-container'
    container.style.cssText =
      'max-width: 900px; margin: 2rem auto; padding: 0 1rem; display: block;'

    // Ẩn tất cả sections khác
    document.querySelectorAll('main section').forEach((section) => {
      section.style.display = 'none'
    })

    document.querySelector('main').appendChild(container)
  }

  console.log('Displaying essay section...')
  console.log('Questions loaded:', currentEssayData.questions.length)

  const essayHtml = `
    <div class="essay-section">
      <div class="essay-header">
        <h2>PHẦN II: TỰ LUẬN</h2>
        <p><strong>Hướng dẫn:</strong> Làm theo từng bước, có thể xem gợi ý và lời giải mẫu</p>
        <div class="atomic-mass-table">
          <h4>Bảng nguyên tử khối (amu):</h4>
          <div class="mass-grid">
            ${Object.entries(currentEssayData.atomicMasses)
              .map(
                ([symbol, mass]) =>
                  `<span class="mass-item">${symbol} = ${mass}</span>`
              )
              .join('')}
          </div>
        </div>
      </div>
      
      <div class="essay-questions">
        ${currentEssayData.questions
          .map((question) => renderEssayQuestion(question))
          .join('')}
      </div>
      
      <div class="essay-actions">
        <button onclick="checkEssayAnswers()" class="btn-primary">Kiểm tra bài làm</button>
        <button onclick="showEssaySolutions()" class="btn-secondary">Xem lời giải mẫu</button>
        <button onclick="resetEssayWork()" class="btn-outline">Làm lại</button>
      </div>
    </div>
  `

  container.innerHTML = essayHtml
  container.style.display = 'block'

  // Render MathJax cho phần tự luận
  if (window.MathJax) {
    MathJax.typesetPromise([container]).catch((err) =>
      console.log('MathJax error:', err)
    )
  }

  console.log('Essay section displayed successfully')
}

// Render từng câu hỏi tự luận
function renderEssayQuestion(question) {
  if (question.type === 'essay-formula') {
    return renderFormulaQuestion(question)
  } else if (question.type === 'essay-percentage') {
    return renderPercentageQuestion(question)
  }
  return ''
}

// Render câu hỏi lập công thức
function renderFormulaQuestion(question) {
  return `
    <div class="essay-question" id="essay-${question.id}">
      <h3>Câu ${question.id}. ${question.question}</h3>
      
      <div class="formula-workspace">
        <div class="elements-info">
          <h4>Thông tin các nguyên tố:</h4>
          ${question.elements
            .map(
              (el) => `
            <div class="element-card">
              <span class="element-symbol">${el.symbol}</span>
              <span class="element-valence">Hóa trị: ${toRoman(
                el.valence
              )}</span>
              <span class="element-name">${el.name}</span>
            </div>
          `
            )
            .join('')}
        </div>
        
        <div class="step-by-step">
          <h4>Làm bài theo từng bước:</h4>
          
          <div class="step-item">
            <label>Bước 1: Viết công thức tổng quát</label>
            <div class="formula-input">
              <input type="text" id="general-formula-${question.id}" 
                     placeholder="Ví dụ: Mg_xCl_y" 
                     onchange="saveEssayStep(${
                       question.id
                     }, 'general', this.value)">
              <button onclick="showHint(${
                question.id
              }, 'general')" class="hint-btn">💡 Gợi ý</button>
            </div>
          </div>
          
          <div class="step-item">
            <label>Bước 2: Áp dụng quy tắc hóa trị</label>
            <div class="valence-input">
              <input type="text" id="valence-rule-${question.id}" 
                     placeholder="x × ... = y × ..." 
                     onchange="saveEssayStep(${
                       question.id
                     }, 'valence', this.value)">
              <button onclick="showHint(${
                question.id
              }, 'valence')" class="hint-btn">💡 Gợi ý</button>
            </div>
          </div>
          
          <div class="step-item">
            <label>Bước 3: Tính tỉ lệ x:y</label>
            <div class="ratio-input">
              <input type="text" id="ratio-${question.id}" 
                     placeholder="x/y = ..." 
                     onchange="saveEssayStep(${
                       question.id
                     }, 'ratio', this.value)">
              <button onclick="showHint(${
                question.id
              }, 'ratio')" class="hint-btn">💡 Gợi ý</button>
            </div>
          </div>
          
          <div class="step-item">
            <label>Bước 4: Công thức hóa học cuối cùng</label>
            <div class="final-formula">
              <input type="text" id="final-formula-${question.id}" 
                     placeholder="Công thức cuối cùng" 
                     onchange="saveEssayStep(${
                       question.id
                     }, 'final', this.value)">
              <button onclick="checkFormulaAnswer(${
                question.id
              })" class="check-btn">✓ Kiểm tra</button>
            </div>
          </div>
        </div>
        
        <div class="hint-area" id="hint-${
          question.id
        }" style="display: none;"></div>
      </div>
    </div>
  `
}

// Render câu hỏi tính phần trăm
function renderPercentageQuestion(question) {
  return `
    <div class="essay-question" id="essay-${question.id}">
      <h3>Câu ${question.id}. ${question.question}</h3>
      
      <div class="percentage-workspace">
        <div class="compound-info">
          <h4>Thông tin hợp chất: ${question.compound.formula}</h4>
          <div class="elements-breakdown">
            ${question.compound.elements
              .map(
                (el) => `
              <div class="element-info">
                <span>${el.symbol}: ${el.atomicMass} amu × ${el.quantity} = ${
                  el.atomicMass * el.quantity
                } amu</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
        
        <div class="calculation-steps">
          <h4>Các bước tính toán:</h4>
          
          <div class="calc-step">
            <label>Bước 1: Tính khối lượng phân tử</label>
            <div class="calc-input">
              <span>M = </span>
              <input type="text" id="molecular-mass-${question.id}" 
                     placeholder="Tính tổng khối lượng" 
                     onchange="saveEssayStep(${
                       question.id
                     }, 'molecular', this.value)">
              <span> amu</span>
              <button onclick="calculateMolecularMass(${
                question.id
              })" class="calc-btn">🔢 Tính</button>
            </div>
          </div>
          
          <div class="calc-step">
            <label>Bước 2: Tính % từng nguyên tố</label>
            ${question.compound.elements
              .map(
                (el) => `
              <div class="element-percentage">
                <label>% ${el.symbol} = </label>
                <input type="text" id="percent-${el.symbol}-${question.id}" 
                       placeholder="Tính % ${el.symbol}" 
                       onchange="saveEssayStep(${question.id}, 'percent_${el.symbol}', this.value)">
                <span>%</span>
                <button onclick="calculatePercentage(${question.id}, '${el.symbol}')" class="calc-btn">🔢 Tính</button>
              </div>
            `
              )
              .join('')}
          </div>
          
          <div class="calc-step">
            <label>Bước 3: Kiểm tra kết quả</label>
            <div class="verification">
              <button onclick="verifyPercentages(${
                question.id
              })" class="verify-btn">✓ Kiểm tra tổng = 100%</button>
              <div id="verification-result-${question.id}"></div>
            </div>
          </div>
        </div>
        
        <div class="calculator-helper" id="calculator-${question.id}">
          <h5>Máy tính hỗ trợ:</h5>
          <div class="calc-display">
            <input type="text" id="calc-display-${question.id}" readonly>
          </div>
          <div class="calc-buttons">
            <button onclick="calcInput(${question.id}, '7')">7</button>
            <button onclick="calcInput(${question.id}, '8')">8</button>
            <button onclick="calcInput(${question.id}, '9')">9</button>
            <button onclick="calcInput(${question.id}, '/')">/</button>
            <button onclick="calcInput(${question.id}, '4')">4</button>
            <button onclick="calcInput(${question.id}, '5')">5</button>
            <button onclick="calcInput(${question.id}, '6')">6</button>
            <button onclick="calcInput(${question.id}, '*')">×</button>
            <button onclick="calcInput(${question.id}, '1')">1</button>
            <button onclick="calcInput(${question.id}, '2')">2</button>
            <button onclick="calcInput(${question.id}, '3')">3</button>
            <button onclick="calcInput(${question.id}, '-')">-</button>
            <button onclick="calcInput(${question.id}, '0')">0</button>
            <button onclick="calcInput(${question.id}, '.')">.</button>
            <button onclick="calcResult(${question.id})">=</button>
            <button onclick="calcInput(${question.id}, '+')">+</button>
            <button onclick="calcClear(${
              question.id
            })" class="calc-clear">C</button>
          </div>
        </div>
      </div>
    </div>
  `
}

// Utility functions
function toRoman(num) {
  const romanNumerals = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']
  return romanNumerals[num] || num.toString()
}

function saveEssayStep(questionId, step, value) {
  if (!currentEssayData.userWork[questionId]) {
    currentEssayData.userWork[questionId] = {}
  }
  currentEssayData.userWork[questionId][step] = value
  console.log(`Đã lưu bước ${step} cho câu ${questionId}:`, value)
}

// Calculator functions
function calcInput(questionId, value) {
  const display = document.getElementById(`calc-display-${questionId}`)
  if (display.value === '0' || display.value === '') {
    display.value = value
  } else {
    display.value += value
  }
}

function calcResult(questionId) {
  const display = document.getElementById(`calc-display-${questionId}`)
  try {
    const result = eval(display.value.replace('×', '*'))
    display.value = parseFloat(result.toFixed(4))
  } catch (error) {
    display.value = 'Error'
  }
}

function calcClear(questionId) {
  document.getElementById(`calc-display-${questionId}`).value = ''
}

// Hint system
function showHint(questionId, step) {
  const question = currentEssayData.questions.find((q) => q.id === questionId)
  const hintArea = document.getElementById(`hint-${questionId}`)

  let hintText = ''
  if (step === 'general') {
    hintText = `Gợi ý: Với ${question.elements[0].symbol} và ${question.elements[1].symbol}, công thức tổng quát là ${question.elements[0].symbol}_x${question.elements[1].symbol}_y`
  } else if (step === 'valence') {
    hintText = `Gợi ý: x × ${question.elements[0].valence} = y × ${question.elements[1].valence}`
  } else if (step === 'ratio') {
    hintText = `Gợi ý: x/y = ${question.elements[1].valence}/${question.elements[0].valence}`
  }

  hintArea.innerHTML = `<div class="hint-box">💡 ${hintText}</div>`
  hintArea.style.display = 'block'

  setTimeout(() => {
    hintArea.style.display = 'none'
  }, 5000)
}

// Start essay section
async function startEssaySection() {
  await loadEssayQuestions()
  displayEssaySection()
}

// Calculate molecular mass
function calculateMolecularMass(questionId) {
  const question = currentEssayData.questions.find((q) => q.id === questionId)
  if (!question || question.type !== 'essay-percentage') return

  let totalMass = 0
  question.compound.elements.forEach((el) => {
    totalMass += el.atomicMass * el.quantity
  })

  document.getElementById(`molecular-mass-${questionId}`).value = totalMass
  saveEssayStep(questionId, 'molecular', totalMass)

  // Show calculation in calculator
  const calcDisplay = document.getElementById(`calc-display-${questionId}`)
  if (calcDisplay) {
    calcDisplay.value = totalMass
  }
}

// Calculate percentage for specific element
function calculatePercentage(questionId, elementSymbol) {
  const question = currentEssayData.questions.find((q) => q.id === questionId)
  if (!question) return

  const element = question.compound.elements.find(
    (el) => el.symbol === elementSymbol
  )
  if (!element) return

  // Get molecular mass
  const molecularMassInput = document.getElementById(
    `molecular-mass-${questionId}`
  )
  let molecularMass = parseFloat(molecularMassInput.value)

  if (!molecularMass) {
    // Calculate if not provided
    molecularMass = 0
    question.compound.elements.forEach((el) => {
      molecularMass += el.atomicMass * el.quantity
    })
    molecularMassInput.value = molecularMass
  }

  // Calculate percentage
  const elementMass = element.atomicMass * element.quantity
  const percentage = ((elementMass / molecularMass) * 100).toFixed(2)

  document.getElementById(`percent-${elementSymbol}-${questionId}`).value =
    percentage
  saveEssayStep(questionId, `percent_${elementSymbol}`, percentage)

  // Show calculation in calculator
  const calcDisplay = document.getElementById(`calc-display-${questionId}`)
  if (calcDisplay) {
    calcDisplay.value = `${elementMass}/${molecularMass}*100=${percentage}`
  }
}

// Verify percentages sum to 100%
function verifyPercentages(questionId) {
  const question = currentEssayData.questions.find((q) => q.id === questionId)
  if (!question) return

  let totalPercentage = 0
  let allFilled = true

  question.compound.elements.forEach((el) => {
    const percentInput = document.getElementById(
      `percent-${el.symbol}-${questionId}`
    )
    const value = parseFloat(percentInput.value)
    if (isNaN(value)) {
      allFilled = false
    } else {
      totalPercentage += value
    }
  })

  const resultDiv = document.getElementById(`verification-result-${questionId}`)
  if (!resultDiv) {
    const verificationDiv = document.querySelector(
      `#essay-${questionId} .verification`
    )
    if (verificationDiv) {
      const newResultDiv = document.createElement('div')
      newResultDiv.id = `verification-result-${questionId}`
      newResultDiv.className = 'verification-result'
      verificationDiv.appendChild(newResultDiv)
    }
  }

  const resultElement = document.getElementById(
    `verification-result-${questionId}`
  )
  if (resultElement) {
    if (!allFilled) {
      resultElement.textContent = 'Vui lòng điền đầy đủ tất cả phần trăm'
      resultElement.className = 'verification-result verification-error'
    } else if (Math.abs(totalPercentage - 100) < 0.1) {
      resultElement.textContent = `✓ Đúng! Tổng = ${totalPercentage.toFixed(
        2
      )}%`
      resultElement.className = 'verification-result verification-success'
    } else {
      resultElement.textContent = `✗ Sai! Tổng = ${totalPercentage.toFixed(
        2
      )}% (phải bằng 100%)`
      resultElement.className = 'verification-result verification-error'
    }
  }
}

// Check formula answer
function checkFormulaAnswer(questionId) {
  const question = currentEssayData.questions.find((q) => q.id === questionId)
  if (!question || question.type !== 'essay-formula') return

  const userAnswer = document
    .getElementById(`final-formula-${questionId}`)
    .value.trim()
  const correctAnswer = question.solution.finalAnswer

  const hintArea = document.getElementById(`hint-${questionId}`)
  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    hintArea.innerHTML = `<div class="hint-box" style="background: #d4edda; border-color: #c3e6cb;">✓ Chính xác! Công thức đúng là ${correctAnswer}</div>`
  } else {
    hintArea.innerHTML = `<div class="hint-box" style="background: #f8d7da; border-color: #f5c6cb;">✗ Chưa đúng. Công thức đúng là ${correctAnswer}. Hãy kiểm tra lại các bước trước.</div>`
  }
  hintArea.style.display = 'block'

  setTimeout(() => {
    hintArea.style.display = 'none'
  }, 8000)
}

// Check all essay answers
function checkEssayAnswers() {
  let allCorrect = true
  let results = []

  currentEssayData.questions.forEach((question) => {
    if (question.type === 'essay-formula') {
      const userAnswer = document
        .getElementById(`final-formula-${question.id}`)
        ?.value?.trim()
      const isCorrect =
        userAnswer?.toLowerCase() ===
        question.solution.finalAnswer.toLowerCase()
      results.push({
        questionId: question.id,
        type: 'formula',
        correct: isCorrect,
        userAnswer,
        correctAnswer: question.solution.finalAnswer,
      })
      if (!isCorrect) allCorrect = false
    } else if (question.type === 'essay-percentage') {
      const molecularMass = document.getElementById(
        `molecular-mass-${question.id}`
      )?.value
      let percentageCorrect = true
      question.compound.elements.forEach((el) => {
        const userPercent = document.getElementById(
          `percent-${el.symbol}-${question.id}`
        )?.value
        const correctPercent = question.solution.finalAnswer[el.symbol]
        if (
          Math.abs(parseFloat(userPercent) - parseFloat(correctPercent)) > 0.5
        ) {
          percentageCorrect = false
        }
      })
      results.push({
        questionId: question.id,
        type: 'percentage',
        correct: percentageCorrect,
      })
      if (!percentageCorrect) allCorrect = false
    }
  })

  // Display results
  const container = document.querySelector('.essay-section')
  let resultHtml = `
    <div class="essay-results" style="background: ${
      allCorrect ? '#d4edda' : '#f8d7da'
    }; padding: 2rem; border-radius: 8px; margin: 2rem 0;">
      <h3>KẾT QUẢ PHẦN TỰ LUẬN</h3>
      <p><strong>Tổng điểm:</strong> ${
        results.filter((r) => r.correct).length
      }/${results.length}</p>
      ${results
        .map(
          (result) => `
        <div style="margin: 1rem 0;">
          <strong>Câu ${result.questionId}:</strong> 
          ${result.correct ? '✓ Đúng' : '✗ Sai'}
          ${
            result.type === 'formula' && !result.correct
              ? ` (Đáp án: ${result.correctAnswer})`
              : ''
          }
        </div>
      `
        )
        .join('')}
    </div>
  `

  container.innerHTML += resultHtml
}

// Show essay solutions
function showEssaySolutions() {
  const container = document.querySelector('.essay-section')
  if (!container) return

  let solutionHtml = `
    <div class="essay-solutions" style="background: #e3f2fd; padding: 2rem; border-radius: 8px; margin: 2rem 0;">
      <h3>LỜI GIẢI CHI TIẾT</h3>
      ${currentEssayData.questions
        .map(
          (question) => `
        <div style="margin: 2rem 0; padding: 1rem; background: white; border-radius: 6px;">
          <h4>Câu ${question.id}. ${question.question}</h4>
          <div style="margin: 1rem 0;">
            <strong>Lời giải:</strong>
            <ol style="margin: 0.5rem 0;">
              ${question.solution.steps
                .map((step) => `<li style="margin: 0.3rem 0;">${step}</li>`)
                .join('')}
            </ol>
          </div>
          ${
            question.solution.explanation
              ? `<p><strong>Giải thích:</strong> ${question.solution.explanation}</p>`
              : ''
          }
          ${
            question.solution.verification
              ? `<p style="color: #28a745;"><strong>${question.solution.verification}</strong></p>`
              : ''
          }
        </div>
      `
        )
        .join('')}
    </div>
  `

  container.innerHTML += solutionHtml

  // Render MathJax for solutions
  if (window.MathJax) {
    MathJax.typesetPromise([container]).catch((err) =>
      console.log('MathJax error:', err)
    )
  }
}

// Reset essay work
function resetEssayWork() {
  if (confirm('Bạn có chắc muốn xóa toàn bộ bài làm và bắt đầu lại?')) {
    currentEssayData.userWork = {}

    // Clear all inputs
    document.querySelectorAll('.essay-section input').forEach((input) => {
      input.value = ''
    })

    // Clear results and solutions
    const results = document.querySelector('.essay-results')
    const solutions = document.querySelector('.essay-solutions')
    if (results) results.remove()
    if (solutions) solutions.remove()

    // Clear calculator displays
    document.querySelectorAll('[id^="calc-display-"]').forEach((display) => {
      display.value = ''
    })

    alert('Đã xóa bài làm. Bạn có thể bắt đầu lại từ đầu.')
  }
}

// Export for use in main quiz
if (typeof window !== 'undefined') {
  window.startEssaySection = startEssaySection
}
