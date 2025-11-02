// Xử lý quiz Lịch sử & Địa lí - Giữa kì 1 năm học 2025-2026 - ĐỀ 2
function startLichSuDiaLiGK1_2025_2026_De2_Quiz() {
  // Phát âm thanh bắt đầu
  if (window.QuizSound) {
    QuizSound.play('quiz-start');
  }

  // Load tất cả các loại câu hỏi
  Promise.all([
    fetch('data/questions_lichsu_dialy_gk1_2025_2026_de2.json').then(r => r.json()),
    fetch('data/true_false_lichsu_dialy_gk1_2025_2026_de2.json').then(r => r.json()),
    fetch('data/short_answer_lichsu_dialy_gk1_2025_2026_de2.json').then(r => r.json()),
    fetch('data/essay_questions_lichsu_dialy_gk1_2025_2026_de2.json').then(r => r.json())
  ])
    .then(([mcQuestions, tfQuestions, saQuestions, essayQuestions]) => {
      // Gộp tất cả câu hỏi lại
      const allQuestions = [
        ...mcQuestions.map(q => ({...q, type: 'multiple-choice'})),
        ...tfQuestions,
        ...saQuestions,
        ...essayQuestions
      ];
      showQuizModal_2025_De2(allQuestions, 'Lịch sử và Địa lí - Thi Giữa kì 1 (2025-2026) - ĐỀ 2');
    })
    .catch(error => {
      console.error('Lỗi khi tải câu hỏi:', error);
      alert('Không thể tải câu hỏi. Vui lòng thử lại.');
    });
}

