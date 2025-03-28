describe('對話測試範例', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('應該正確載入頁面元素', () => {
    // 檢查標題
    cy.get('h1').should('contain.text', '對話測試範例');

    // 檢查輸入框和按鈕
    cy.get('input').should('exist').and('have.attr', 'placeholder', '輸入對話內容...');
    cy.get('button').should('contain.text', '發送').and('be.disabled');

    // 檢查畫布
    cy.get('canvas')
      .should('exist')
      .and('have.attr', 'width', '600')
      .and('have.attr', 'height', '400');

    // 截取初始狀態的截圖
    cy.screenshot('initial-state', { capture: 'viewport' });
  });

  it('應該正確處理輸入和對話狀態', () => {
    const testMessage = '這是一個測試訊息！';

    // 輸入文字前按鈕應該被禁用
    cy.get('button').should('be.disabled');

    // 輸入文字
    cy.get('input').type(testMessage);
    cy.get('button').should('be.enabled');
    cy.screenshot('typing-state', { capture: 'viewport' });

    // 點擊發送
    cy.get('button').click();

    // 等待動畫完成
    cy.wait(500);

    // 截取對話框顯示狀態
    cy.screenshot('dialog-shown', { capture: 'viewport' });

    // 檢查輸入框被清空
    cy.get('input').should('have.value', '');
    cy.get('button').should('be.disabled');

    // 驗證 Redux store 狀態
    cy.window().its('store').then((store) => {
      const state = store.getState();
      expect(state.dialog.message).to.equal(testMessage);
      expect(state.dialog.isVisible).to.be.true;
    });
  });

  it('應該能連續發送多條訊息', () => {
    const messages = ['第一條訊息', '第二條訊息', '第三條訊息'];

    messages.forEach((message, index) => {
      cy.get('input').type(message);
      cy.get('button').click();

      // 等待動畫完成
      cy.wait(500);

      // 截取每條訊息的狀態
      cy.screenshot(`message-${index + 1}`, { capture: 'viewport' });

      // 驗證每條訊息的狀態
      cy.window().its('store').then((store) => {
        const state = store.getState();
        expect(state.dialog.message).to.equal(message);
        expect(state.dialog.isVisible).to.be.true;
      });
    });
  });
});
