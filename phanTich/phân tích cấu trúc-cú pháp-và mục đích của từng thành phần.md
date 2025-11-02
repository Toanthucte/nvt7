Tài liệu này trình bày chi tiết về các khía cạnh cần thiết để xây dựng một Ứng dụng Web (Web App) từ A-Z, tập trung vào công nghệ Front-end cơ bản (HTML, CSS) và tương tác (DOM/JavaScript), dựa trên phân tích cấu trúc, cú pháp, và mục đích của từng thành phần.

---

# **TÀI LIỆU HỌC THUẬT: XÂY DỰNG ỨNG DỤNG WEB TỪ A-Z**

## **PHẦN I: NỀN TẢNG VÀ CẤU TRÚC (HTML)**

HTML (Hypertext Markup Language) là ngôn ngữ đánh dấu siêu văn bản, có vai trò tạo ra **nội dung** và **cấu trúc khung sườn** cho giao diện trang web.

### **1\. Cấu Trúc Cơ Bản của Thẻ và Tài Liệu**

| Khái Niệm | Giải Thích Chi Tiết | Cú Pháp/Tham Số | Mục Đích \[Nguồn\] |
| ----- | ----- | ----- | ----- |
| **Thẻ (Tag)** | Đánh dấu sự bắt đầu và kết thúc của một phần tử. Thường có thẻ mở, nội dung, và thẻ đóng (`/`). | `<p>Nội dung</p>` | Phân loại và cấu thành nội dung (ví dụ: `<p>` là đoạn văn, `<h1>` là tiêu đề). |
| **Thẻ Tự Đóng** | Thẻ không chứa nội dung nên không cần thẻ đóng. | `<br>` (ngắt dòng), `<img>` (chèn ảnh). | Tối ưu hóa cú pháp cho các chức năng không yêu cầu nội dung bên trong. |
| **Thuộc Tính (Attribute)** | Cung cấp thông tin bổ sung cho thẻ, luôn nằm trong thẻ mở. | `tên="giá trị"` (ví dụ: `href="url"`, `style="css"`). | Điều khiển hành vi của thẻ và cung cấp siêu dữ liệu cần thiết cho CSS/JavaScript. |
| **Thuộc tính `ID` và `Class`** | Cả hai dùng để đặt tên cho thẻ, nhưng **`ID` phải là duy nhất** cho mỗi phần tử, còn **`Class` có thể được dùng chung** cho nhiều phần tử. | `id="header"`, `class="btn primary"`. | `ID` dùng để nhận diện phần tử trong HTML (thường liên kết với `<label>` hoặc dùng cho DOM) và `Name` dùng để đặt tên cho dữ liệu trong Form. `Class` dùng để tái sử dụng Style trong CSS. |

### **2\. Cấu Hình Căn Bản Trang HTML**

Cấu trúc tài liệu đơn giản nhất bắt đầu bằng thẻ `<html>` (phần tử gốc \- Root Element), chia làm hai phần chính: `<head>` (thông tin) và `<body>` (giao diện).

| Thẻ/Thuộc Tính | Giải Thích và Ảnh Hưởng | Mục Đích |
| ----- | ----- | ----- |
| `<!DOCTYPE html>` | Khai báo phiên bản HTML (thường là HTML5). | Khai báo với trình duyệt về phiên bản ngôn ngữ đang được sử dụng. |
| `<html lang="vi">` | Thuộc tính `lang` khai báo ngôn ngữ của trang là tiếng Việt (`vi`). | Giúp các công cụ tìm kiếm và trình duyệt hiểu ngữ cảnh ngôn ngữ, cải thiện SEO. |
| `<meta charset="UTF-8">` | `charset` (Bộ ký tự) được đặt là `UTF-8`. | Đảm bảo hỗ trợ đa ngôn ngữ và các ký tự đặc biệt (như dấu tiếng Việt) hiển thị chính xác. |
| `<meta name="viewport" ...>` | Thẻ `viewport` với `content="width=device-width, initial-scale=1.0"`. | **Yêu cầu bắt buộc để trang web thân thiện với thiết bị di động** (Responsive), đảm bảo hiển thị đúng kích thước trên mọi thiết bị. |

### **3\. Thẻ Ngữ Nghĩa (Semantic HTML)**

Thẻ ngữ nghĩa là những thẻ HTML có ý nghĩa đặc biệt, thay thế cho thẻ `<div>` chung chung.

