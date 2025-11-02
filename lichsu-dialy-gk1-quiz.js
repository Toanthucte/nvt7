// Xử lý quiz Lịch sử & Địa lí - Giữa kì 1 (GK1)
function startLichSuDiaLiGK1Quiz() {
  // Phát âm thanh bắt đầu
  if (window.QuizSound) {
    QuizSound.play('quiz-start');
  }

  // Load tất cả các loại câu hỏi
  Promise.all([
    fetch('data/questions_lichsu_dialy_gk1_2024_2025.json').then(r => r.json()),
    fetch('data/true_false_lichsu_dialy_gk1_2024_2025.json').then(r => r.json()),
    fetch('data/short_answer_lichsu_dialy_gk1_2024_2025.json').then(r => r.json()),
    fetch('data/essay_questions_lichsu_dialy_gk1_2024_2025.json').then(r => r.json())
  ])
    .then(([mcQuestions, tfQuestions, saQuestions, essayQuestions]) => {
      // Gộp tất cả câu hỏi lại
      const allQuestions = [
        ...mcQuestions.map(q => ({...q, type: 'multiple-choice'})),
        ...tfQuestions,
        ...saQuestions,
        ...essayQuestions
      ];
      showQuizModal(allQuestions, 'Lịch sử và Địa lí - Thi Giữa kì 1 (2024-2025)');
    })
    .catch(error => {
      console.error('Lỗi khi tải câu hỏi:', error);
      alert('Không thể tải câu hỏi. Vui lòng thử lại.');
    });
}

