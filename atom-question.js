// Hàm sinh câu hỏi 21 - Điền thông tin nguyên tử ngẫu nhiên
let atomsData = []
let currentAtom = null

// Load dữ liệu nguyên tử từ file JSON
async function loadAtomsData() {
  try {
    const response = await fetch('data/chem_grade7.json')
    atomsData = await response.json()
    console.log('Đã load thành công:', atomsData.length, 'nguyên tử')
  } catch (error) {
    console.error('Lỗi khi load dữ liệu nguyên tử:', error)
  }
}

// Chọn ngẫu nhiên một nguyên tử
function getRandomAtom() {
  if (atomsData.length === 0) return null
  const randomIndex = Math.floor(Math.random() * atomsData.length)
  return atomsData[randomIndex]
}

// Tính nhóm của nguyên tử dựa trên electron lớp ngoài cùng
function getAtomGroup(shells) {
  const outerElectrons = shells[shells.length - 1]
  const groupMap = {
    1: 'IA',
    2: 'IIA',
    3: 'IIIA',
    4: 'IVA',
    5: 'VA',
    6: 'VIA',
    7: 'VIIA',
    8: 'VIIIA',
  }
  return groupMap[outerElectrons] || ''
}

// Tạo mô hình SVG đơn giản cho nguyên tử
function createAtomModel(atom) {
  const shells = atom.shells
  const maxRadius = 80
  const centerX = 100
  const centerY = 100

  let svg = `<svg width="200" height="200" viewBox="0 0 200 200" style="border: 1px solid #ccc; border-radius: 8px; background: #f8f9fa;">
    <!-- Hạt nhân -->
    <circle cx="${centerX}" cy="${centerY}" r="15" fill="#ff6b6b" stroke="#000" stroke-width="2"/>
    <text x="${centerX}" y="${
    centerY + 5
  }" text-anchor="middle" font-size="12" fill="white" font-weight="bold">${
    atom.symbol
  }</text>`

  // Vẽ các lớp electron
  shells.forEach((electronCount, index) => {
    const radius = 25 + index * 20
    svg += `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="none" stroke="#4ecdc4" stroke-width="2" stroke-dasharray="5,5"/>`

    // Vẽ electron
    for (let i = 0; i < electronCount; i++) {
      const angle = (2 * Math.PI * i) / electronCount
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      svg += `<circle cx="${x}" cy="${y}" r="4" fill="#45b7d1"/>`
    }
  })

  svg += '</svg>'
  return svg
}

// Render câu hỏi điền thông tin nguyên tử
function renderAtomQuestion() {
  if (atomsData.length === 0) {
    console.error('Chưa load dữ liệu nguyên tử')
    return
  }

  currentAtom = getRandomAtom()
  if (!currentAtom) return

  const atomModel = createAtomModel(currentAtom)
  const shells = currentAtom.shells

  const html = `
    <div class="atom-question-container">
      <h3>Câu 21. Quan sát mô hình cấu tạo nguyên tử ${currentAtom.name}</h3>
      <p>Điền các thông tin còn thiếu vào bảng:</p>
      
      <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: flex-start;">
        <div class="atom-model">
          ${atomModel}
          <p style="text-align: center; margin-top: 0.5rem; font-size: 0.9rem;">
            <strong>Cấu hình electron:</strong> ${shells.join(', ')}
          </p>
        </div>
        
        <div class="atom-table">
          <table border="1" cellpadding="8" style="border-collapse: collapse; margin: 0;">
            <tr style="background: #f0f0f0;">
              <th>Nguyên tử nguyên tố</th>
              <th>${currentAtom.symbol}</th>
            </tr>
            <tr>
              <td>Số lớp electron</td>
              <td><input type="number" id="atom-layers" style="width: 60px; padding: 4px;" /></td>
            </tr>
            <tr>
              <td>Số electron lớp ngoài cùng</td>
              <td><input type="number" id="atom-outer" style="width: 60px; padding: 4px;" /></td>
            </tr>
            <tr>
              <td>Chu kì</td>
              <td><input type="number" id="atom-period" style="width: 60px; padding: 4px;" /></td>
            </tr>
            <tr>
              <td>Nhóm</td>
              <td><input type="text" id="atom-group" style="width: 80px; padding: 4px;" placeholder="VD: IIA" /></td>
            </tr>
          </table>
          
          <div style="margin-top: 1rem;">
            <button onclick="checkAtomAnswer()" style="
              background: var(--primary-color, #219EBC); 
              color: white; 
              border: none; 
              padding: 0.5rem 1rem; 
              border-radius: 4px; 
              cursor: pointer;
              font-size: 1rem;
            ">Kiểm tra đáp án</button>
            <button onclick="generateNewAtomQuestion()" style="
              background: var(--secondary-color, #023047); 
              color: white; 
              border: none; 
              padding: 0.5rem 1rem; 
              border-radius: 4px; 
              cursor: pointer;
              font-size: 1rem;
              margin-left: 0.5rem;
            ">Câu hỏi mới</button>
          </div>
          
          <div id="atom-result" style="margin-top: 1rem; padding: 0.5rem; border-radius: 4px;"></div>
        </div>
      </div>
      
      <div style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
        <strong>Thông tin tham khảo:</strong><br>
        • Tên nguyên tố: ${currentAtom.name}<br>
        • Số hiệu nguyên tử: ${currentAtom.atomic_number}<br>
        • Khối lượng nguyên tử: ${currentAtom.atomic_mass} amu
      </div>
    </div>
  `

  document.getElementById('atom-question').innerHTML = html
}