| Thẻ Ngữ Nghĩa | Công Dụng Chi Tiết | Mục Đích |
| ----- | ----- | ----- |
| `<header>` | Đại diện cho phần đầu trang, chứa logo, menu điều hướng chính, hoặc tiêu đề chính. | Xác định rõ phần đầu trang, tăng khả năng đọc code và SEO. |
| `<nav>` | Dùng để hiển thị menu điều hướng (danh sách liên kết). | Phân loại rõ các liên kết điều hướng chính. |
| `<main>` | Biểu thị nội dung chính, quan trọng nhất của trang. | Giúp công cụ tìm kiếm hiểu đâu là nội dung cốt lõi. |
| `<section>` | Tổ chức nội dung theo chủ đề (ví dụ: giới thiệu sản phẩm, danh sách bài viết). | Phân chia nội dung thành các khối logic. |
| `<article>` | Chứa nội dung độc lập, có thể tự đứng một mình (ví dụ: bài post, bản tin). | Định nghĩa nội dung hoàn chỉnh, tách biệt. |
| `<footer>` | Đại diện cho phần cuối trang, chứa thông tin bản quyền, liên hệ. | Xác định rõ phần chân trang, tăng khả năng đọc code và SEO. |
| `<div>` và `<span>` | **`<div>`** (division) nhóm các khối logic/bố cục. **`<span>`** nhóm và tạo kiểu cho một phần nội dung nhỏ trong văn bản (ví dụ: tô màu một chữ). | Phục vụ cho mục đích chia tách và trang trí (CSS) khi không có thẻ ngữ nghĩa phù hợp. |

---

## **PHẦN II: TẠO KIỂU VÀ TRÌNH BÀY (CSS)**

CSS (Cascading Style Sheets) là công cụ giúp làm đẹp, tạo giao diện chuyên nghiệp và tối ưu hóa hiển thị trên mọi thiết bị cho nội dung HTML.

### **1\. Phương Pháp Chèn CSS**

Có ba cách để thêm CSS vào trang HTML, mỗi cách có độ ưu tiên (Cascading) khác nhau.

| Phương Pháp | Cú Pháp/Cơ Chế | Ưu Điểm/Ảnh Hưởng | Thứ Tự Ưu Tiên |
| ----- | ----- | ----- | ----- |
| **Inline CSS** | Dùng thuộc tính `style` trong thẻ mở HTML. | Độ ưu tiên cao nhất, dùng để test nhanh. | **Cao nhất**. |
| **Internal CSS** | Viết CSS trong thẻ `<style>` đặt trong phần `<head>` của HTML. | Tái sử dụng trong cùng một file, dễ quản lý hơn Inline. | Cao hơn External. |
| **External CSS** | Viết trong file `.css` riêng biệt, liên kết qua thẻ `<link>` trong `<head>`. | **Chuyên nghiệp và tối ưu nhất.** Giúp HTML gọn gàng, tái sử dụng style cho nhiều trang. | Thấp nhất (trong ba loại). |

### **2\. Bộ Chọn CSS (Selectors)**

Bộ chọn là cách để tìm phần tử HTML mà bạn muốn áp dụng CSS, dựa trên đặc điểm, trạng thái hoặc vị trí.

| Loại Bộ Chọn | Cú Pháp | Công Dụng & Giải Thích |
| ----- | ----- | ----- |
| **Theo Thẻ** | `H1 { ... }` | Áp dụng style cho tất cả phần tử cùng loại thẻ. |
| **Theo Class** | `.red { ... }` (dấu chấm) | Áp dụng style cho nhóm phần tử có cùng class. **Linh hoạt và tái sử dụng dễ dàng**. |
| **Theo ID** | `#header { ... }` (dấu thăng) | Áp dụng style cho **một phần tử duy nhất** có ID cụ thể. |
| **Con Cháu** | `.A p { ... }` (dấu cách) | Chọn tất cả các thẻ `<p>` là con cháu của phần tử có class `A`. |
| **Con Trực Tiếp** | `div > p { ... }` (dấu `>`) | Chỉ chọn các thẻ `<p>` là con trực tiếp của thẻ `div`. |
| **Nhóm (OR)** | `H1, P, .red { ... }` (dấu phẩy) | Áp dụng cùng một style cho nhiều phần tử/bộ chọn khác nhau. |
| **Lớp Giả** | `p:hover { ... }` (một dấu `:`) | Chọn phần tử dựa trên trạng thái tương tác (`:hover`, `:active`) hoặc vị trí (`:first-child`, `:nth-child(n)`). |
| **Thẻ Giả** | `h1::before { ... }` (hai dấu `::`) | Chèn nội dung trang trí vào trước (`::before`) hoặc sau (`::after`) phần tử mà không cần chỉnh sửa HTML. **Bắt buộc dùng thuộc tính `content`**. |

