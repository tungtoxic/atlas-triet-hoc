# Kiểm tra bản React 0.1

Ngày: 07/10/2026. Mã nguồn trong gói này đã được build và chạy local; chưa được push GitHub hoặc triển khai lên Sites.

## Kết quả

| Kiểm tra | Kết quả |
| --- | --- |
| `npm test` | 6/6 đạt |
| `npm run build` | Thành công |
| Toàn bộ Playwright | 16/16 đạt, Chromium headless |
| Kiểm tra lại sau chỉnh ảnh và chuyển chặng | 7/7 kiểm tra liên quan đạt |
| Console khi chụp các màn chính | Không có lỗi runtime |
| Giao diện | Đã xem ảnh chụp desktop và mobile |

## Phạm vi đã kiểm tra

- 46 mốc Atlas, 68 liên hệ, ID duy nhất và đầu mút của quan hệ hợp lệ.
- Lọc theo khoảng thời gian có giao nhau; trường hợp một mốc xuất hiện ở hai thời kỳ.
- Tìm kiếm, lọc khu vực, trạng thái không có kết quả và bỏ bộ lọc.
- Chuyển từ tuyến Kant–Marx sang Hành trình; giữ mốc đã chọn và mốc đã lưu sau reload.
- Thẻ ôn tập, mở đáp án và chuyển thẻ.
- Bấm nút trong React Flow; nội dung chi tiết; hai chiều xã hội–cá nhân; khám phá đủ 8 quan hệ.
- Chọn bối cảnh lịch sử bằng nút và slider.
- Thêm / bỏ thẻ ba lô bằng click; thêm bằng drag-and-drop thật.
- Trả lời 4 tình huống lao động, phản hồi tương ứng và lưu lựa chọn sau reload.
- Mở các hướng cải biến; lựa chọn cá nhân–xã hội và quần chúng; phần mở rộng về lãnh tụ.
- Thẻ liên hệ Việt Nam, giới hạn 3 giá trị, viết cam kết và lưu sổ tay.
- Ghi chú hiển thị như văn bản, không thực thi HTML; xuất file Markdown; replay giữ ghi chú.
- Dữ liệu lưu bị lỗi hoặc chứa ID / chỉ số không hợp lệ không gây crash.
- Phím P, ←, →; phím nhập văn bản không kích hoạt chế độ trình bày.
- Chặn toàn bộ yêu cầu mạng không phải local: Atlas, Hành trình và ảnh vẫn hoạt động.
- 12 ảnh tư liệu local tải được; nguồn ảnh và giấy phép có trong website.
- Các trang và cả 10 phần Hành trình không tràn ngang ở 390, 768 và 1366 px.

## Hình tham khảo

Xem `docs/previews/`: tổng quan, mạng quan hệ, lao động, Việt Nam, Atlas và mạng quan hệ trên mobile.

## Giới hạn cần phân biệt

- Kiểm tra tự động thực hiện trên Chromium trong môi trường Linux, chưa trên laptop Windows thực tế hoặc máy chiếu của lớp.
- Nội dung mới có nguồn đọc và dựa trên đề xuất của nhóm, nhưng chưa đối chiếu toàn bộ với đúng giáo trình/rubric của giảng viên vì chưa được cung cấp.
- Đây là trải nghiệm học tập có kịch bản, không phải mô hình định lượng tâm lý hoặc mô phỏng lịch sử dự báo.
- Đã có chân dung Hồ Chí Minh; bộ ảnh Hồ Chí Minh với nhân dân và ảnh tư liệu cho các vùng Atlas còn thiếu là ưu tiên hoàn thiện tiếp.
- Sổ tay chỉ lưu trong trình duyệt của thiết bị hiện tại; không đồng bộ giữa các máy. Dùng xuất Markdown để giữ bản riêng.

## Ghi chú công cụ

Build là SPA chỉ chạy trong trình duyệt. Cấu hình chỉ bỏ qua cảnh báo `use client` từ các thư viện client vì không sử dụng React Server Components; các cảnh báo khác vẫn được giữ. Mã được chia theo module để tải riêng Atlas và Hành trình.

Trong môi trường kiểm tra này, Chromium mặc định không tải được, nên đã dùng binary Chromium tương thích qua cấu hình `E2E_CHROMIUM_PATH`. Binary đó không được đưa vào gói. Trên laptop, dùng `npx playwright install chromium` rồi `npm run test:e2e` như README.
