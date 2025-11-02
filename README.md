# 📚 Hệ thống Ôn thi Lớp 7 - Grade 7 Quiz System

Ứng dụng web tương tác giúp học sinh lớp 7 ôn tập và kiểm tra kiến thức qua các đề thi trắc nghiệm, tự luận, và câu hỏi đúng/sai.

---

## 🎯 Tính năng chính

### ✨ Đang hoạt động
- **5 bộ đề thi hoàn chỉnh**:
  - 📜 Lịch sử & Địa lí: Cuối kì 1 (2024-2025), Giữa kì 1 (2024-2025), Giữa kì 1 (2025-2026 Đề 1 & Đề 2)
  - 🔬 Khoa học tự nhiên: Giữa kì 1 (2024-2025)
- **4 loại câu hỏi**: Trắc nghiệm (A/B/C/D), Đúng/Sai, Điền từ, Tự luận
- **🔊 Âm thanh tương tác**: 11 hiệu ứng âm thanh (click, đúng/sai, hoàn thành, lỗi...)
- **💡 Gợi ý thu gọn**: Sử dụng HTML5 `<details>` element, có thể mở/đóng
- **📊 Ma trận điểm tự động**: Tính điểm theo từng phần (trắc nghiệm, đúng/sai, điền từ, tự luận)
- **🎨 Giao diện chuyên nghiệp**: Typography system với 3 Google Fonts, màu sắc nhất quán

### 🚧 Đang phát triển
- Thi Giữa kì 2 & Cuối kì 2 (Lịch sử & Địa lí)
- Toán học (4 kỳ)
- Văn học (4 kỳ)
- Ngoại ngữ (4 kỳ)
- KHTN Cuối kì 1, Giữa kì 2, Cuối kì 2

---

## 📁 Cấu trúc dự án

```
📦 Học HTML-CSS-JS/
├── 📄 index.html                 # Trang chính
├── 🎨 main.css                   # CSS chính (typography, colors, layout)
├── ⚙️ main.js                    # Logic chung (navigation, sound, comingSoon)
├── 🔊 sound.js                   # QuizSound API
│
├── 📂 assets/
│   └── sounds/                   # 11 file MP3 (ui-click, correct, wrong...)
│
├── 📂 data/                      # Dữ liệu đề thi (22 files JSON)
│   ├── questions_*.json          # Câu trắc nghiệm
│   ├── true_false_*.json         # Câu đúng/sai
│   ├── short_answer_*.json       # Câu điền từ
│   └── essay_questions_*.json    # Câu tự luận
│
├── 🎯 Quiz Handlers (5 files):
│   ├── lichsu-dialy-quiz.js                      # CK1 2024-2025
│   ├── lichsu-dialy-gk1-quiz.js                  # GK1 2024-2025
│   ├── lichsu-dialy-gk1-2025-2026-quiz.js        # GK1 2025-2026 Đề 1
│   ├── lichsu-dialy-gk1-2025-2026-de2-quiz.js    # GK1 2025-2026 Đề 2
│   └── khtn-quiz.js                              # KHTN GK1 2024-2025
│
├── 🛠️ Utilities:
│   ├── atom-question.js          # Render câu trắc nghiệm
│   ├── essay-questions.js        # Render câu tự luận
│   └── fill-blank-question.js    # Render câu điền từ
│
└── 📂 phanTich/                  # Tài liệu thiết kế
    ├── HƯỚNG_DẪN_SỬ_DỤNG.md
    ├── TYPOGRAPHY_GUIDE.md
    └── ...
```

---

## 🚀 Cách sử dụng

### Cho học sinh:
1. Mở `index.html` trong trình duyệt
2. Chọn môn học từ menu điều hướng
3. Chọn kỳ thi (Giữa kì 1, Cuối kì 1...)
4. Nhấn nút **"Thi [tên kỳ]"** để bắt đầu
5. Làm bài trong modal quiz, nhấn **"Nộp bài"** khi hoàn thành
6. Xem kết quả và gợi ý đáp án