### **3\. Mô Hình Hộp (Box Model)**

Mọi phần tử HTML đều được hiển thị dưới dạng một hộp, bao gồm bốn lớp: **Content, Padding, Border, Margin**.

| Thành Phần | Giải Thích | Công Dụng/Ảnh Hưởng |
| ----- | ----- | ----- |
| **Content** | Phần nội dung thực tế (chữ, hình ảnh). | Kích thước được điều chỉnh bằng `width` và `height`. |
| **Padding** | Khoảng cách từ nội dung tới đường viền (Border). | Tạo không gian thoáng bên trong hộp. |
| **Border** | Đường viền bao quanh nội dung và Padding. | Có thể tùy chỉnh độ dày, kiểu dáng (`solid`, `dotted`), và màu sắc. |
| **Margin** | Khoảng cách ngoài cùng của hộp. | Tạo khoảng cách giữa phần tử này với phần tử khác. `margin: auto` dùng để căn giữa phần tử có chiều rộng xác định theo chiều ngang. |
| **`box-sizing: border-box`** | Thay đổi cách tính toán kích thước hộp. Khi sử dụng, `width` và `height` sẽ bao gồm cả `padding` và `border`. | Giúp dễ dàng kiểm soát kích thước tổng thể, khắc phục sự nhầm lẫn khi kích thước thực tế bị cộng thêm padding/border. |

### **4\. Đơn Vị Đo Lường (CSS Units)**

Đơn vị đo lường được chia thành tuyệt đối (cố định) và tương đối (linh hoạt, dựa trên yếu tố khác).

| Đơn Vị | Loại | Tính Toán Dựa Trên | Mục Đích Sử Dụng |
| ----- | ----- | ----- | ----- |
| **px (Pixel)** | Tuyệt đối | Độ rộng nhỏ nhất để hiển thị một điểm trên màn hình. | Đơn vị phổ biến, nhưng kích thước thực tế phụ thuộc vào mật độ điểm ảnh của thiết bị. |
| **rem** | Tương đối | `font-size` của phần tử gốc HTML (`<html>`). | **Kiểm soát kích thước chữ và các thành phần một cách nhất quán** trên toàn trang. |
| **em** | Tương đối | `font-size` của phần tử cha gần nhất. | Giữ tỉ lệ giữa các thành phần con với nhau (ví dụ: icon so với nút bấm). |
| **ch** | Tương đối | Chiều rộng của ký tự `0` trong font đang dùng. | **Giới hạn chiều dài của đoạn văn bản** (50-75 ký tự/dòng) để tối ưu hóa khả năng đọc. |
| **%** | Tương đối | Kích thước của phần tử cha. | Thay đổi kích thước phần tử theo tỉ lệ của cha. |
| **vw/vh** | Tương đối | Kích thước của cửa sổ trình duyệt (Viewport). | Điều chỉnh kích thước theo chiều rộng/chiều cao màn hình (1vw \= 1% chiều rộng viewport). |

---

## **PHẦN III: BỐ CỤC NÂNG CAO VÀ TƯƠNG TÁC (LAYOUT & DOM)**

### **1\. Hệ Thống Biến CSS (Variables)**

Biến số CSS cho phép lưu trữ một giá trị (màu sắc, kích thước, font) tại một nơi và sử dụng lại ở nhiều nơi khác.

* **Khai Báo:** Biến thường được khai báo trong `:root` (thẻ `<html>`) bằng hai dấu gạch ngang (ví dụ: `--primary-color: #219EBC;`).  
* **Sử Dụng:** Dùng hàm `var()` (ví dụ: `color: var(--primary-color);`).  
* **Mục đích:** Giúp mã CSS dễ bảo trì, linh hoạt hơn, và tiết kiệm thời gian khi cần thay đổi thiết kế (ví dụ: đổi theme màu toàn bộ website chỉ cần thay đổi giá trị biến trong `:root`).

### **2\. Thiết Kế Đáp Ứng (Responsive Design) và Media Queries**

Thiết kế Responsive đảm bảo trang web hoạt động tốt và hiển thị đẹp mắt trên mọi thiết bị, từ điện thoại đến máy tính bàn.

