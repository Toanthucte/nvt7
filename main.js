// Chức năng chuyển tab và hiển thị bài kiểm tra mẫu

document.addEventListener('DOMContentLoaded', function () {
  // Preload âm thanh
  if (window.QuizSound) {
    QuizSound.preloadAll();
  }

  // Setup nút toggle âm thanh
  const soundToggle = document.getElementById('sound-toggle');
  if (soundToggle) {
    // Cập nhật icon dựa trên trạng thái
    function updateSoundIcon() {
      if (QuizSound.isEnabled()) {
        soundToggle.textContent = '🔊';
        soundToggle.classList.remove('muted');
      } else {
        soundToggle.textContent = '🔇';
        soundToggle.classList.add('muted');
      }
    }

    // Set icon ban đầu
    updateSoundIcon();

    // Xử lý click
    soundToggle.addEventListener('click', function () {
      QuizSound.toggle();
      updateSoundIcon();
      // Phát âm thanh xác nhận
      if (QuizSound.isEnabled()) {
        QuizSound.play('ui-confirm');
      }
    });
  }

  // Navigation
  const navLinks = document.querySelectorAll('nav a')
  const sections = document.querySelectorAll('main section')

  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      const targetId = this.getAttribute('href').replace('#', '')
      sections.forEach((sec) => {
        sec.style.display = sec.id === targetId ? 'block' : 'none'
      })
      // Phát âm thanh khi chuyển tab
      if (window.QuizSound) {
        QuizSound.play('ui-click');
      }
    })
  })

  // Hiển thị tất cả section khi mới vào
  sections.forEach((sec) => {
    sec.style.display = 'block'
  })
})

// Hàm thông báo tính năng đang phát triển
function comingSoon() {
  // Phát âm thanh thông báo
  if (window.QuizSound) {
    QuizSound.play('ui-error');
  }
  
  alert('🚧 Tính năng đang được phát triển!\n\n📚 Đề thi này sẽ sớm được cập nhật.\nVui lòng chờ đợi hoặc chọn đề thi khác.')
}
