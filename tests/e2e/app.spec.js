import { test,expect } from '@playwright/test';

const chapter=async(page,name)=>{await page.locator('.chapter-nav').getByRole('button',{name:new RegExp(name)}).click();};
test.beforeEach(async({page})=>{await page.goto('/');});

test('Overview opens without runtime errors and links to the journey',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await expect(page.locator('h1')).toContainText('hành trình con người');
  await page.getByRole('button',{name:'Bắt đầu hành trình',exact:true}).click();
  await expect(page.locator('h1')).toContainText('Điều gì tạo nên một con người');expect(errors).toEqual([]);
});
test('Atlas retains all milestones, filters, empty state and review cards',async({page})=>{
  await page.goto('/#/atlas');await expect(page.locator('.milestone')).toHaveCount(46);
  await page.getByRole('combobox',{name:'Khu vực',exact:true}).selectOption('india');
  await expect(page.locator('.milestone')).not.toHaveCount(46);
  expect(await page.locator('.milestone .region-label').allTextContents()).toEqual(expect.arrayContaining(['Ấn Độ']));
  await page.getByLabel('Tìm tư tưởng hoặc nhân vật').fill('unfindable-value');await expect(page.getByText('Chưa có mốc phù hợp.')).toBeVisible();
  await page.getByRole('button',{name:'Bỏ bộ lọc',exact:true}).last().click();await expect(page.locator('.milestone')).toHaveCount(46);
  await page.getByRole('button',{name:'Ôn tập',exact:true}).click();await expect(page.locator('.study-answer')).toHaveCount(0);
  await page.getByRole('button',{name:'Xem gợi ý'}).click();await expect(page.locator('.study-answer')).toBeVisible();
  await page.getByRole('button',{name:'Thẻ tiếp'}).click();await expect(page.locator('.study-answer')).toHaveCount(0);
});
test('Related milestone outside active filters resets the filters and opens its detail',async({page})=>{
  await page.goto('/#/atlas');await page.getByRole('combobox',{name:'Khu vực',exact:true}).selectOption('india');
  await page.locator('.milestone').filter({hasText:'Epicurus'}).count().then(n=>expect(n).toBe(0));
  await page.getByRole('button',{name:'Tuyến học Kant → Marx'}).click();
  await expect(page.locator('.atlas-detail h2')).toContainText('Kant');
  await expect(page.getByRole('combobox',{name:'Khu vực',exact:true})).toHaveValue('all');
  await page.locator('.guided-route').getByRole('button',{name:/4\./}).click();await expect(page.locator('.atlas-detail h2')).toContainText('Marx');
  await page.getByRole('button',{name:'Lưu mốc',exact:true}).click();await page.reload();
  await expect(page.getByRole('button',{name:'Bỏ lưu mốc',exact:true})).toBeVisible();
  await page.locator('.atlas-detail').getByRole('button',{name:'Khám phá con người'}).click();await expect(page.locator('.chapter-nav')).toBeVisible();
});
test('Social network explores eight factors and changes the direction of agency',async({page})=>{
  await page.goto('/#/journey');await chapter(page,'Quan hệ xã hội');
  await expect(page.locator('.factor-node')).toHaveCount(8);
  await page.locator('.factor-node').filter({hasText:'Giáo dục'}).click();await expect(page.locator('.factor-detail h2')).toHaveText('Giáo dục');
  await page.getByRole('button',{name:'Cá nhân → Xã hội',exact:true}).click();await expect(page.locator('.factor-detail')).toContainText('Người học có thể phản hồi');
  await page.getByRole('button',{name:'Hiện toàn bộ các kết nối'}).click();await expect(page.getByText('8/8 quan hệ đã khám phá')).toBeVisible();
  await page.reload();await expect(page.getByText('8/8 quan hệ đã khám phá')).toBeVisible();
});
test('Historical selector and slider change learning, work and social conditions',async({page})=>{
  await page.goto('/#/journey');await chapter(page,'Tính lịch sử');
  await page.locator('.history-selector').getByRole('button',{name:'Công nghiệp'}).click();await expect(page.locator('.history-detail')).toContainText('Phân công lao động');
  await page.getByLabel('Bối cảnh lịch sử',{exact:true}).fill('3');await expect(page.locator('.history-detail')).toContainText('AI hỗ trợ');
});
test('Backpack supports click, drag and removal without conflating stress with alienation',async({page})=>{
  await page.goto('/#/journey');await chapter(page,'Ba lô cuộc đời');
  await page.getByRole('button',{name:'Áp lực công việc',exact:true}).click();await expect(page.getByText('1/5 áp lực được thêm')).toBeVisible();
  await page.getByRole('button',{name:'Lo lắng tài chính',exact:true}).dragTo(page.locator('.backpack-stage'));
  await expect(page.getByText('2/5 áp lực được thêm')).toBeVisible();
  await page.getByRole('button',{name:'Áp lực công việc',exact:true}).click();await expect(page.getByText('1/5 áp lực được thêm')).toBeVisible();
  await expect(page.getByText('Áp lực chưa đủ để kết luận về tha hóa.')).toBeVisible();
});
test('Four labour situations retain answers and give dimension-specific feedback',async({page})=>{
  await page.goto('/#/journey');await chapter(page,'Lao động & tha hóa');
  for(const [index,answer] of [[0,'Sản phẩm lao động'],[1,'Hoạt động lao động'],[2,'Năng lực hoạt động tự do, có ý thức'],[3,'Người với người']]){
    await page.locator('.work-scene-tabs button').nth(index).click();await page.getByRole('button',{name:new RegExp(answer)}).click();await expect(page.getByText('Bạn đã nhận ra chiều cạnh này.')).toBeVisible();
  }
  await expect(page.getByText('4/4 tình huống đã trả lời')).toBeVisible();await page.reload();await expect(page.getByText('4/4 tình huống đã trả lời')).toBeVisible();
});
test('Liberation, individual-society and masses activities respond to choices',async({page})=>{
  await page.goto('/#/journey');await chapter(page,'Giải phóng');
  await page.getByRole('button',{name:/Chưa đầy đủ, cần xem xét/}).click();
  for(const button of await page.locator('.reform-card').all())await button.click();await expect(page.locator('.liberation-stage')).toHaveClass(/free/);
  await chapter(page,'Cá nhân & xã hội');await page.getByRole('button',{name:/Hai phía tác động qua lại/}).click();await expect(page.locator('.feedback')).toHaveClass(/positive/);
  await chapter(page,'Chủ thể lịch sử');await page.getByRole('button',{name:/Quần chúng nhân dân/}).click();await expect(page.locator('.feedback')).toHaveClass(/positive/);
  await page.getByText('Vậy cá nhân kiệt xuất và lãnh tụ có vai trò không?').click();await expect(page.getByText(/Họ có thể nhận thức xu thế/)).toBeVisible();
});
test('Vietnam cards and the final reflection connect values to concrete action',async({page})=>{
  await page.goto('/#/journey');await chapter(page,'Liên hệ Việt Nam');await page.locator('.vietnam-cards').getByRole('button',{name:/Dựa vào con người/}).click();await expect(page.locator('.vietnam-detail')).toContainText('Nhân dân là chủ thể');
  await chapter(page,'Còn bạn thì sao');
  for(const label of ['Học tập','Sáng tạo','Trách nhiệm cộng đồng'])await page.locator('.value-grid').getByRole('button',{name:label,exact:true}).click();
  await expect(page.getByText('Đã chọn 3/3 giá trị')).toBeVisible();await expect(page.locator('.value-grid').getByRole('button',{name:'Đạo đức',exact:true})).toBeDisabled();
  await page.getByLabel('Một hành động tôi sẽ thực hiện').fill('Tổ chức một buổi ôn tập cho nhóm.');await page.getByRole('button',{name:'Lưu cam kết',exact:true}).click();
  await page.getByRole('button',{name:'Mở sổ tay',exact:true}).click();await expect(page.locator('.note-card')).toContainText('Tổ chức một buổi ôn tập cho nhóm.');
});
test('Notebook stores literal user text, exports Markdown and replay preserves notes',async({page})=>{
  await page.goto('/#/notebook');await page.getByLabel('Điều bạn muốn ghi nhớ').fill('<img src=x onerror=alert(1)> Một câu hỏi');await page.getByRole('button',{name:'Lưu ghi chú',exact:true}).click();
  await expect(page.locator('.note-card img')).toHaveCount(0);await expect(page.locator('.note-card')).toContainText('<img src=x');
  const promise=page.waitForEvent('download');await page.getByRole('button',{name:'Xuất sổ tay'}).click();expect((await promise).suggestedFilename()).toBe('so-tay-triet-hoc.md');
  await page.getByRole('button',{name:'Bắt đầu lại hành trình'}).click();await page.locator('nav').getByRole('button',{name:'Sổ tay'}).click();await expect(page.locator('.note-card')).toHaveCount(1);
});
test('Presentation keyboard navigation works and text entry does not advance chapters',async({page})=>{
  await page.goto('/#/journey');await page.keyboard.press('p');await expect(page.locator('.presenter-dock')).toBeVisible();await page.keyboard.press('ArrowRight');await expect(page.locator('h1')).toHaveText('Điều gì tạo nên tôi?');await page.keyboard.press('ArrowLeft');await expect(page.locator('h1')).toContainText('Điều gì tạo nên một con người');await page.keyboard.press('p');
  await page.locator('.chapter-note summary').click();await page.getByLabel(/Suy nghĩ của bạn/).fill('p');await page.keyboard.press('ArrowRight');await expect(page.locator('.presenter-dock')).toHaveCount(0);
});
test('Built application works when all non-local network requests are blocked',async({page})=>{
  const failures=[];page.on('pageerror',e=>failures.push(e.message));
  await page.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
  await page.goto('/#/atlas/marx');await expect(page.locator('.atlas-detail h2')).toContainText('Marx');
  for(const img of await page.locator('.atlas-detail img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);}
  await page.goto('/#/journey');await chapter(page,'Liên hệ Việt Nam');await expect.poll(()=>page.locator('.vietnam-image img').evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);expect(failures).toEqual([]);
});
test('All twelve credited local historical images load',async({page})=>{
  await page.goto('/#/sources');await expect(page.locator('.credit-card')).toHaveCount(12);
  for(const img of await page.locator('.credit-card img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);}
});
for(const width of [390,768,1366])test(`All pages and ten chapters fit a ${width}px viewport without horizontal overflow`,async({page})=>{
  await page.setViewportSize({width,height:900});
  const check=async()=>{expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);};
  for(const route of ['home','atlas','notebook','sources','journey']){await page.goto(`/#/${route}`);await expect(page.locator('h1')).toBeVisible();await check();}
  for(let i=0;i<10;i++){await page.locator('.chapter-nav button').nth(i).click();await expect(page.locator('h1')).toBeVisible();await check();}
});