### Cho giáo viên/Quản trị:
- Thêm đề thi mới: Xem phần [Hướng dẫn thêm đề thi](#-hướng-dẫn-thêm-đề-thi-mới)
- Sửa câu hỏi: Chỉnh sửa trực tiếp trong các file JSON tương ứng
- Kiểm tra lỗi: Xem file `data/KIỂM_TRA_SỬA_LỖI_ĐỀ_THI.md`

---

## 📝 Hướng dẫn thêm đề thi mới

### Bước 1: Chuẩn bị 4 file JSON

Tạo 4 file trong thư mục `data/` với format:

#### 1. `questions_[tên_đề].json` - Câu trắc nghiệm
```json
[
  {
    "id": 1,
    "question": "Nội dung câu hỏi...",
    "options": ["A. Đáp án 1", "B. Đáp án 2", "C. Đáp án 3", "D. Đáp án 4"],
    "correctAnswer": 0,
    "hint": "Gợi ý giải thích (tùy chọn)"
  }
]
```

#### 2. `true_false_[tên_đề].json` - Câu đúng/sai
```json
[
  {
    "id": 13,
    "question": "Nhận định cần đánh giá",
    "statements": [
      {
        "id": "a",
        "text": "Nhận định con thứ nhất",
        "correct": true
      },
      {
        "id": "b",
        "text": "Nhận định con thứ hai",
        "correct": false
      }
    ],
    "hint": "Gợi ý (tùy chọn)"
  }
]
```

**⚠️ LƯU Ý**: `statements` phải là **ARRAY**, không phải object!

#### 3. `short_answer_[tên_đề].json` - Câu điền từ
```json
[
  {
    "id": 19,
    "question": "Câu hỏi điền từ...",
    "blanks": [
      {
        "id": "a",
        "answer": "đáp án đúng"
      }
    ],
    "hint": "Gợi ý (tùy chọn)"
  }
]
```

#### 4. `essay_questions_[tên_đề].json` - Câu tự luận
```json
[
  {
    "id": 21,
    "question": "Câu hỏi tự luận...",
    "hint": "Gợi ý làm bài:\n- Điểm 1\n- Điểm 2"
  }
]
```

### Bước 2: Tạo Quiz Handler

Tạo file `[tên-đề]-quiz.js` với cấu trúc:

```javascript
// File: new-quiz.js

// Hàm khởi động quiz
function startNewQuiz() {
  const modal = document.getElementById('quizModal-new');
  if (!modal) {
    console.error('Modal not found!');
    return;
  }

  if (window.QuizSound) {
    QuizSound.play('ui-click');
  }

  // Load tất cả 4 file JSON
  Promise.all([
    fetch('data/questions_new.json').then(r => r.json()),
    fetch('data/true_false_new.json').then(r => r.json()),
    fetch('data/short_answer_new.json').then(r => r.json()),
    fetch('data/essay_questions_new.json').then(r => r.json())
  ])
  .then(([mcQuestions, tfQuestions, saQuestions, essayQuestions]) => {
    displayQuizModal_new(mcQuestions, tfQuestions, saQuestions, essayQuestions);
    modal.style.display = 'flex';
  })
  .catch(error => {
    console.error('Error loading quiz:', error);
    alert('Không thể tải đề thi. Vui lòng thử lại!');
  });
}

// Hàm hiển thị quiz
function displayQuizModal_new(mcQuestions, tfQuestions, saQuestions, essayQuestions) {
  const modal = document.getElementById('quizModal-new');
  const content = modal.querySelector('.quiz-content');
  
  let html = '<h2>Tên đề thi</h2>';
  
  // Phần 1: Trắc nghiệm
  html += '<h3>Phần 1: Câu hỏi trắc nghiệm</h3>';
  mcQuestions.forEach(q => {
    html += renderAtomQuestion(q, 'new');
  });
  
  // Phần 2: Đúng/Sai
  html += '<h3>Phần 2: Câu hỏi Đúng/Sai</h3>';
  tfQuestions.forEach(q => {
    html += `
      <div class="question" data-id="${q.id}-new">
        <p class="question-text">${q.id}. ${q.question}</p>
        <div class="true-false-statements">
          ${q.statements.map(stmt => `
            <div class="tf-statement">
              <span class="statement-label">${stmt.id})</span>
              <span class="statement-text">${stmt.text}</span>
              <div class="tf-options">
                <label>
                  <input type="radio" name="tf-${q.id}-${stmt.id}-new" value="true">
                  <span class="tf-label">Đúng</span>
                </label>
                <label>
                  <input type="radio" name="tf-${q.id}-${stmt.id}-new" value="false">
                  <span class="tf-label">Sai</span>
                </label>
              </div>
            </div>
          `).join('')}
        </div>
        ${q.hint ? `
          <details class="answer-hint">
            <summary>💡 Gợi ý</summary>
            <pre>${q.hint}</pre>
          </details>
        ` : ''}
      </div>
    `;
  });
  
  // Phần 3: Điền từ
  html += '<h3>Phần 3: Điền từ</h3>';
  saQuestions.forEach(q => {
    html += renderFillBlankQuestion(q, 'new');
  });
  
  // Phần 4: Tự luận
  html += '<h3>Phần 4: Câu hỏi tự luận</h3>';
  essayQuestions.forEach(q => {
    html += renderEssayQuestion(q, 'new');
  });
  
  html += '<button class="submit-btn" onclick="submitQuiz_new()">Nộp bài</button>';
  content.innerHTML = html;
}

// Hàm nộp bài
function submitQuiz_new() {
  if (!confirm('Bạn có chắc muốn nộp bài?')) return;
  
  if (window.QuizSound) {
    QuizSound.play('ui-click');
  }
  
  let score = 0;
  let maxScore = 0;
  
  // Tính điểm từng phần...
  // (xem các file quiz hiện có để tham khảo)
  
  alert(`🎉 Hoàn thành!\n\nĐiểm của bạn: ${score.toFixed(2)}/${maxScore}`);
  
  if (window.QuizSound) {
    QuizSound.play(score >= maxScore * 0.8 ? 'complete' : 'ui-select');
  }
}

// Hàm đóng modal
function closeQuizModal_new() {
  const modal = document.getElementById('quizModal-new');
  if (modal) {
    modal.style.display = 'none';
  }
  if (window.QuizSound) {
    QuizSound.play('ui-back');
  }
}
```

### Bước 3: Cập nhật `index.html`

Thêm vào cuối `<body>` (trước `</body>`):

```html
<!-- Modal cho đề thi mới -->
<div id="quizModal-new" class="quiz-modal">
  <div class="quiz-container">
    <div class="quiz-header">
      <h2>Đề thi mới</h2>
      <button class="close-btn" onclick="closeQuizModal_new()">✖</button>
    </div>
    <div class="quiz-content">
      <!-- Content sẽ được tạo bởi JS -->
    </div>
  </div>
</div>

<!-- Script cho đề thi mới -->
<script src="new-quiz.js"></script>
```

Thêm nút thi vào section tương ứng:

```html
<li>
  <button onclick="startNewQuiz()">Thi Giữa kì 1</button>
</li>
```

### Bước 4: Kiểm tra

1. Mở trình duyệt, ấn F12 để mở Console
2. Nhấn nút "Thi [tên kỳ]"
3. Kiểm tra:
   - ✅ Modal hiện ra
   - ✅ Tất cả câu hỏi hiển thị đầy đủ
   - ✅ Radio buttons/Inputs hoạt động
   - ✅ Gợi ý có thể mở/đóng
   - ✅ Nút "Nộp bài" tính điểm chính xác
   - ✅ Âm thanh phát đúng lúc

---

## 🎵 Hệ thống âm thanh

### QuizSound API

```javascript
// Phát âm thanh
QuizSound.play('ui-click');

// Danh sách âm thanh có sẵn:
- 'ui-click'      // Click nút
- 'ui-select'     // Chọn đáp án
- 'ui-back'       // Quay lại
- 'ui-error'      // Lỗi/Tính năng chưa có
- 'correct'       // Trả lời đúng
- 'wrong'         // Trả lời sai
- 'complete'      // Hoàn thành xuất sắc
- 'countdown'     // Đếm ngược (nếu có)
- 'time-warning'  // Cảnh báo hết giờ
- 'page-turn'     // Chuyển trang
- 'notification'  // Thông báo
```

### Bật/Tắt âm thanh

```javascript
// Trong main.js
document.getElementById('soundToggle').onclick = function() {
  const isEnabled = QuizSound.toggleSound();
  this.textContent = isEnabled ? '🔊' : '🔇';
  this.setAttribute('aria-label', isEnabled ? 'Tắt âm thanh' : 'Bật âm thanh');
};
```

---

## 🎨 Design System

### Typography

```css
/* Headings */
font-family: 'Montserrat', sans-serif;
/* Body text */
font-family: 'Inter Tight', sans-serif;
/* Literary content */
font-family: 'Source Serif 4', serif;

/* Type Scale: 1.414 (Augmented Fourth) */
--base: 16px
h1: 3.998rem
h2: 2.827rem
h3: 2rem
p: 1.414rem
```

### Colors

```css
:root {
  --primary: #219ebc;      /* Blue - Interactive elements */
  --secondary: #023047;    /* Dark blue - Headers */
  --accent: #ffb703;       /* Yellow - Highlights */
  --success: #06d6a0;      /* Green - Correct answers */
  --error: #ef476f;        /* Red - Wrong answers */
  --background: #f8f9fa;   /* Light gray - Body bg */
  --surface: #ffffff;      /* White - Cards, modals */
  --text: #212529;         /* Dark gray - Body text */
  --text-secondary: #6c757d; /* Medium gray - Secondary text */
}
```

### Button States

```css
button {
  background: var(--primary);
  color: white;
  transition: all 0.3s ease;
}

button:hover {
  background: #1a7a92;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 158, 188, 0.3);
}

button:active {
  transform: translateY(0);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## 📊 Ma trận điểm

### Ví dụ: Lịch sử & Địa lí GK1 2025-2026

```javascript
const scoringMatrix = {
  multipleChoice: {
    questions: 12,     // Câu 1-12
    pointsEach: 0.5,   // 0.5 điểm/câu
    total: 6.0         // Tổng 6 điểm
  },
  trueFalse: {
    questions: 6,      // Câu 13-18 (mỗi câu 4 nhận định)
    statements: 24,    // 6 × 4 = 24 nhận định
    pointsEach: 0.0625,// 1.5 điểm / 24 = 0.0625 điểm/nhận định
    total: 1.5         // Tổng 1.5 điểm
  },
  shortAnswer: {
    questions: 2,      // Câu 19-20
    pointsEach: 0.5,   // 0.5 điểm/câu
    total: 1.0         // Tổng 1 điểm
  },
  essay: {
    questions: 1,      // Câu 21
    pointsEach: 1.5,   // 1.5 điểm/câu
    total: 1.5         // Tổng 1.5 điểm
  },
  // TỔNG: 10 ĐIỂM
};
```

**Cách tính trong hàm `submitQuiz_()`:**

```javascript
// 1. Trắc nghiệm
mcQuestions.forEach(q => {
  const selected = document.querySelector(`input[name="q${q.id}-suffix"]:checked`);
  if (selected && parseInt(selected.value) === q.correctAnswer) {
    score += 0.5;
  }
  maxScore += 0.5;
});

// 2. Đúng/Sai
tfQuestions.forEach(q => {
  q.statements.forEach(stmt => {
    const selected = document.querySelector(`input[name="tf-${q.id}-${stmt.id}-suffix"]:checked`);
    if (selected) {
      const userAnswer = selected.value === 'true';
      if (userAnswer === stmt.correct) {
        score += 1.5 / 24; // 0.0625
      }
    }
    maxScore += 1.5 / 24;
  });
});

// 3. Điền từ (so sánh chuẩn hóa)
saQuestions.forEach(q => {
  q.blanks.forEach(blank => {
    const input = document.querySelector(`input[name="blank-${q.id}-${blank.id}-suffix"]`);
    if (input) {
      const userAnswer = input.value.trim().toLowerCase();
      const correctAnswer = blank.answer.trim().toLowerCase();
      if (userAnswer === correctAnswer) {
        score += 0.5;
      }
    }
    maxScore += 0.5;
  });
});

// 4. Tự luận (không tính điểm tự động)
maxScore += essayQuestions.length * 1.5;
```

---

## 🐛 Xử lý lỗi thường gặp

### Lỗi 1: Radio buttons không hiện (True/False)

**Nguyên nhân**: `statements` trong JSON là object thay vì array

**Sửa**:
```json
// ❌ SAI
{
  "statements": {
    "a": "Text...",
    "b": "Text..."
  },
  "answers": {
    "a": true,
    "b": false
  }
}

// ✅ ĐÚNG
{
  "statements": [
    {"id": "a", "text": "Text...", "correct": true},
    {"id": "b", "text": "Text...", "correct": false}
  ]
}
```

### Lỗi 2: Submit button không hoạt động

**Kiểm tra**:
1. Console có lỗi không? (F12 → Console)
2. Tên hàm `submitQuiz_[suffix]()` đúng chưa?
3. ID của modal (`quizModal-[suffix]`) khớp với code JS chưa?
4. Tất cả JSON files load thành công chưa? (xem Network tab)

### Lỗi 3: Âm thanh không phát

**Kiểm tra**:
```javascript
// Test trong Console
QuizSound.play('ui-click'); // Phải nghe thấy âm thanh

// Kiểm tra localStorage
localStorage.getItem('soundEnabled'); // Phải là "true"
```

### Lỗi 4: Gợi ý không thu gọn được

**Kiểm tra CSS**:
```css
/* Phải có trong main.css */
.answer-hint summary {
  cursor: pointer;
  padding: 8px 12px;
  background: #e3f2fd;
  border-radius: 4px;
}

.answer-hint[open] summary {
  border-bottom: 2px solid #2196f3;
}
```

### Lỗi 5: Text trong `<pre>` bị tràn

**Đã fix trong main.css**:
```css
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  overflow-x: auto;
}
```

---

## 🔧 Tùy chỉnh nâng cao

### Thêm hẹn giờ (timer)

```javascript
let timeLeft = 45 * 60; // 45 phút
const timerInterval = setInterval(() => {
  timeLeft--;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer').textContent = 
    `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  if (timeLeft === 300) { // 5 phút cuối
    QuizSound.play('time-warning');
  }
  
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    submitQuiz_auto();
  }
}, 1000);
```

### Lưu tiến độ (localStorage)

```javascript
// Lưu câu trả lời
function saveProgress(questionId, answer) {
  const progress = JSON.parse(localStorage.getItem('quiz-progress') || '{}');
  progress[questionId] = answer;
  localStorage.setItem('quiz-progress', JSON.stringify(progress));
}

// Khôi phục khi load lại
function restoreProgress() {
  const progress = JSON.parse(localStorage.getItem('quiz-progress') || '{}');
  Object.keys(progress).forEach(qId => {
    const input = document.querySelector(`input[name="${qId}"]`);
    if (input) {
      input.value = progress[qId];
      if (input.type === 'radio') input.checked = true;
    }
  });
}
```

### Xuất kết quả PDF

```javascript
// Sử dụng jsPDF library
function exportToPDF() {
  const doc = new jsPDF();
  doc.text('Kết quả thi', 10, 10);
  doc.text(`Điểm: ${score}/${maxScore}`, 10, 20);
  // ... thêm nội dung chi tiết
  doc.save('ket-qua-thi.pdf');
}
```

---

## 📱 Responsive Design

Website đã tối ưu cho các thiết bị:
- 🖥️ Desktop (> 1024px)
- 💻 Laptop (768px - 1024px)
- 📱 Tablet (480px - 768px)
- 📱 Mobile (< 480px)

### Breakpoints

```css
@media (max-width: 768px) {
  .quiz-container {
    width: 95%;
    padding: 20px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .options {
    flex-direction: column;
  }
}
```

---

## 🤝 Đóng góp

### Báo lỗi đề thi
1. Mở file `data/KIỂM_TRA_SỬA_LỖI_ĐỀ_THI.md`
2. Ghi rõ: Câu số mấy, lỗi gì, đề thi nào
3. Liên hệ giáo viên phụ trách

### Thêm câu hỏi mới
1. Chỉnh sửa file JSON tương ứng
2. Đảm bảo format đúng (xem phần [Hướng dẫn thêm đề thi](#-hướng-dẫn-thêm-đề-thi-mới))
3. Test kỹ trước khi deploy

---

## 📞 Hỗ trợ

- 📧 Email: [email giáo viên]
- 📁 Tài liệu thiết kế: `phanTich/HƯỚNG_DẪN_SỬ_DỤNG.md`
- 🎨 Typography guide: `phanTich/TYPOGRAPHY_GUIDE.md`

---

## 📜 License

© 2025 Đến hẹn lại lên - Lớp 7. All rights reserved.

---

## 🎉 Changelog

### Version 1.2 (Current)
- ✅ Added comingSoon() function for incomplete quizzes
- ✅ Standardized all quiz buttons across all subjects
- ✅ Fixed true/false structure for Đề 2 (array format)
- ✅ Fixed `<pre>` text overflow with CSS
- ✅ Added comprehensive README.md

### Version 1.1
- ✅ Added Lịch sử GK1 2025-2026 Đề 2
- ✅ Implemented collapsible hints with HTML5 `<details>`
- ✅ Changed KHTN button format

### Version 1.0
- ✅ Initial release with 4 quiz sets
- ✅ Sound system integration
- ✅ Typography system
- ✅ Responsive design
