# 🖼️ Hướng dẫn tạo và sử dụng Thumbnail cho nvt7

## 📌 Tổng quan

Thumbnail (Open Graph Image) là ảnh preview xuất hiện khi bạn chia sẻ link website trên:
- Facebook
- Twitter
- LinkedIn
- Discord
- Telegram
- Zalo
- Và các nền tảng mạng xã hội khác

## 🎨 Files đã tạo

### 1. `assets/og-image.svg` (1200x630px)
- **Format**: SVG vector
- **Nội dung**: 
  - Logo nvt7 với gradient đẹp mắt
  - Tiêu đề "Đến hẹn lại lên - Lớp 7"
  - 3 features highlights (5 môn học, 500+ câu hỏi, Âm thanh HD)
  - GitHub URL ở cuối
- **Ưu điểm**: Chất lượng cao, file nhẹ (~4KB)
- **Nhược điểm**: Một số nền tảng không hỗ trợ SVG

### 2. `thumbnail-converter.html`
- Tool chuyển đổi SVG sang PNG
- Tích hợp sẵn vào project
- Có hướng dẫn chi tiết

## 🚀 Cách sử dụng

### Bước 1: Tạo PNG từ SVG (nếu cần)

1. Mở file `thumbnail-converter.html` trong trình duyệt
2. Nhấn nút "Convert SVG to PNG"
3. Nhấn "Download PNG (1200x630)"
4. Save file với tên `og-image.png`
5. Upload vào folder `assets/`

### Bước 2: Kiểm tra Meta Tags

File `index.html` đã được cập nhật với các meta tags:

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://toanthucte.github.io/nvt7/" />
<meta property="og:title" content="nvt7 - Đến hẹn lại lên - Lớp 7" />
<meta property="og:description" content="Hệ thống ôn thi trực tuyến..." />
<meta property="og:image" content="https://toanthucte.github.io/nvt7/assets/og-image.svg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://toanthucte.github.io/nvt7/assets/og-image.svg" />
```

### Bước 3: Test Thumbnail

#### Option 1: Facebook Debugger
1. Truy cập: https://developers.facebook.com/tools/debug/
2. Nhập URL: `https://toanthucte.github.io/nvt7/`
3. Nhấn "Debug" để xem preview
4. Nhấn "Scrape Again" nếu cần cập nhật

#### Option 2: Twitter Card Validator
1. Truy cập: https://cards-dev.twitter.com/validator
2. Nhập URL
3. Xem preview

#### Option 3: LinkedIn Post Inspector
1. Truy cập: https://www.linkedin.com/post-inspector/
2. Nhập URL
3. Xem preview

## 📊 Kích thước chuẩn

| Nền tảng | Kích thước khuyến nghị | Tỷ lệ |
|----------|------------------------|-------|
| Facebook | 1200x630px | 1.91:1 |
| Twitter | 1200x675px | 16:9 |
| LinkedIn | 1200x627px | 1.91:1 |
| Instagram | 1080x1080px | 1:1 |

✅ File `og-image.svg` (1200x630px) phù hợp với hầu hết nền tảng!

## 🔧 Tùy chỉnh Thumbnail

### Thay đổi nội dung:

Edit file `assets/og-image.svg`:

```xml
<!-- Thay đổi tiêu đề -->
<text x="0" y="80" ...>
  Tiêu đề mới của bạn
</text>

<!-- Thay đổi subtitle -->
<text x="0" y="140" ...>
  Mô tả mới
</text>

<!-- Thay đổi features -->
<text x="0" y="50" ...>
  Text mới
</text>
```

### Thay đổi màu sắc:

```xml
<!-- Background gradient -->
<linearGradient id="bgGrad" ...>
  <stop offset="0%" style="stop-color:#219ebc" />  <!-- Đổi màu này -->
  <stop offset="100%" style="stop-color:#023047" /> <!-- Và màu này -->
</linearGradient>
```

## 📱 Xem trước Thumbnail

### Trên máy local:

```bash
# Mở file trong trình duyệt
cd "j:\Drive của tôi\Học HTML-CSS-JS"
start thumbnail-converter.html
```

### Sau khi deploy:

Chia sẻ link trên bất kỳ nền tảng nào để xem thumbnail xuất hiện!

## ⚠️ Lưu ý quan trọng

### 1. URL phải đúng
- ❌ SAI: `assets/og-image.svg` (relative path)
- ✅ ĐÚNG: `https://toanthucte.github.io/nvt7/assets/og-image.svg` (absolute URL)

### 2. File phải public
- Thumbnail phải được host trên server public (GitHub Pages)
- Không thể dùng file local trên máy tính

### 3. Cache
- Nền tảng mạng xã hội cache thumbnail
- Sau khi update, dùng debug tools để "Scrape Again"

### 4. File size
- SVG: ~4KB (nhẹ, nhanh load)
- PNG: ~50-100KB (nặng hơn nhưng tương thích tốt)

## 🎯 Checklist hoàn chỉnh

- [x] Tạo file `og-image.svg`
- [x] Thêm Open Graph meta tags vào `index.html`
- [x] Thêm Twitter Card meta tags
- [x] Tạo tool `thumbnail-converter.html`
- [ ] Convert SVG sang PNG (nếu cần)
- [ ] Upload lên GitHub
- [ ] Deploy GitHub Pages
- [ ] Test với Facebook Debugger
- [ ] Test với Twitter Card Validator
- [ ] Chia sẻ link để kiểm tra thực tế

## 📞 Troubleshooting

### Thumbnail không hiện?

1. **Kiểm tra URL**: Phải là absolute URL, không phải relative
2. **Kiểm tra file tồn tại**: Truy cập trực tiếp URL của thumbnail
3. **Clear cache**: Dùng debug tools để scrape again
4. **Đợi cache**: Có thể mất 5-10 phút để cache update

### Thumbnail bị mờ?

1. **Dùng PNG** thay vì SVG nếu nền tảng không hỗ trợ
2. **Kiểm tra kích thước**: Phải đúng 1200x630px
3. **Kiểm tra quality**: PNG phải là high quality (không nén quá)

### Thumbnail sai nội dung?

1. **Update meta tags** trong HTML
2. **Clear cache** trên nền tảng social
3. **Redeploy** GitHub Pages

## 🌟 Best Practices

✅ **DO**:
- Dùng kích thước chuẩn 1200x630px
- Text rõ ràng, dễ đọc
- Logo nổi bật
- Màu sắc hài hòa với brand
- Thêm CTA hoặc highlights

❌ **DON'T**:
- Text quá nhỏ (khó đọc trên mobile)
- Quá nhiều thông tin
- Màu sắc chói mắt
- Logo quá nhỏ
- File quá nặng (>1MB)

## 📚 Resources

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Guide](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

**Thumbnail của bạn đã sẵn sàng để tạo ấn tượng tốt khi chia sẻ!** 🎉
