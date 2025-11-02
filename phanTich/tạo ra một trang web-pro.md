Để tạo ra một trang web được đánh giá là **tiêu chuẩn, chuyên nghiệp, đẹp mắt, hiệu năng tối ưu, và hoạt động tốt trên mọi thiết bị (responsive)**, người lập trình cần phải tuân thủ và áp dụng một loạt các yêu cầu kỹ thuật và nguyên tắc thiết kế chuyên nghiệp.  
Dựa trên thông tin trong các tài liệu nguồn, các yêu cầu này có thể được chia thành bốn nhóm chính:  
\--------------------------------------------------------------------------------  
I. Yêu cầu về Cấu trúc và Tiêu chuẩn HTML (Standard and Structure)  
Người lập trình cần đảm bảo rằng nền tảng của trang web được xây dựng một cách vững chắc và có ngữ nghĩa rõ ràng:  
1\. **Sử dụng HTML có ngữ nghĩa (Semantic HTML):** Đây là yêu cầu cơ bản để tạo ra cấu trúc rõ ràng và chuyên nghiệp. Việc sử dụng các thẻ HTML mang ý nghĩa như `<header>`, `<footer>`, `<main>`, `<nav>`, `<section>`, `<article>`, và `<aside>` sẽ giúp **cải thiện khả năng đọc hiểu code** cho lập trình viên và **tăng SEO** (tối ưu hóa công cụ tìm kiếm).  
2\. **Quản lý Thẻ DIV và SPAN:** Cần sử dụng thẻ `<div>` và `<span>` một cách hợp lý để tổ chức nội dung và tạo kiểu. Việc sử dụng **quá nhiều thẻ \<div\>** sẽ làm mã HTML trở nên cực kỳ phức tạp, trong khi sử dụng **không đủ** có thể gây khó khăn cho việc tạo kiểu (Style) trong CSS.  
3\. **Cấu hình Căn bản Chính xác:**  
    ◦ Khai báo đúng phiên bản HTML (ví dụ: `<!doctype html>`) và ngôn ngữ của trang (ví dụ: `lang="vi"` cho tiếng Việt).  
    ◦ Sử dụng thẻ **\<meta name="viewport"\>** để đảm bảo trang web thân thiện và hiển thị đúng trên mọi thiết bị di động.  
4\. **Tối ưu hóa Tải Trang:** Đảm bảo JavaScript được tải sau khi HTML đã tải xong bằng cách đặt thẻ `<script>` ở cuối phần `<body>` hoặc sử dụng **thuộc tính defer** trong phần `<head>` để mã JavaScript hoạt động đúng.  
5\. **Bảo mật Liên kết:** Khi tạo liên kết mở trong tab mới (sử dụng `target="_blank"`), bắt buộc phải thêm thuộc tính **rel="noopener noopener"** để ngăn chặn lỗi bảo mật và đảm bảo quyền riêng tư cho trang hiện tại.  
\--------------------------------------------------------------------------------  
II. Yêu cầu về Thiết kế và Thẩm mỹ (Beautiful and Professional)  
Để trang web đẹp mắt và chuyên nghiệp, lập trình viên cần làm chủ CSS và các nguyên tắc thiết kế giao diện:  
1\. **Tạo Hệ thống Màu sắc Chuyên nghiệp (Color System):**  
    ◦ Phải xây dựng một hệ thống màu sắc thống nhất, bao gồm **màu trung tính** (Neutral Colors) cho chữ và nền (chiếm 60-70% giao diện), **màu chủ đạo** (Primary Color) của thương hiệu (chiếm 20-30%), và các màu bổ trợ/điểm nhấn.  
    ◦ **Tránh lạm dụng màu sắc**, vì điều này có thể tạo ra giao diện lòe loẹt và kém chuyên nghiệp.  
2\. **Thiết lập Typography (Kiểu chữ) có hệ thống:**  
    ◦ Sử dụng **hệ thống Type Scale** (tính toán kích thước chữ theo một tỉ lệ cố định, ví dụ: 1.2 hoặc 1.25) để tạo ra thứ bậc chữ hài hòa, dễ đọc và thẩm mỹ.  
    ◦ Đảm bảo **độ tương phản cao** giữa màu chữ và màu nền để chữ dễ đọc.  
3\. **Làm chủ Mô hình Hộp (Box Model):**  
    ◦ Cần hiểu rõ bốn phần của mô hình hộp: Content, Padding, Border, và Margin.  
    ◦ Bắt buộc sử dụng **box-sizing: border-box** (thay vì giá trị mặc định `content-box`) để đảm bảo các giá trị chiều rộng và chiều cao bao gồm cả padding và border, giúp kiểm soát kích thước tổng thể dễ dàng và chính xác hơn.  
4\. **Sử dụng Bóng đổ (Shadow) Tinh tế:**  
    ◦ Sử dụng `box-shadow` hoặc `drop-shadow` để tạo **hiệu ứng chiều sâu** và làm cho giao diện trở nên sống động, tinh tế hơn, thay vì dùng đường viền sắc nét.  
    ◦ Áp dụng các lớp bóng (multi-layered shadow) để mô phỏng ánh sáng tự nhiên, giúp bóng nhìn mềm mại và chân thật.  