// Kiểm tra đáp án
function checkAtomAnswer() {
  if (!currentAtom) return

  const shells = currentAtom.shells
  const correctAnswers = {
    layers: shells.length,
    outer: shells[shells.length - 1],
    period: shells.length,
    group: getAtomGroup(shells),
  }

  const userAnswers = {
    layers: parseInt(document.getElementById('atom-layers').value) || 0,
    outer: parseInt(document.getElementById('atom-outer').value) || 0,
    period: parseInt(document.getElementById('atom-period').value) || 0,
    group: document.getElementById('atom-group').value.trim().toUpperCase(),
  }

  let correctCount = 0
  let totalCount = 4
  let result = '<strong>Kết quả kiểm tra:</strong><br>'

  // Kiểm tra từng đáp án
  const checks = [
    {
      label: 'Số lớp electron',
      correct: correctAnswers.layers,
      user: userAnswers.layers,
    },
    {
      label: 'Số electron lớp ngoài cùng',
      correct: correctAnswers.outer,
      user: userAnswers.outer,
    },
    {
      label: 'Chu kì',
      correct: correctAnswers.period,
      user: userAnswers.period,
    },
    { label: 'Nhóm', correct: correctAnswers.group, user: userAnswers.group },
  ]

  checks.forEach((check) => {
    const isCorrect = check.correct === check.user
    if (isCorrect) correctCount++
    result += `• ${check.label}: ${isCorrect ? '✅' : '❌'} (Đúng: ${
      check.correct
    }, Bạn trả lời: ${check.user || 'Trống'})<br>`
  })

  const score = Math.round((correctCount / totalCount) * 100)
  result += `<br><strong>Điểm số: ${correctCount}/${totalCount} (${score}%)</strong>`

  const resultDiv = document.getElementById('atom-result')
  resultDiv.innerHTML = result
  resultDiv.style.background =
    score >= 75 ? '#d4edda' : score >= 50 ? '#fff3cd' : '#f8d7da'
  resultDiv.style.border = `1px solid ${
    score >= 75 ? '#c3e6cb' : score >= 50 ? '#ffeaa7' : '#f5c6cb'
  }`
}

// Tạo câu hỏi mới
function generateNewAtomQuestion() {
  renderAtomQuestion()
  // Xóa kết quả cũ
  const resultDiv = document.getElementById('atom-result')
  if (resultDiv) {
    resultDiv.innerHTML = ''
    resultDiv.style.background = ''
    resultDiv.style.border = ''
  }
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function () {
  loadAtomsData().then(() => {
    // Tự động tạo câu hỏi đầu tiên sau khi load dữ liệu
    if (document.getElementById('atom-question')) {
      renderAtomQuestion()
    }
  })
})
