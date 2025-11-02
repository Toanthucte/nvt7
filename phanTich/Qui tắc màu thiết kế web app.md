Màu sắc là một yếu tố cực kỳ quan trọng trong thiết kế giao diện web, bởi vì việc sử dụng màu sắc đúng đắn sẽ giúp nâng cao tính chuyên nghiệp và thu hút của trang web. CSS cung cấp nhiều định dạng và phương pháp để định nghĩa và áp dụng màu sắc, cũng như các kỹ thuật nâng cao để tạo ra hiệu ứng thị giác phức tạp.
Dưới đây là tổng hợp chi tiết về màu sắc trong CSS dựa trên các nguồn đã cung cấp:
1. Các Định Dạng Màu Phổ Biến trong CSS
CSS hỗ trợ nhiều cách để định nghĩa một màu, với Hex và RGB là hai định dạng phổ biến nhất, còn HSL thì tiện ích nhất cho việc chọn màu trong thiết kế giao diện.
1.1. Tên Màu (Color Names)
Đây là cách đơn giản và dễ dùng nhất, sử dụng tên tiếng Anh để định nghĩa màu (ví dụ: red là màu đỏ, white là màu trắng).
• Ưu điểm: Dễ hiểu, viết nhanh gọn.
• Hạn chế: Bị giới hạn nghiêm trọng về số lượng (CSS hỗ trợ hơn 140 tên màu, trong khi máy tính có thể hiển thị 16,7 triệu màu). Thường chỉ nên dùng cho các màu cơ bản.
1.2. Mã Hex (Hexadecimal)
Mã Hex là một định dạng phổ biến, biểu diễn màu dựa trên lý thuyết pha trộn ba màu cơ bản: Đỏ (Red), Xanh lục (Green), và Xanh lam (Blue).
• Cấu trúc: Bắt đầu bằng dấu thăng (#) theo sau là sáu ký tự (ba cặp giá trị).
    ◦ Hai cặp đầu tiên: Biểu diễn cường độ màu Đỏ.
    ◦ Hai cặp ở giữa: Biểu diễn cường độ màu Xanh lục.
    ◦ Hai cặp cuối cùng: Biểu diễn cường độ màu Xanh lam.
• Giá trị: Mỗi cặp số có giá trị từ 00 (tối nhất/cường độ yếu nhất) đến FF (sáng nhất/cường độ mạnh nhất).
• Ví dụ: Màu đỏ chót là #FF0000 (Đỏ mạnh nhất, không pha xanh lá và xanh dương). Màu đen là #000000 và màu trắng là #FFFFFF.
1.3. RGB và RGBA
RGB (Red, Green, Blue) biểu diễn màu sắc tương tự như Hex nhưng sử dụng hệ thống số học.
• Cấu trúc: Chỉ định giá trị của ba thành phần Đỏ, Xanh lá, và Xanh dương.
• Giá trị: Mỗi thành phần nằm trong khoảng từ 0 đến 255 (tổng cộng 256 giá trị khác nhau).
• RGBA: Cho phép thêm tham số Alpha (A), đại diện cho độ trong suốt (opacity). Tham số Alpha có giá trị từ 0% (hoàn toàn trong suốt) đến 100% (không trong suốt).
1.4. HSL và HSLA
HSL (Hue, Saturation, Lightness) định nghĩa màu dựa trên cảm nhận của mắt người, giúp điều chỉnh màu trực quan hơn so với Hex và RGB.
• Hue (Sắc độ): Giá trị từ 0 đến 360 độ, đại diện cho vị trí trên bánh xe màu (ví dụ: 0 
∘
  là màu đỏ, 120 
∘
  là xanh lá, 240 
∘
  là xanh dương).
• Saturation (Độ bảo hòa): Giá trị từ 0% đến 100%, xác định độ rực rỡ hoặc ngả xám. Càng gần 0%, màu càng ngả sang xám xịt.
• Lightness (Độ sáng): Giá trị từ 0% đến 100%, quyết định độ gần với màu đen (0%) hay màu trắng (100%). 50% là màu trung tính nhất.
• HSLA: Cũng có thể thêm tham số Alpha để tạo độ trong suốt.
• Ưu điểm: HSL trực quan và linh hoạt hơn Hex/RGB, đặc biệt hữu ích khi cần điều chỉnh độ đậm nhạt, độ bảo hòa, hoặc khi xây dựng hệ thống màu đồng nhất (color system).
2. Ứng Dụng Màu Sắc trong CSS
Màu sắc được áp dụng thông qua các thuộc tính sau:
• Thuộc tính color: Dùng để điều chỉnh màu chữ.
• Thuộc tính background-color: Dùng để đặt màu nền cho các phần tử.
Lưu ý về Typography: Màu chữ và màu nền cần phải có độ tương phản cao để đảm bảo chữ dễ đọc.
3. Hệ Thống Màu Sắc Chuyên Nghiệp (Color System)
Trong thiết kế web chuyên nghiệp, việc xác định một hệ thống màu sắc (Color System) là cần thiết để đảm bảo tính nhất quán. Các trang web hiện đại thường chỉ sử dụng một vài tông màu chính (như trắng, đen, xám) và thêm màu nhấn khi cần.
Một bảng màu chuẩn cho giao diện thường bao gồm năm nhóm màu chính:
1. Màu Trung tính (Neutral Colors): Thường dùng cho chữ và nền. Nhóm màu này chiếm tới 60-70% diện tích giao diện, giúp tạo sự cân bằng, sạch sẽ và dễ đọc.
2. Màu Chủ đạo (Primary Color): Màu sắc chính của thương hiệu (thường lấy từ logo). Màu này xuất hiện xuyên suốt giao diện (nút bấm, tiêu đề, nền, nút kêu gọi hành động) và thường chiếm khoảng 20-30% diện tích giao diện.
3. Màu Thứ chính (Secondary/Tertiary Colors): Màu bổ trợ cho màu chủ đạo. Nhóm này không bắt buộc phải có, nếu có thì thường chiếm ít hơn 10% giao diện.
4. Màu Tạo điểm nhấn (Accent Colors): Sử dụng để tạo sự phá cách và bất ngờ, không nhất thiết phải có.
5. Màu Tiện ích (Utility Colors): Bộ ba màu Đỏ, Xanh lá, Vàng, dùng để truyền tải thông điệp trong các ứng dụng quản lý hoặc tương tác.
    ◦ Màu Đỏ: Báo lỗi, cảnh báo nguy hiểm.
    ◦ Màu Xanh lá: Biểu tượng cho thành công hoặc hoàn thành nhiệm vụ.
    ◦ Màu Vàng: Cảnh báo nhẹ và nhắc nhở.
4. Màu Chuyển Tiếp (Gradient)
Gradient là kỹ thuật tạo màu sắc chuyển tiếp mượt mà giữa hai hoặc nhiều màu, thường được áp dụng bằng thuộc tính background hoặc background-image.
• Các loại Gradient chính: linear-gradient (chuyển màu theo đường thẳng) và radial-gradient (chuyển màu hình tròn xuyên tâm).
• Màu dự phòng: Khi sử dụng gradient, nên đặt một thuộc tính background-color (màu dự phòng) trước thuộc tính background (gradient) trong CSS, đề phòng trường hợp trình duyệt không hỗ trợ gradient.
• Tạo Gradient cho chữ: Không thể áp dụng gradient trực tiếp cho thuộc tính color. Để tạo hiệu ứng chữ chuyển màu, cần sử dụng kết hợp ba bước:
    1. Đặt nền gradient bằng thuộc tính background.
    2. Sử dụng webkit-background-clip: text để nền chỉ áp dụng bên trong phần chữ.
    3. Đặt webkit-text-fill-color: transparent để màu gốc của chữ trở nên trong suốt.
5. Quản Lý Màu Sắc bằng Biến CSS
Trong các dự án chuyên nghiệp, màu sắc thường được quản lý thông qua Biến số CSS (CSS Variables).
• Cách khai báo: Biến thường được khai báo trong :root (phần tử gốc HTML) bằng hai dấu gạch ngang (--) theo sau là tên biến (ví dụ: --primary-700: #...).
• Cách sử dụng: Dùng hàm var() (ví dụ: color: var(--primary-700)).
• Lợi ích: Biến giúp mã nguồn dễ bảo trì, linh hoạt hơn, và tiết kiệm thời gian khi cần thay đổi thiết kế hoặc giao diện (ví dụ: chuyển đổi theme sáng/tối chỉ cần cập nhật giá trị biến).