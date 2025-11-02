**Giao tiếp tới AI Phát triển Web (Web Development AI)**

**YÊU CẦU DỰ ÁN: Xây dựng một Web Application (Web App) chuẩn mực, chuyên nghiệp, đẹp mắt và an toàn (cho người mới bắt đầu)**

Tôi cần bạn nắm rõ các nguyên tắc sau để đảm bảo mã nguồn đầu ra tuân thủ các **Tiêu chuẩn Lập trình Web Chuyên nghiệp**.

---

### PHẦN 1: THIẾT LẬP MÔI TRƯỜNG VÀ CẤU TRÚC FILE

AI cần tạo môi trường làm việc bằng **Visual Studio Code (VSC)** và cài đặt các tiện ích như **Live Server** và **Prettier**.

1.  **Cấu trúc file cơ bản:**
    *   `index.html`: File chính của ứng dụng.
    *   `main.css`: Chứa các quy tắc CSS chính.
    *   `theme.css`: Chứa các biến (variables) dùng chung cho toàn dự án.
    *   `responsive.css`: Chứa các Media Queries.
    *   Thư mục `assets`: Chứa tài nguyên (hình ảnh, icon, video, CV, v.v.).

2.  **Liên kết tài liệu:**
    *   CSS phải được liên kết bằng **External CSS** (tệp riêng) thông qua thẻ `<link>` trong phần `<head>`.
    *   **Reset CSS** (đoạn mã xóa kiểu mặc định của trình duyệt) phải được áp dụng để đảm bảo tính đồng nhất trên các trình duyệt khác nhau.
    *   **JavaScript** nên được liên kết ở cuối phần `<body>` hoặc trong `<head>` với thuộc tính `defer` để đảm bảo HTML tải xong trước khi JS chạy.

### PHẦN 2: TIÊU CHUẨN HTML (CẤU TRÚC VÀ NGỮ NGHĨA)