function showQuizModal_2025_De2(questions, title) {
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
        <button class="close-btn" onclick="closeQuizModal_2025_De2()">&times;</button>
      </div>
      <div class="quiz-body">
        <div class="question-info">
          <span class="question-number">Câu <span id="current-q-2025-de2">1</span>/${questions.length}</span>
          <span class="question-type" id="question-type-2025-de2"></span>
          <span class="question-points" id="question-points-2025-de2"></span>
        </div>
        <div class="question-text" id="question-text-2025-de2"></div>
        <div class="choices" id="choices-2025-de2"></div>
      </div>
      <div class="quiz-footer">
        <button id="prev-btn-2025-de2" onclick="prevQuestion_2025_De2()" disabled>Câu trước</button>
        <button id="next-btn-2025-de2" onclick="nextQuestion_2025_De2()">Câu sau</button>
        <button id="submit-btn-2025-de2" onclick="submitQuiz_2025_De2()" style="display:none;">Nộp bài</button>
      </div>
      <div class="quiz-result" id="result-2025-de2" style="display:none;"></div>
    </div>
  `;
  document.body.appendChild(modal);

  // Hiển thị câu hỏi đầu tiên
  showQuestion();

  function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question-text-2025-de2').innerHTML = q.question;
    document.getElementById('current-q-2025-de2').textContent = currentQuestion + 1;
    
    // Hiển thị loại câu hỏi và điểm
    const typeNames = {
      'multiple-choice': 'Trắc nghiệm',
      'true-false': 'Đúng/Sai',
      'short-answer': 'Trả lời ngắn',
      'essay': 'Tự luận'
    };
    document.getElementById('question-type-2025-de2').textContent = `[${typeNames[q.type] || 'Trắc nghiệm'}]`;
    document.getElementById('question-points-2025-de2').textContent = `(${q.points || 0.25} điểm)`;

    const choicesDiv = document.getElementById('choices-2025-de2');
    choicesDiv.innerHTML = '';

    // Xử lý theo loại câu hỏi
    if (q.type === 'multiple-choice') {
      // Câu hỏi trắc nghiệm
      q.choices.forEach((choice, index) => {
        const choiceDiv = document.createElement('div');
        choiceDiv.className = 'choice';
        choiceDiv.innerHTML = `
          <input type="radio" name="answer-2025-de2" id="choice-2025-de2-${index}" value="${index}" 
            ${userAnswers[currentQuestion] === index ? 'checked' : ''}>
          <label for="choice-2025-de2-${index}">${choice}</label>
        `;
        choiceDiv.onclick = () => {
          document.getElementById(`choice-2025-de2-${index}`).checked = true;
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
        stmtDiv.className = 'statement';
        stmtDiv.innerHTML = `
          <div class="statement-text">${stmt.id}) ${stmt.text}</div>
          <div class="statement-choices">
            <label>
              <input type="radio" name="stmt-2025-de2-${index}" value="true" 
                ${userAnswers[currentQuestion]?.[index] === true ? 'checked' : ''}>
              Đúng
            </label>
            <label>
              <input type="radio" name="stmt-2025-de2-${index}" value="false" 
                ${userAnswers[currentQuestion]?.[index] === false ? 'checked' : ''}>
              Sai
            </label>
          </div>
        `;
        
        const radioInputs = stmtDiv.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(radio => {
          radio.addEventListener('change', () => {
            if (!userAnswers[currentQuestion]) {
              userAnswers[currentQuestion] = {};
            }
            userAnswers[currentQuestion][index] = radio.value === 'true';
            // Phát âm thanh
            if (window.QuizSound) {
              QuizSound.play('ui-click', {volume: 0.5});
            }
          });
        });
        
        choicesDiv.appendChild(stmtDiv);
      });
    } else if (q.type === 'short-answer') {
      // Câu trả lời ngắn
      const textareaDiv = document.createElement('div');
      textareaDiv.className = 'short-answer-box';
      textareaDiv.innerHTML = `
        <textarea 
          id="answer-textarea-2025-de2" 
          rows="3" 
          placeholder="Nhập câu trả lời của bạn..."
          style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;"
        >${userAnswers[currentQuestion] || ''}</textarea>
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
      
      const textarea = textareaDiv.querySelector('textarea');
      textarea.addEventListener('input', () => {
        userAnswers[currentQuestion] = textarea.value;
      });
      
      choicesDiv.appendChild(textareaDiv);
    } else if (q.type === 'essay') {
      // Câu tự luận
      const essayDiv = document.createElement('div');
      essayDiv.className = 'essay-answer-box';
      essayDiv.innerHTML = `
        <div class="essay-info" style="background: #e7f3ff; padding: 1rem; border-radius: 4px; margin-bottom: 1rem;">
          <strong>Hướng dẫn:</strong> Trả lời câu hỏi tự luận một cách đầy đủ, logic và có dẫn chứng cụ thể.
          ${q.level ? `<br><strong>Mức độ:</strong> ${q.level === 'thông hiểu' ? 'Thông hiểu' : 'Vận dụng'}` : ''}
        </div>
        <textarea 
          id="essay-textarea-2025-de2" 
          rows="10" 
          placeholder="Viết bài làm của bạn tại đây..."
          style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; line-height: 1.6;"
        >${userAnswers[currentQuestion] || ''}</textarea>
        <details class="answer-hint essay-hint">
          <summary>
            <span class="hint-icon">📝</span>
            <span>Click để xem gợi ý cấu trúc bài làm</span>
          </summary>
          <div class="hint-content">
            <strong>Bài làm mẫu:</strong>
            <p>${q.sampleAnswer || 'Trình bày có hệ thống, logic, dẫn chứng cụ thể'}</p>
          </div>
        </details>
      `;
      
      const textarea = essayDiv.querySelector('textarea');
      textarea.addEventListener('input', () => {
        userAnswers[currentQuestion] = textarea.value;
      });
      
      choicesDiv.appendChild(essayDiv);
    }

    // Update buttons
    document.getElementById('prev-btn-2025-de2').disabled = currentQuestion === 0;
    document.getElementById('next-btn-2025-de2').style.display = currentQuestion < questions.length - 1 ? 'inline-block' : 'none';
    document.getElementById('submit-btn-2025-de2').style.display = currentQuestion === questions.length - 1 ? 'inline-block' : 'none';
  }

  window.nextQuestion_2025_De2 = function() {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion();
      // Phát âm thanh chuyển câu
      if (window.QuizSound) {
        QuizSound.play('card-slide', {volume: 0.4});
      }
    }
  };

  window.prevQuestion_2025_De2 = function() {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion();
      // Phát âm thanh chuyển câu
      if (window.QuizSound) {
        QuizSound.play('card-slide', {volume: 0.4});
      }
    }
  };

  window.submitQuiz_2025_De2 = function() {
    console.log('submitQuiz_2025_De2 called!');
    console.log('User answers:', userAnswers);
    
    // Tính điểm
    score = 0;
    let correctCount = 0;
    let totalPoints = 0;
    
    questions.forEach((q, index) => {
      totalPoints += q.points || 0.25;
    });
    
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
        let allCorrect = true;
        q.statements.forEach((stmt, stmtIndex) => {
          if (userAnswer?.[stmtIndex] !== stmt.correct) {
            allCorrect = false;
          }
        });
        if (allCorrect) {
          score += q.points || 0.5;
          correctCount++;
        }
      }
      // Short-answer và essay cần chấm thủ công
    });
    
    // Hiển thị kết quả chi tiết
    const resultDiv = document.getElementById('result-2025-de2');
    resultDiv.style.display = 'block';
    
    let reviewHtml = '';
    questions.forEach((q, index) => {
      const userAnswer = userAnswers[index];
      let answerHtml = '';
      
      if (q.type === 'multiple-choice') {
        const isCorrect = userAnswer === q.answer;
        answerHtml = `
          <div class="answer-review ${isCorrect ? 'correct' : 'incorrect'}">
            <strong>Câu ${index + 1} [Trắc nghiệm - ${q.points}đ]:</strong> ${isCorrect ? '✅ Đúng' : '❌ Sai'}
            <div class="answer-detail">
              <strong>Bạn chọn:</strong> ${userAnswer !== null && userAnswer !== undefined ? q.choices[userAnswer] : '<em>Chưa trả lời</em>'}
              ${!isCorrect ? `<br><strong>Đáp án đúng:</strong> ${q.choices[q.answer]}` : ''}
              ${q.explanation ? `<br><em>${q.explanation}</em>` : ''}
            </div>
          </div>
        `;
      } else if (q.type === 'true-false') {
        let allCorrect = true;
        let correctStatements = 0;
        q.statements.forEach((stmt, stmtIndex) => {
          if (userAnswer?.[stmtIndex] === stmt.correct) {
            correctStatements++;
          } else {
            allCorrect = false;
          }
        });
        
        answerHtml = `
          <div class="answer-review ${allCorrect ? 'correct' : 'incorrect'}">
            <strong>Câu ${index + 1} [Đúng/Sai - ${q.points}đ]:</strong> ${allCorrect ? '✅ Đúng hoàn toàn' : `⚠️ Đúng ${correctStatements}/${q.statements.length}`}
            <div class="answer-detail">
        `;
        
        q.statements.forEach((stmt, stmtIndex) => {
          const userChoice = userAnswer?.[stmtIndex];
          const isCorrect = userChoice === stmt.correct;
          answerHtml += `
            <div style="margin: 0.5rem 0;">
              ${stmt.id}) ${isCorrect ? '✅' : '❌'} <strong>Bạn chọn:</strong> ${userChoice === true ? 'Đúng' : userChoice === false ? 'Sai' : '<em>Chưa chọn</em>'}
              <br><strong>Đáp án:</strong> ${stmt.correct ? 'Đúng' : 'Sai'}
              ${stmt.explanation ? `<br><em>${stmt.explanation}</em>` : ''}
            </div>
          `;
        });
        
        answerHtml += `</div></div>`;
      } else if (q.type === 'short-answer') {
        answerHtml = `
          <div class="answer-review">
            <strong>Câu ${index + 1} [Trả lời ngắn - ${q.points}đ]:</strong>
            <div class="answer-detail">
              <strong>Bài làm của bạn:</strong><br>
              <div class="user-answer-text">${userAnswer || '<em>Chưa trả lời</em>'}</div>
            </div>
            <div class="answer-correct">
              <strong>Đáp án tham khảo:</strong> ${q.answer}
              ${q.explanation ? `<br><em>${q.explanation}</em>` : ''}
            </div>
            <div class="rubric-info">
              <strong>Tiêu chí chấm:</strong>
              <ul>
                ${Object.entries(q.rubric).map(([key, value]) => `<li>${value}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;
      } else if (q.type === 'essay') {
        answerHtml = `
          <div class="answer-review">
            <strong>Câu ${index + 1} [Tự luận - ${q.points}đ]:</strong>
            <div class="answer-detail">
              <strong>Bài làm của bạn:</strong><br>
              <div class="user-answer-text">${userAnswer || '<em>Chưa trả lời</em>'}</div>
            </div>
            ${q.sampleAnswer ? `
              <div class="answer-correct">
                <strong>Bài làm tham khảo:</strong><br>
                <pre style="white-space: pre-wrap;">${q.sampleAnswer}</pre>
              </div>
            ` : ''}
            ${q.rubric ? `
              <div class="answer-rubric">
                <strong>Tiêu chí chấm điểm:</strong>
                <ul>
                  ${Object.entries(q.rubric).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
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
        <button onclick="closeQuizModal_2025_De2()" class="btn-primary">Đóng</button>
      </div>
    `;
    
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  };

  window.closeQuizModal_2025_De2 = function() {
    modal.remove();
    delete window.nextQuestion_2025_De2;
    delete window.prevQuestion_2025_De2;
    delete window.submitQuiz_2025_De2;
    delete window.closeQuizModal_2025_De2;
  };
}