* **Cơ chế:** Sử dụng quy tắc `@media` để áp dụng CSS dựa trên điều kiện (thường là kích thước màn hình).  
* **Cú pháp:** `@media max-width: 600px { body { background-color: blue; } }`.  
* **Điểm Ngắt (Break Points):** Là các kích thước màn hình được xác định trước (ví dụ: 1536px, 1280px, 768px, 640px) để điều chỉnh bố cục (ví dụ: chuyển layout từ hàng ngang sang cột dọc trên màn hình nhỏ).  
* **Tối ưu Desktop:** Đặt `max-width` (ví dụ: 1536px) cho container hoặc `body` để giới hạn nội dung, ngăn chặn việc kéo giãn quá mức trên màn hình lớn (4K/Ultrawide).

### **3\. Bố Cục Flexbox (Một Chiều)**

Flexbox (Flexible Box Layout) là công cụ dùng để sắp xếp và căn chỉnh các phần tử con theo **một chiều** (hàng *hoặc* cột).

| Thuộc Tính | Áp Dụng Cho | Công Dụng & Giải Thích Tham Số |
| ----- | ----- | ----- |
| `display: flex` | Container | Biến phần tử cha thành Flex Container. |
| `flex-direction` | Container | Xác định hướng trục chính (`row` \- ngang, `column` \- dọc). |
| `justify-content` | Container | Căn chỉnh các item trên **Trục Chính** (ví dụ: `center`, `space-between`). |
| `align-items` | Container | Căn chỉnh các item trên **Trục Phụ** (vuông góc với trục chính) (ví dụ: `center`, `start`, `stretch`). |
| `flex-wrap: wrap` | Container | Cho phép các item tự động xuống hàng khi không đủ không gian. |
| `order` | Item | Thay đổi thứ tự hiển thị của item mà không cần thay đổi HTML. Giá trị nhỏ hơn sẽ đứng trước. |
| `flex: 1` | Item | Cú pháp viết tắt (`flex-grow: 1`, `flex-shrink: 1`, `flex-basis: 0`). **Mục đích: Chia không gian đều nhau và tự co giãn**. |

### **4\. Bố Cục Grid (Hai Chiều)**

Grid (Lưới) là hệ thống bố cục mạnh mẽ, được dùng để sắp xếp các phần tử theo **hai chiều** (cả hàng *và* cột).

| Thuộc Tính | Áp Dụng Cho | Công Dụng & Giải Thích Tham Số |
| ----- | ----- | ----- |
| `display: grid` | Container | Biến phần tử cha thành Grid Container. |
| `grid-template-columns` / `rows` | Container | Định nghĩa cấu trúc số lượng và kích thước cột/hàng. |
| Đơn vị `fr` | Giá trị kích thước | Viết tắt của "fraction" (một phần). Đại diện cho một phần không gian còn lại. |
| `minmax(min, max)` | Giá trị kích thước | Đặt kích thước tối thiểu và tối đa cho hàng/cột (ví dụ: `minmax(200px, 1fr)`). |
| `repeat(auto-fit, minmax(...))` | Giá trị kích thước | Tự động tính toán số cột để lấp đầy không gian màn hình. |
| `grid-column: start / end` | Item | Định vị và xác định phạm vi chiếm cột/hàng của item. Có thể dùng `span N` để chiếm N ô. |
| `justify-items` / `align-items` | Container | Căn chỉnh phần tử **bên trong ô** (justify: ngang, align: dọc). |
| `justify-content` / `align-content` | Container | Căn chỉnh **toàn bộ lưới** bên trong container. |

### **5\. Điều Khiển Giao Diện bằng JavaScript (HTML DOM)**

DOM (Document Object Model) là mô hình đối tượng tài liệu, biểu diễn trang HTML dưới dạng cấu trúc cây (`DOM Tree`), cho phép JavaScript truy cập và thay đổi nội dung, style, thuộc tính, hoặc cấu trúc trang.