1.  **Cấu hình Căn bản và Bảo mật:**
    *   Khai báo đúng phiên bản HTML: `<!DOCTYPE html>`.
    *   Xác định ngôn ngữ của trang (ví dụ: `lang="vi"`).
    *   Sử dụng thẻ **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`** để đảm bảo trang web hiển thị đúng trên mọi thiết bị (responsive).
    *   Đối với các liên kết mở trong tab mới (sử dụng `target="_blank"`), bắt buộc phải thêm thuộc tính bảo mật `rel="noopener noreferrer"`.

2.  **HTML Ngữ nghĩa (Semantic HTML):**
    *   Sử dụng các thẻ có ý nghĩa như `<header>`, `<footer>`, `<main>`, `<nav>`, `<section>`, `<article>`, và `<aside>` để **cải thiện khả năng đọc hiểu code** và **tăng SEO**.
    *   Sử dụng thẻ tiêu đề (`<h1>` đến `<h6>`) dựa trên **cấp độ quan trọng** của nội dung, không dựa vào kích thước chữ, và không được nhảy cấp (ví dụ: sau `<h1>` phải là `<h2>`).
    *   **Quản lý `<div>` và `<span>`:** Sử dụng các thẻ này một cách hợp lý để tổ chức nội dung và tạo kiểu; tránh sử dụng quá nhiều `<div>` làm mã phức tạp.

3.  **Tương tác Form và Dữ liệu:**
    *   Các ô nhập liệu phải có thuộc tính `name` (dùng cho việc gửi dữ liệu form) và `id` (dùng để liên kết với `<label>`).
    *   Sử dụng các thẻ form chuyên biệt: `<label>` (liên kết với input), `<select>`/`<option>` (danh sách đổ xuống), `<textarea>` (văn bản dài).

### PHẦN 3: CSS VÀ TẠO KIỂU CHUYÊN NGHIỆP

1.  **Hệ thống Màu sắc và Biến (Color System & Variables):**
    *   Sử dụng **CSS Variables** (khai báo trong `:root` hoặc `theme.css`) để quản lý màu sắc, font chữ, bóng đổ, giúp mã nguồn dễ bảo trì và thay đổi theme nhanh chóng.
    *   Xác định 5 nhóm màu chính: **Neutral** (chữ/nền), **Primary** (màu chủ đạo), **Secondary/Tertiary**, **Accent** (điểm nhấn), và **Utility** (thông báo lỗi, thành công).
    *   Ưu tiên định dạng màu **HSL** do tính trực quan và linh hoạt khi điều chỉnh sắc thái.

2.  **Typography (Kiểu chữ):**
    *   Áp dụng **Hệ thống Type Scale** (Type Scale System) dựa trên tỷ lệ cố định (ví dụ: **1.2** cho UI/UX hiện đại) để tạo thứ bậc chữ hài hòa và chuyên nghiệp.
    *   Sử dụng thuộc tính `font-family` với ít nhất một phông chữ dự phòng (fallback).
    *   Đảm bảo **độ tương phản cao** giữa màu chữ (`color`) và màu nền (`background-color`) để chữ dễ đọc.
    *   Sử dụng đơn vị **`ch`** (50-75 ký tự) để giới hạn chiều rộng đoạn văn bản dài, tối ưu hóa trải nghiệm đọc.

3.  **Mô hình Hộp và Đơn vị đo (Box Model & Units):**
    *   Đặt `box-sizing: border-box` ở bộ chọn toàn cục (`*`) để `padding` và `border` không làm tăng kích thước tổng thể của phần tử, giúp kiểm soát kích thước dễ dàng.
    *   Sử dụng đơn vị **`rem`** (dựa trên font size của HTML root) để kiểm soát kích thước chữ toàn trang một cách nhất quán. Dùng **`em`** (dựa trên phần tử cha) cho các thành phần con cần giữ tỉ lệ (ví dụ: icon, nút).

4.  **Hiệu ứng Thị giác:**
    *   Sử dụng **Box Shadow** (bóng đổ nhiều lớp) thay vì đường viền cứng nhắc để tạo hiệu ứng chiều sâu tinh tế, hiện đại.
    *   Tạo hiệu ứng chuyển đổi mượt mà bằng **Transition** (ví dụ: `transition: all 0.3s ease-in-out;`) cho các trạng thái tương tác như hover.
    *   Tạo các hiệu ứng phức tạp hơn bằng **Animation** (định nghĩa bằng `@keyframes`).

### PHẦN 4: BỐ CỤC VÀ TỐI ƯU HÓA RESPONSIVE

1.  **Hệ thống Bố cục:**
    *   **Flexbox:** Sử dụng cho bố cục **một chiều** (xếp hàng hoặc xếp cột) và căn chỉnh các phần tử con theo trục chính (`justify-content`) và trục phụ (`align-items`).
    *   **Grid:** Sử dụng cho bố cục **hai chiều** phức tạp (hàng và cột). Cân nhắc sử dụng `repeat(auto-fit, minmax(340px, 1fr))` để lưới tự động điều chỉnh số cột theo kích thước màn hình.

2.  **Thiết kế Responsive (Đáp ứng):**
    *   Áp dụng Media Queries (`@media`) để thay đổi layout, kích thước chữ, và padding tại các **điểm ngắt (breakpoints)** khác nhau (ví dụ: 640px, 768px, 1280px).
    *   Sử dụng `flex-wrap: wrap` trong Flexbox hoặc các hàm tự động của Grid (`auto-fit/fill`) để các phần tử tự động xuống hàng khi không gian không đủ.

3.  **Tương tác Nâng cao:**
    *   Đảm bảo cuộn trang mượt mà giữa các liên kết neo (anchor links) bằng cách thêm `scroll-behavior: smooth` vào phần tử gốc (ví dụ: `:root` hoặc `html`).
    *   Sử dụng **HTML DOM** kết hợp JavaScript để tương tác và điều khiển các thành phần trên trang web (ví dụ: thay đổi nội dung, kiểu dáng, thuộc tính của phần tử).