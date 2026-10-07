# Atlas Triết học — Hành trình con người

Dự án React hỗ trợ trình bày sản phẩm sáng tạo môn MLN111. Bản đầu tiên kết hợp Atlas lịch sử triết học với hành trình tương tác về con người theo quan điểm Mác–Lênin. Dự án của nhóm chiếm 30% điểm môn học; ưu tiên kiến thức đúng, trải nghiệm có ý nghĩa và trình bày ổn định.

## Mở dự án trên laptop

1. Giải nén và mở **thư mục `philosophy-studio`** trong VS Code.
2. Cài Node.js từ 22.12 trở lên nếu máy chưa có. Node.js 24 cũng phù hợp.
3. Mở Terminal tại thư mục có `package.json`:

```bash
npm ci
npm run dev
```

4. Mở `http://127.0.0.1:5173`. Giữ Terminal mở trong khi trình bày.

Lần cài thư viện đầu tiên cần Internet. Sau khi đã cài, ứng dụng và ảnh đi kèm chạy bằng máy chủ local mà không cần Internet. Các liên kết đọc tài liệu ngoài cần Internet.

Không mở trực tiếp `index.html` bằng nhấp đúp: đây là mã nguồn React/Vite. Đây là dự án frontend; Node.js dùng cho công cụ phát triển, build và phục vụ các file local, không có API hay database.

## Chạy bản build để trình bày

```bash
npm run build
npm run preview
```

Mở `http://127.0.0.1:4173`. Thư mục `dist/` chứa bản build tĩnh đã kèm ảnh. Sau khi sửa mã nguồn, build lại trước khi preview.

Các cổng được đặt cố định. Nếu cổng bận, đóng tiến trình cũ hoặc dùng `npm run dev -- --port 5174` và mở cổng tương ứng.

## Tiếp tục bằng Codex

Cài extension Codex chính thức trong VS Code, đăng nhập, mở thư mục dự án này và yêu cầu đọc:

- `AGENTS.md`: các quy tắc dự án.
- `docs/PROJECT_BRIEF.md`: mục tiêu và phạm vi của nhóm.
- `docs/CODEX_HANDOFF.md`: trạng thái, cách chạy và công việc tiếp theo.
- `docs/QA.md`: bằng chứng kiểm tra và giới hạn.

Không cần GitHub để làm việc với thư mục local. Nếu nhóm muốn quản lý phiên bản trên GitHub, tạo repository **Private** rồi đưa mã nguồn lên khi đã thống nhất. Dự án này chưa được push hoặc triển khai công khai.

## Nội dung đã có

- Trang tổng quan và hai module chính.
- Atlas: 46 mốc, 68 liên hệ; lọc theo thời kỳ/khu vực/trường phái; tìm kiếm không dấu; chi tiết và tài liệu nguồn; lưu mốc; flashcard; tuyến Kant → Hegel → Feuerbach → Marx.
- Hành trình: mở đầu tự nhiên–xã hội, 8 chặng nội dung và phần liên hệ cuối.
- Mạng quan hệ xã hội bằng React Flow, khám phá theo hai chiều.
- Bốn bối cảnh lịch sử; ba lô hỗ trợ/áp lực có kéo thả và nút bấm.
- Bốn tình huống lao động bị tha hóa; lựa chọn cải biến điều kiện phát triển.
- Cá nhân–xã hội; quần chúng–lãnh tụ; con người trong phát triển Việt Nam.
- Chọn ba giá trị và ghi một hành động cụ thể.
- Sổ tay, xuất Markdown, lưu tiến độ và lựa chọn trong `localStorage`.
- 12 ảnh tư liệu đóng gói trong `public/images`; xem nguồn và giấy phép trong website hoặc `docs/IMAGE_CREDITS.md`.
- Chế độ trình bày: nút trên thanh đầu trang hoặc **P**. Ở Hành trình, dùng **← / →** để chuyển chặng. Phím tắt không hoạt động khi đang nhập nội dung.

Tiến độ đánh dấu việc khám phá, không phải chứng nhận hiểu bài. Nút “Đã khám phá · Tiếp tục” ghi nhận một phần đã học. Khám phá lại giữ sổ tay và các mốc đã lưu.

## Cấu trúc mã nguồn

```text
src/
  App.jsx                 Điều hướng, lưu trạng thái, sổ tay, tài liệu
  state.js                Kiểm tra và chuyển trạng thái, xuất sổ tay
  components/UI.jsx       Nút, icon, ảnh, phản hồi, nhân vật SVG
  features/Home.jsx       Trang tổng quan
  features/Atlas.jsx      Atlas và ôn tập
  features/Journey.jsx    Các chặng học tương tác
  data/atlas.js           Dữ liệu Atlas gốc và quan hệ
  data/journey.js         Nội dung học, câu hỏi, lựa chọn, nguồn
  data/media.json         Danh mục ảnh và ghi công
  styles.css              Thiết kế và responsive
public/images/            Ảnh sử dụng offline
tests/                    Kiểm tra dữ liệu và luồng trình duyệt
docs/                     Bàn giao, đề xuất và kiểm tra
```

## Kiểm tra

```bash
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Kiểm tra trình duyệt cần tải Chromium một lần. Các kiểm tra dữ liệu không cần browser. Chi tiết tại `docs/QA.md`.

## Trước khi nộp giảng viên

Đối chiếu thuật ngữ và các đoạn diễn giải với giáo trình MLN111 của lớp. Bổ sung tên nhóm/thành viên, yêu cầu của giảng viên và phân công thuyết trình. Tập chạy trên đúng laptop và máy chiếu dự kiến sử dụng. Đây là bản triển khai đầu tiên để tiếp tục hoàn thiện, không phải khẳng định sản phẩm đã được giảng viên duyệt.
