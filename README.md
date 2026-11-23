# ⚡ QuizStage — English Tutor Game Show
Web app thiết kế bài tập trắc nghiệm & tương tác Tiếng Anh theo phong cách Game Show rực rỡ (Kahoot / Quizizz), tối ưu riêng cho **Gia sư dạy 1-1 hoặc nhóm nhỏ qua share màn hình** (không cần tạo room, không cần mã PIN, không cần bảng xếp hạng nhiều người).
## ✨ Tính năng nổi bật
- **3 dạng câu hỏi Tiếng Anh:**
  - `🔘 Trắc nghiệm (MCQ)`: 2–4 lựa chọn màu sắc 3D, hỗ trợ khóa lựa chọn 2 bước (`🔒 Đã chốt? -> Mở đáp án`) hoặc mở ngay 1 bước.
  - `🧩 Sắp xếp câu (Unscramble)`: Tự tách từ/cụm từ (ngăn cách bởi `/`), xáo trộn thẻ từ kèm số thứ tự `1..N` để học sinh đọc ghép câu.
  - `⌨️ Điền từ / Chia động từ (Type-in)`: Gõ đáp án, hỗ trợ nhiều biến thể đúng ngăn cách bởi `/` và gợi ý chữ cái đầu.
- **Soạn bài siêu tốc (Quick Editor + Smart Paste + AI Prompt):**
  - Dán hàng loạt câu hỏi từ Word / PDF / ChatGPT với cú pháp `1.`, `A. B. C. D.`, `*` hoặc `Đáp án:`, `Giải thích:`, cùng tag `[Unscramble]` và `[Type-in]`.
  - Hỗ trợ `_____` (ô trống tự điền đáp án đúng khi mở), `**in đậm**`, `__gạch chân__` (tìm lỗi sai / phát âm), và `Ctrl+V` dán ảnh trực tiếp vào câu hỏi.
- **Công cụ giảng dạy trực tiếp khi Share Screen:**
  - `🗣️ Đọc` Tiếng Anh US/UK (Text-to-Speech).
  - `👁️ Che đáp án` để học sinh suy nghĩ trước khi nhìn lựa chọn.
  - `✂️ 50/50`, `⏱️ Đếm ngược (+15s / Tạm dừng)`, `✏️ Bút vẽ / Highlight` trực tiếp lên màn hình, `🚩 Đánh dấu câu cần ôn`.
  - **Giỏ Từ Vựng Buổi Học (`📒 Từ vựng`):** Bôi đen hoặc click đúp từ Tiếng Anh ngay trên câu hỏi/giải thích để phát âm và lưu vào giỏ từ vựng cuối buổi.
  - **Hộp Bí Ẩn (Mystery Chest) khi đạt `3x Streak`:** Mở hộp nhận `🛡️ Khiên Bảo Vệ`, `⚡ x2 Điểm`, `🌟 +200 Stars`, hoặc `✂️ Free 50/50`.
  - **Âm thanh Game Show (Web Audio API):** Tự tổng hợp SFX & BGM không cần file nhạc ngoài.
- **Tổng kết & Sao lưu:**
  - Làm lại ngay các câu sai & đánh dấu (`🔄 Làm lại câu sai`).
  - Copy báo cáo kèm danh sách từ vựng gửi phụ huynh / học sinh qua Zalo, Messenger.
  - Lưu trữ trên `localStorage` kèm nút **`💾 Sao lưu tất cả (.json)`** và **`📥 Import`** khôi phục dữ liệu.
## ⌨️ Phím tắt trình chiếu
- `1`–`4` / `A`–`D`: Chọn đáp án MCQ (`1`–`9` & `Backspace` cho Unscramble)
- `Space` / `Enter`: Mở đáp án / Kiểm tra / Sang câu tiếp theo
- `←` / `→`: Câu trước / Câu sau
- `H`: Che / Hiện đáp án
- `5`: Trợ giúp 50/50
- `R`: Đọc câu hỏi (US/UK)
- `P`: Bật / Tắt bút vẽ
- `V`: Mở Giỏ từ vựng
- `B`: Đánh dấu câu lưu ý
- `M`: Bật / Tắt nhạc nền
- `F`: Toàn màn hình
## 🚀 Cách chạy hoặc bật GitHub Pages
- **Chạy trên máy:** Mở trực tiếp file `index.html` trên trình duyệt hoặc chạy `python -m http.server 8123`.
- **Chạy online qua GitHub Pages:** Vào **Settings → Pages → Branch: `main` (`/root`) → Save** để có link web chia sẻ dùng ở mọi nơi.