| Phương Thức/Thuộc Tính | Loại | Công Dụng & Ảnh Hưởng Tham Số |
| ----- | ----- | ----- |
| `document.getElementById('id')` | Truy cập | Trả về một phần tử dựa trên ID. |
| `document.querySelector('selector')` | Truy cập | Trả về phần tử **đầu tiên** khớp với bộ chọn CSS được truyền vào. |
| `element.textContent` | Nội dung | Lấy hoặc thay đổi nội dung văn bản thuần bên trong phần tử (hiển thị cả nội dung bị ẩn bằng CSS). |
| `element.innerText` | Nội dung | Lấy hoặc thay đổi nội dung văn bản chỉ hiển thị trên trình duyệt. |
| `element.innerHTML` | Nội dung | Lấy hoặc thay đổi toàn bộ HTML bên trong phần tử. **Cần cẩn thận khi thay đổi toàn bộ HTML cũ bằng mã HTML mới**. |
| `element.style.property` | Style | Thay đổi style CSS trực tiếp (Inline Style). |
| `element.classList.toggle('class')` | Style | **Bật/tắt** (thêm nếu chưa có, xóa nếu đã có) một class CSS (ví dụ: ẩn/hiện phần tử). |
| `element.setAttribute('name', 'value')` | Thuộc tính | Thêm hoặc thay đổi giá trị của một thuộc tính (Attribute). |
| `document.createElement('tag')` | Thao tác | Tạo một phần tử HTML mới. |
| `parentElement.appendChild(newElement)` | Thao tác | Thêm phần tử mới vào cuối danh sách con của phần tử cha. |

---

## **PHẦN IV: TRA CỨU KỸ NĂNG VÀ TÀI LIỆU NGOÀI**

Trong quá trình xây dựng Web App, các nguồn tài liệu và công cụ bên ngoài được đề cập đóng vai trò quan trọng trong việc nâng cao hiệu suất và chất lượng thiết kế.

| Nguồn Tài Liệu/Công Cụ | Kỹ Năng Liên Quan | Liên Quan Đến Xây Dựng Web |
| ----- | ----- | ----- |
| **MDN Web Docs & W3Schools** | Tra cứu kiến thức nền tảng HTML, CSS, JavaScript. | Cung cấp nguồn tư liệu chuẩn mực, hoạt động như sách giáo khoa và từ điển cho lập trình viên. |
| **GitHub Repository** | Quản lý mã nguồn, thực hành code, thao tác Git (clone/download). | Là nơi lưu trữ tài liệu, mã nguồn dự án, phục vụ cho việc thực hành và hợp tác. |
| **Visual Studio Code Extensions** (Prettier, Live Server) | Cài đặt môi trường phát triển (IDE/Code Editor). | **Prettier:** Tự động định dạng code khi lưu, đảm bảo code gọn gàng, dễ đọc. **Live Server:** Mở trang HTML và tự động tải lại khi có thay đổi, giúp debug nhanh chóng. |
| **HTML Color Codes Page** | Thiết kế giao diện, sử dụng định dạng tên màu CSS. | Liệt kê các tên màu CSS có sẵn để định nghĩa màu sắc. |
| **HSL/Tailwind CSS Color Generator** | Xây dựng hệ thống màu sắc (Color System) chuyên nghiệp, chọn màu trực quan. | HSL trực quan hơn Hex/RGB, giúp dễ dàng điều chỉnh sắc độ, độ bão hòa, và độ sáng. |
| **Type Scale Tool (typescale.com)** | Typography (Nghệ thuật trình bày chữ). | Dùng để tính toán kích thước chữ theo tỷ lệ cố định, đảm bảo bố cục chữ hài hòa và chuyên nghiệp. |
| **Google Developer Tool (Inspect)** | Debugging (tìm lỗi), kiểm tra giao diện và tối ưu hóa. | Kiểm tra độ tương phản màu sắc, xem cấu trúc Box Model, và kiểm tra bố cục Responsive trên các kích thước màn hình khác nhau. |
| **Google Fonts** | Quản lý Font chữ. | Cung cấp thư viện font miễn phí, dễ dàng tích hợp vào website. |
| **CSS Gradient Generator (CSS Portal)** | Thiết kế hiệu ứng nền (Background). | Giúp tạo mã màu chuyển sắc (gradient) mượt mà giữa hai hoặc nhiều màu. |
| **Cubic Bezier Tool** | Animation và Transition. | Tạo đường cong tốc độ tùy chỉnh cho hiệu ứng chuyển động, giúp UI/UX mượt mà và độc đáo hơn. |
| **Emmet Syntax** | Tăng tốc độ code HTML. | Cung cấp các phím tắt và cú pháp ngắn gọn để viết cấu trúc HTML nhanh chóng và chính xác. |
| **EP Mayor Reset CSS** | Tối ưu hóa đa trình duyệt. | Đoạn mã CSS xóa bỏ các kiểu mặc định khác nhau của từng trình duyệt (Chrome, Firefox, Safari), đảm bảo giao diện thống nhất. |

