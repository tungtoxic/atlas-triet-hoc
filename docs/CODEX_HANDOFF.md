# Bàn giao để tiếp tục trong Codex

## Đọc đầu tiên

1. `AGENTS.md`.
2. `docs/PROJECT_BRIEF.md`.
3. `docs/GROUP_PROPOSAL.md`.
4. `docs/QA.md`.

Đây là mã nguồn React đã có luồng chức năng, không phải thư mục trống cần scaffold lại. Không giả định phiên mới đã đọc cuộc trò chuyện trước.

## Trạng thái bản 0.1

- Giữ đầy đủ 46 mốc / 68 liên hệ của Atlas gốc.
- Đã chuyển giao diện sang React, thêm tìm kiếm, mốc đã lưu và tuyến học Kant–Marx.
- Đã xây các chặng Human Journey, tiến độ, lưu lựa chọn, ghi chú, xuất Markdown và chế độ trình bày.
- 12 ảnh historical local và các hình SVG; nguồn ảnh, tác giả và giấy phép có tại `src/data/media.json` / `docs/IMAGE_CREDITS.md`.
- Dùng hash routes để không cần backend fallback khi phục vụ build tĩnh.
- Chưa thêm backend, tài khoản, analytics, AI API hoặc đồng bộ đa thiết bị.
- Phiên bản Sites cũ và repo nguồn của nó không bị sửa trong lần bàn giao này.

## Chạy và kiểm tra

```bash
npm ci
npm run dev
```

Ứng dụng: `http://127.0.0.1:5173`.

```bash
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

## Thứ tự hoàn thiện đề xuất

1. Đối chiếu nội dung với giáo trình MLN111 và rubric khi người dùng cung cấp; thống nhất cách gọi thuật ngữ và trích dẫn chính xác.
2. Review trực tiếp bản hiện tại cùng người dùng: giữ hoặc điều chỉnh phong cách kem/xanh, nhân vật và bố cục.
3. Nâng trải nghiệm kể chuyện của chặng lao động và chuyển đổi ba lô → tha hóa → giải phóng. Giữ các phân biệt học thuật trong AGENTS.
4. Bổ sung ảnh có nguồn cho các truyền thống/nhân vật Atlas còn thiếu; ưu tiên Hy Lạp, Ấn Độ và ảnh Hồ Chí Minh với nhân dân thay vì chỉ chân dung.
5. Chuẩn bị cấu hình trình bày theo thời lượng thực tế và bổ sung tên nhóm/thành viên nếu được yêu cầu.

Không tự đánh dấu những việc này đã xong. Đây là ưu tiên bước tiếp theo sau bản chức năng đầu tiên.

## Prompt có thể đưa vào Codex

> Đọc AGENTS.md, docs/PROJECT_BRIEF.md, docs/GROUP_PROPOSAL.md, docs/CODEX_HANDOFF.md và docs/QA.md. Đây là dự án React Atlas Triết học — Hành trình con người, chiếm 30% điểm môn MLN111 của nhóm tôi. Mã nguồn và các luồng đã có; hãy chạy dự án, xem các màn hình thực tế rồi tiếp tục hoàn thiện chất lượng kể chuyện, thiết kế và nội dung học thuật. Giữ dữ liệu Atlas, khả năng chạy offline sau khi cài và các nguồn ảnh. Làm việc trong thư mục hiện tại, kiểm tra các thay đổi. Không push GitHub hoặc công khai website khi chưa có yêu cầu của tôi.

## GitHub nếu cần làm việc nhóm

Tạo repository **Private** để quản lý mã nguồn này. Không đưa `node_modules`, file `.env`, browser cache hoặc kết quả Playwright vào Git. `.gitignore` đã được chuẩn bị. Thư mục `dist` có trong gói để tiện preview nhưng được Git bỏ qua; build lại từ nguồn.
