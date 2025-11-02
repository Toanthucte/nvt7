# Hướng dẫn sử dụng dữ liệu nguyên tử (chem_grade7.json)

## Mục đích

File `chem_grade7.json` chứa dữ liệu của 20 nguyên tố hóa học đầu tiên (từ Hydrogen đến Calcium), được sử dụng để tạo câu hỏi kiểm tra kiến thức về cấu tạo nguyên tử.

## Cấu trúc dữ liệu

Mỗi nguyên tố có các trường:

- `id`: Mã định danh duy nhất (el-1, el-2, ...)
- `symbol`: Ký hiệu hóa học (H, He, Li, ...)
- `name`: Tên nguyên tố (tiếng Anh và tiếng Việt)
- `atomic_number`: Số hiệu nguyên tử (số proton)
- `atomic_mass`: Khối lượng nguyên tử (amu)
- `shells`: Mảng số electron trong từng lớp (từ trong ra ngoài)

## Mẫu cấu trúc câu hỏi 21 tự sinh ngẫu nhiên

```json
{
  "id": 21,
  "type": "fill-table",
  "element": {
    "symbol": "O",
    "name": "Oxygen (Oxy)",
    "atomic_number": 8,
    "atomic_mass": 16,
    "shells": [2, 6]
  },
  "fields": [
    { "label": "Số lớp electron", "answer": 2 },
    { "label": "Số electron lớp ngoài cùng", "answer": 6 },
    { "label": "Chu kì", "answer": 2 },
    { "label": "Nhóm", "answer": "VIA" }
  ]
}
```

## Cách sử dụng trong atom-question.js

1. **Chọn ngẫu nhiên một phần tử** từ danh sách 20 nguyên tố
2. **Hiển thị mô hình nguyên tử** (ký hiệu, tên, cấu hình electron, mô hình SVG)
3. **Tạo bảng điền đáp án** với các trường:
   - Số lớp electron
   - Số electron lớp ngoài cùng
   - Chu kì (bằng số lớp electron)
   - Nhóm (dựa trên số electron lớp ngoài cùng)
4. **Học sinh nhập đáp án**, nhấn nút kiểm tra để so sánh với đáp án đúng
5. **Chấm điểm tự động** và hiển thị kết quả

## Quy tắc tính toán

### Chu kì

Chu kì = số lớp electron

### Nhóm (dựa trên electron lớp ngoài cùng)

- 1 electron → IA
- 2 electron → IIA
- 3 electron → IIIA
- 4 electron → IVA
- 5 electron → VA
- 6 electron → VIA
- 7 electron → VIIA
- 8 electron → VIIIA

## Ví dụ cụ thể

**Oxygen (O):**

- Cấu hình electron: [2, 6]
- Số lớp electron: 2
- Số electron lớp ngoài cùng: 6
- Chu kì: 2
- Nhóm: VIA

**Sodium (Na):**

- Cấu hình electron: [2, 8, 1]
- Số lớp electron: 3
- Số electron lớp ngoài cùng: 1
- Chu kì: 3
- Nhóm: IA
