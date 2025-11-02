# Typography System - Cập nhật ngày 01/11/2025

## 🎨 **Google Fonts được sử dụng:**

1. **Montserrat** - Font cho tiêu đề (Headings)
2. **Inter Tight** - Font cho nội dung (Body text)
3. **Source Serif 4** - Font serif cho các trường hợp đặc biệt

## 📐 **Type Scale: 1.414 (Augmented Fourth)**

### Kích thước font:
- **Base:** 16px (1rem)
- **h1:** 7.993rem (127.888px)
- **h2:** 5.653rem (90.448px)
- **h3:** 3.998rem (63.968px)
- **h4:** 2.827rem (45.232px)
- **h5:** 1.999rem (31.984px)
- **h6:** 1.414rem (22.624px)
- **p:** 1rem (16px)
- **small:** 0.707rem (11.312px)
- **xsmall:** 0.5rem (8px)

## 🎯 **Typography Settings:**

- **Font Weight:** 500 (medium)
- **Line Height:** 1.6
- **Letter Spacing:** 0em
- **Color:** #222222
- **Background:** #FFFFFF

## 📱 **Responsive Breakpoints:**

### Tablet (max-width: 768px):
- h1: 3.998rem
- h2: 2.827rem
- h3: 1.999rem
- h4: 1.414rem

### Mobile (max-width: 480px):
- h1: 2.827rem
- h2: 1.999rem
- h3: 1.414rem

## 🎨 **CSS Variables:**

```css
--font-heading: 'Montserrat', sans-serif;
--font-body: 'Inter Tight', sans-serif;
--font-serif: 'Source Serif 4', serif;

--font-size-h1: 7.993rem;
--font-size-h2: 5.653rem;
--font-size-h3: 3.998rem;
--font-size-h4: 2.827rem;
--font-size-h5: 1.999rem;
--font-size-h6: 1.414rem;
--font-size-base: 1rem;
--font-size-small: 0.707rem;
--font-size-xsmall: 0.5rem;

--font-weight: 500;
--line-height: 1.6;
--letter-spacing: 0em;
```

## 🛠️ **Utility Classes:**

### Font Families:
- `.text-heading` - Montserrat
- `.text-body` - Inter Tight
- `.text-serif` - Source Serif 4

### Font Sizes:
- `.text-small` - 0.707rem
- `.text-xsmall` - 0.5rem

### Font Weights:
- `.font-weight-normal` - 500
- `.font-weight-semibold` - 600
- `.font-weight-bold` - 700

### Line Heights:
- `.line-height-tight` - 1.2
- `.line-height-normal` - 1.6
- `.line-height-loose` - 2

## ✅ **Các thay đổi đã thực hiện:**

1. ✅ Thêm Google Fonts vào `index.html`
2. ✅ Cập nhật CSS Variables với Type Scale 1.414
3. ✅ Áp dụng font families cho headings và body
4. ✅ Cập nhật tất cả heading sizes theo scale
5. ✅ Thiết lập font-weight: 500 cho toàn bộ
6. ✅ Thiết lập line-height: 1.6
7. ✅ Cập nhật màu text: #222222
8. ✅ Cập nhật background: #FFFFFF
9. ✅ Thêm styles cho buttons
10. ✅ Thêm styles cho form elements
11. ✅ Thêm responsive typography
12. ✅ Thêm utility classes

## 📝 **Hướng dẫn sử dụng:**

### Headings:
```html
<h1>Tiêu đề cấp 1</h1> <!-- Montserrat, 7.993rem, 700 weight -->
<h2>Tiêu đề cấp 2</h2> <!-- Montserrat, 5.653rem, 700 weight -->
<h3>Tiêu đề cấp 3</h3> <!-- Montserrat, 3.998rem, 600 weight -->
```

### Body Text:
```html
<p>Đoạn văn bản thông thường</p> <!-- Inter Tight, 1rem, 500 weight -->
<small>Chữ nhỏ</small> <!-- 0.707rem -->
```

### Buttons:
```html
<button>Click me</button> <!-- Montserrat, 1rem, 600 weight -->
```

## 🎨 **Color Palette:**

- **Primary:** #219ebc
- **Secondary:** #023047
- **Accent:** #ffb703
- **Text:** #222222
- **Background:** #FFFFFF
- **Neutral BG:** #f8f9fa

## 📊 **Tỉ lệ Type Scale 1.414:**

```
8px    (0.5rem)     - xsmall
11px   (0.707rem)   - small
16px   (1rem)       - base
23px   (1.414rem)   - h6
32px   (1.999rem)   - h5
45px   (2.827rem)   - h4
64px   (3.998rem)   - h3
90px   (5.653rem)   - h2
128px  (7.993rem)   - h1
```