function showQuizModal(questions, title) {
  let currentQuestion = 0;
  let score = 0;
  let userAnswers = new Array(questions.length).fill(null);

  // Tạo modal
  const modal = document.createElement('div');
  modal.className = 'quiz-modal';
  modal.innerHTML = `
    <div class="quiz-content">
      <div class="quiz-header">
        <h2>${title}</h2>
        <button class="close-btn" onclick="closeQuizModal()">&times;</button>
      </div>
      <div class="quiz-body">
        <div class="question-info">
          <span class="question-number">Câu <span id="current-q">1</span>/${questions.length}</span>
          <span class="question-type" id="question-type"></span>
          <span class="question-points" id="question-points"></span>
        </div>
        <div class="question-text" id="question-text"></div>
        <div class="choices" id="choices"></div>
      </div>
      <div class="quiz-footer">
        <button id="prev-btn" onclick="prevQuestion()" disabled>Câu trước</button>
        <button id="next-btn" onclick="nextQuestion()">Câu sau</button>
        <button id="submit-btn" onclick="submitQuiz()" style="display:none;">Nộp bài</button>
      </div>
      <div class="quiz-result" id="result" style="display:none;"></div>
    </div>
  `;
  document.body.appendChild(modal);

  // Hiển thị câu hỏi đầu tiên
  showQuestion();

  function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question-text').innerHTML = q.question;
    document.getElementById('current-q').textContent = currentQuestion + 1;
    
    // Hiển thị loại câu hỏi và điểm
    const typeNames = {
      'multiple-choice': 'Trắc nghiệm',
      'true-false': 'Đúng/Sai',
      'short-answer': 'Trả lời ngắn',
      'essay': 'Tự luận'
    };
    document.getElementById('question-type').textContent = `[${typeNames[q.type] || 'Trắc nghiệm'}]`;
    document.getElementById('question-points').textContent = `(${q.points || 0.25} điểm)`;

    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';

    // Xử lý theo loại câu hỏi
    if (q.type === 'multiple-choice') {
      // Câu hỏi trắc nghiệm
      q.choices.forEach((choice, index) => {
        const choiceDiv = document.createElement('div');
        choiceDiv.className = 'choice';
        choiceDiv.innerHTML = `
          <input type="radio" name="answer" id="choice${index}" value="${index}" 
            ${userAnswers[currentQuestion] === index ? 'checked' : ''}>
          <label for="choice${index}">${choice}</label>
        `;
        choiceDiv.onclick = () => {
          document.getElementById(`choice${index}`).checked = true;
          userAnswers[currentQuestion] = index;
          // Phát âm thanh khi chọn đáp án
          if (window.QuizSound) {
            QuizSound.play('ui-click', {volume: 0.5});
          }
        };
        choicesDiv.appendChild(choiceDiv);
      });
    } else if (q.type === 'true-false') {
      // Câu hỏi đúng/sai
      q.statements.forEach((stmt, index) => {
        const stmtDiv = document.createElement('div');
        stmtDiv.className = 'tf-statement';
        stmtDiv.innerHTML = `
          <div class="statement-text"><strong>${stmt.id}.</strong> ${stmt.statement}</div>
          <div class="tf-options">
            <label>
              <input type="radio" name="stmt${index}" value="true" 
                ${userAnswers[currentQuestion]?.[index] === true ? 'checked' : ''}>
              Đúng
            </label>
            <label>
              <input type="radio" name="stmt${index}" value="false" 
                ${userAnswers[currentQuestion]?.[index] === false ? 'checked' : ''}>
              Sai
            </label>
          </div>
        `;
        choicesDiv.appendChild(stmtDiv);
        
        // Lưu câu trả lời
        stmtDiv.querySelectorAll('input').forEach(input => {
          input.addEventListener('change', () => {
            if (!userAnswers[currentQuestion]) {
              userAnswers[currentQuestion] = {};
            }
            userAnswers[currentQuestion][index] = input.value === 'true';
          });
        });
      });
    } else if (q.type === 'short-answer') {
      // Câu hỏi trả lời ngắn
      const textareaDiv = document.createElement('div');
      textareaDiv.className = 'short-answer-box';
      textareaDiv.innerHTML = `
        <textarea id="answer-textarea" rows="4" placeholder="Nhập câu trả lời của bạn...">${userAnswers[currentQuestion] || ''}</textarea>
        <details class="answer-hint">
          <summary>
            <span class="hint-icon">💡</span>
            <span>Click để xem gợi ý đáp án</span>
          </summary>
          <div class="hint-content">
            <strong>Đáp án:</strong> ${q.answer || 'Trả lời ngắn gọn, đầy đủ ý chính'}
          </div>
        </details>
      `;
      choicesDiv.appendChild(textareaDiv);
      
      // Lưu câu trả lời
      document.getElementById('answer-textarea').addEventListener('input', (e) => {
        userAnswers[currentQuestion] = e.target.value;
      });
    } else if (q.type === 'essay' || q.type === 'essay-data-analysis') {
      // Câu hỏi tự luận
      const essayDiv = document.createElement('div');
      essayDiv.className = 'essay-box';
      
      let dataTableHtml = '';
      if (q.data && q.data.table) {
        const table = q.data.table;
        dataTableHtml = `
          <div class="data-table-container">
            <h4>${q.data.title}</h4>
            <table class="data-table">
              <thead>
                <tr>
                  ${table.headers.map(h => `<th>${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${table.rows.map(row => `
                  <tr>
                    <td><strong>${row.label}</strong></td>
                    ${row.values.map(v => `<td>${v}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <p class="data-source"><em>${q.data.source}</em></p>
          </div>
        `;
      }
      
      let guidelinesHtml = '';
      if (q.guidelines) {
        guidelinesHtml = `
          <div class="essay-guidelines">
            <strong>Hướng dẫn:</strong>
            <ul>${q.guidelines.map(g => `<li>${g}</li>`).join('')}</ul>
          </div>
        `;
      }
      
      essayDiv.innerHTML = `
        ${dataTableHtml}
        ${guidelinesHtml}
        <textarea id="answer-textarea" rows="8" placeholder="Trình bày câu trả lời của bạn...">${userAnswers[currentQuestion] || ''}</textarea>
      `;
      choicesDiv.appendChild(essayDiv);
      
      // Lưu câu trả lời
      document.getElementById('answer-textarea').addEventListener('input', (e) => {
        userAnswers[currentQuestion] = e.target.value;
      });
    }

    // Cập nhật nút điều hướng
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    document.getElementById('next-btn').style.display = 
      currentQuestion === questions.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submit-btn').style.display = 
      currentQuestion === questions.length - 1 ? 'inline-block' : 'none';
  }

  window.nextQuestion = function() {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion();
      // Phát âm thanh chuyển câu
      if (window.QuizSound) {
        QuizSound.play('card-slide', {volume: 0.4});
      }
    }
  };

  window.prevQuestion = function() {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion();
      // Phát âm thanh chuyển câu
      if (window.QuizSound) {
        QuizSound.play('card-slide', {volume: 0.4});
      }
    }
  };

  window.submitQuiz = function() {
    // Tính điểm
    score = 0;
    let correctCount = 0;
    
    questions.forEach((q, index) => {
      const userAnswer = userAnswers[index];
      let isCorrect = false;
      
      if (q.type === 'multiple-choice') {
        isCorrect = userAnswer === q.answer;
        if (isCorrect) {
          score += q.points || 0.25;
          correctCount++;
        }
      } else if (q.type === 'true-false') {
        // Kiểm tra tất cả các statements
        let allCorrect = true;
        if (userAnswer && q.statements) {
          q.statements.forEach((stmt, idx) => {
            if (userAnswer[idx] !== stmt.answer) {
              allCorrect = false;
            }
          });
          if (allCorrect) {
            score += q.points || 1;
            correctCount++;
          }
        }
      }
      // Short answer và essay không tự động chấm điểm
    });

    // Hiển thị kết quả
    const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0.25), 0);
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    
    let reviewHtml = '';
    questions.forEach((q, i) => {
      const userAnswer = userAnswers[i];
      let answerHtml = '';
      
      if (q.type === 'multiple-choice') {
        const isCorrect = userAnswer === q.answer;
        answerHtml = `
          <div class="answer-item ${isCorrect ? 'correct' : 'incorrect'}">
            <div class="answer-header">
              <strong>Câu ${i + 1}:</strong> [Trắc nghiệm - ${q.points || 0.25} điểm] - <em>${q.topic}</em>
            </div>
            <div class="answer-question">${q.question}</div>
            <div class="answer-detail">
              <strong>Đáp án của bạn:</strong> ${userAnswer !== null && userAnswer !== undefined ? q.choices[userAnswer] : '<em>Chưa trả lời</em>'}
            </div>
            <div class="answer-correct">
              <strong>Đáp án đúng:</strong> ${q.choices[q.answer]}
            </div>
            ${q.explanation ? `<div class="answer-explanation"><strong>Giải thích:</strong> ${q.explanation}</div>` : ''}
          </div>
        `;
      } else if (q.type === 'true-false') {
        let allCorrect = true;
        let statementsHtml = '';
        
        q.statements.forEach((stmt, idx) => {
          const userStmtAnswer = userAnswer?.[idx];
          const isStmtCorrect = userStmtAnswer === stmt.answer;
          if (!isStmtCorrect) allCorrect = false;
          
          statementsHtml += `
            <div class="tf-result ${isStmtCorrect ? 'correct' : 'incorrect'}">
              <div><strong>${stmt.id}.</strong> ${stmt.statement}</div>
              <div>Bạn chọn: <strong>${userStmtAnswer === true ? 'Đúng' : userStmtAnswer === false ? 'Sai' : '<em>Chưa trả lời</em>'}</strong></div>
              <div>Đáp án: <strong>${stmt.answer ? 'Đúng' : 'Sai'}</strong></div>
              ${stmt.explanation ? `<div class="answer-explanation">${stmt.explanation}</div>` : ''}
            </div>
          `;
        });
        
        answerHtml = `
          <div class="answer-item ${allCorrect ? 'correct' : 'incorrect'}">
            <div class="answer-header">
              <strong>Câu ${i + 1}:</strong> [Đúng/Sai - ${q.points || 1} điểm] - <em>${q.topic}</em>
            </div>
            <div class="answer-question">${q.question}</div>
            <div class="tf-statements">
              ${statementsHtml}
            </div>
          </div>
        `;
      } else if (q.type === 'short-answer') {
        answerHtml = `
          <div class="answer-item needs-review">
            <div class="answer-header">
              <strong>Câu ${i + 1}:</strong> [Trả lời ngắn - ${q.points || 0.5} điểm] - <em>${q.topic}</em>
            </div>
            <div class="answer-question">${q.question}</div>
            <div class="answer-detail">
              <strong>Câu trả lời của bạn:</strong><br>
              <div class="user-answer-text">${userAnswer || '<em>Chưa trả lời</em>'}</div>
            </div>
            <div class="answer-correct">
              <strong>Đáp án tham khảo:</strong><br>
              ${q.answer}
            </div>
            ${q.rubric ? `
              <div class="answer-rubric">
                <strong>Tiêu chí chấm điểm:</strong>
                <ul>
                  <li>${q.rubric.fullCredit}</li>
                  <li>${q.rubric.partialCredit}</li>
                  <li>${q.rubric.noCredit}</li>
                </ul>
              </div>
            ` : ''}
          </div>
        `;
      } else if (q.type === 'essay' || q.type === 'essay-data-analysis') {
        let dataTableHtml = '';
        if (q.data && q.data.table) {
          const table = q.data.table;
          dataTableHtml = `
            <div class="data-table-container">
              <h4>${q.data.title}</h4>
              <table class="data-table">
                <thead>
                  <tr>
                    ${table.headers.map(h => `<th>${h}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${table.rows.map(row => `
                    <tr>
                      <td><strong>${row.label}</strong></td>
                      ${row.values.map(v => `<td>${v}</td>`).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <p class="data-source"><em>${q.data.source}</em></p>
            </div>
          `;
        }
        
        answerHtml = `
          <div class="answer-item needs-review">
            <div class="answer-header">
              <strong>Câu ${i + 1}:</strong> [Tự luận - ${q.points || 1} điểm] - <em>${q.topic}</em>
            </div>
            <div class="answer-question">${q.question}</div>
            ${dataTableHtml}
            <div class="answer-detail">
              <strong>Bài làm của bạn:</strong><br>
              <div class="user-answer-text">${userAnswer || '<em>Chưa trả lời</em>'}</div>
            </div>
            ${q.sampleAnswer ? `
              <div class="answer-correct">
                <strong>Bài làm tham khảo:</strong><br>
                <pre>${q.sampleAnswer}</pre>
              </div>
            ` : ''}
            ${q.rubric ? `
              <div class="answer-rubric">
                <strong>Tiêu chí chấm điểm:</strong>
                <ul>
                  ${Object.entries(q.rubric).map(([key, value]) => `<li>${value}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        `;
      }
      
      reviewHtml += answerHtml;
    });
    
    // Phát âm thanh hoàn thành
    if (window.QuizSound) {
      QuizSound.play('quiz-complete');
    }

    resultDiv.innerHTML = `
      <h3>Kết quả bài thi</h3>
      <div class="score-summary">
        <p class="score">Điểm tự động: ${score.toFixed(2)}/${totalPoints.toFixed(2)} điểm</p>
        <p>Số câu trắc nghiệm đúng: ${correctCount}/${questions.filter(q => q.type === 'multiple-choice' || q.type === 'true-false').length}</p>
        <p class="note"><em>* Câu trả lời ngắn và tự luận cần được giáo viên chấm điểm</em></p>
      </div>
      <div class="answers-review">
        <h4>Chi tiết đáp án:</h4>
        ${reviewHtml}
      </div>
      <div class="result-buttons">
        <button onclick="closeQuizModal()">Đóng</button>
        <button onclick="retakeQuiz()">Làm lại</button>
      </div>
    `;

    // Ẩn phần câu hỏi
    document.querySelector('.quiz-body').style.display = 'none';
    document.querySelector('.quiz-footer').style.display = 'none';
  };

  window.retakeQuiz = function() {
    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(questions.length).fill(null);
    document.getElementById('result').style.display = 'none';
    document.querySelector('.quiz-body').style.display = 'block';
    document.querySelector('.quiz-footer').style.display = 'flex';
    showQuestion();
  };

  window.closeQuizModal = function() {
    modal.remove();
    // Xóa các hàm global
    delete window.nextQuestion;
    delete window.prevQuestion;
    delete window.submitQuiz;
    delete window.retakeQuiz;
    delete window.closeQuizModal;
  };
}