5\. **Tạo Tương tác Mượt mà (Transition và Animation):**  
    ◦ Sử dụng **transition** để làm cho các thay đổi về style (ví dụ: khi rê chuột \- hover) diễn ra dần dần.  
    ◦ Sử dụng **animation** (định nghĩa bằng `@keyframes`) để tạo các hiệu ứng phức tạp hơn (như hiệu ứng lơ lửng hoặc băng truyền vô hạn), giúp giao diện không bị nhàm chán và thu hút hơn.  
\--------------------------------------------------------------------------------  
III. Yêu cầu về Hiệu năng Tối ưu (Optimal Performance)  
Tối ưu hóa hiệu năng là yếu tố then chốt cho một trang web chuyên nghiệp:  
1\. **Tối ưu hóa Hình ảnh và Tài nguyên:**  
    ◦ Chuyển đổi các hình ảnh sang định dạng nhẹ hơn như **WebP** để giảm dung lượng file (tiết kiệm được đáng kể dung lượng) và tăng tốc độ tải trang.  
    ◦ Cân nhắc sử dụng các định dạng video/audio tối ưu cho web như WebM.  
2\. **Quản lý Code CSS Chuyên nghiệp:**  
    ◦ **Biến CSS (CSS Variables):** Khai báo các giá trị dùng chung (màu sắc, font size) trong `:root` bằng cách sử dụng biến CSS (bắt đầu bằng `--`). Điều này giúp **mã nguồn dễ bảo trì hơn**, linh hoạt hơn và tiết kiệm thời gian khi cần thay đổi thiết kế hoặc theme của website.  
    ◦ **Reset CSS:** Sử dụng một đoạn mã Reset CSS (ví dụ: của Eric Meyer) để xóa các kiểu mặc định của trình duyệt, đảm bảo giao diện thống nhất trên các trình duyệt khác nhau (Chrome, Firefox, Safari).  
    ◦ **Tổ chức Code:** Viết CSS trong file riêng (External CSS) và tổ chức chúng thành các file theo từng thành phần/phần (`header.css`, `skills.css`, v.v.) rồi gộp lại bằng `@import`.  
3\. **Đặt Tên Class Có Hệ thống:** Áp dụng các quy tắc đặt tên chuyên nghiệp như **BEM (Block, Element, Modifier)** để đảm bảo mã CSS dễ đọc, có cấu trúc và dễ quản lý, đặc biệt quan trọng khi làm việc nhóm.  
4\. **Tối ưu hóa Tốc độ:**  
    ◦ Giới hạn chiều rộng của đoạn văn bản (ví dụ: dùng đơn vị **ch** \- khoảng 50-75 ký tự) để đoạn văn dễ đọc và giảm mỏi mắt cho người dùng.  
    ◦ Sử dụng các công cụ định dạng code (như Prettier) để đảm bảo cú pháp CSS/HTML luôn sạch sẽ và nhất quán.  
\--------------------------------------------------------------------------------  
IV. Yêu cầu về Tương thích Đa thiết bị (Responsive Design)  
Trang web phải hoạt động tốt và hiển thị đẹp mắt trên mọi thiết bị (điện thoại, máy tính bảng, máy tính cá nhân):  
1\. **Sử dụng Media Queries và Break Points:**  
    ◦ Phải nắm vững cách sử dụng **@media queries** để áp dụng các quy tắc CSS khác nhau dựa trên kích thước màn hình.  
    ◦ Xác định và kiểm tra bố cục tại các **hệ thống điểm ngắt (Break Points)** tiêu chuẩn (ví dụ: 1280px, 768px, 640px) để điều chỉnh layout, kích thước chữ, và kích thước phần tử sao cho vừa vặn.  
2\. **Áp dụng Layout Linh hoạt:**  
    ◦ **Flexbox (Flexible Box Layout):** Sử dụng `display: flex` để sắp xếp và căn chỉnh các phần tử theo **một chiều** (hàng hoặc cột), giúp các phần tử tự động co giãn và xuống hàng (`flex-wrap: wrap`) khi không đủ không gian.  
    ◦ **CSS Grid (Lưới):** Sử dụng `display: grid` để tạo layout **hai chiều** (hàng và cột), đặc biệt hữu ích cho các bố cục phức tạp. Có thể sử dụng **repeat(auto-fit, minmax(..., 1fr))** để lưới tự động cân đối số lượng cột theo kích thước màn hình.  
3\. **Sử dụng Đơn vị Tương đối:**  
    ◦ Sử dụng đơn vị **rem** để kiểm soát toàn bộ kích thước chữ trên trang một cách nhất quán, dễ dàng điều chỉnh kích thước chữ trên màn hình nhỏ bằng cách thay đổi `font-size` của phần tử gốc HTML.  
    ◦ Sử dụng **vw** (viewport width) và **vh** (viewport height) để kích thước của phần tử thay đổi theo kích thước cửa sổ trình duyệt.  
    ◦ Sử dụng **%** để kích thước của phần tử thay đổi theo phần tử cha chứa nó.  
