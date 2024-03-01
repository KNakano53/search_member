import {
  insertEmptyError,
  insertUser,
  insertUserError,
  serverError,
  statusError,
} from "./intercept/insert.intercept";

// describe blockでテストスイートを定義
describe("InsertUser component", () => {
  // beforeEach blockでテスト前の準備処理を書く
  beforeEach(() => {
    cy.visit("/insertUser"); // テスト対象の URL にアクセス
  });

  // it blockで個々のテストケースを記述
  it("登録したい値を入力し、登録ボタンを押すと、登録完了メッセージが表示されること", () => {
    insertUser();
    // 入力フォームに値を入力
    cy.get("#inputUserName").type("Test User");
    cy.get("#inputUserAddress").type("東京都港区");
    cy.get("#inputUserTel").type("09012345678");

    // 登録ボタンをクリック
    cy.get(".btn-submit").click();
    cy.wait("@insertUser").then((intercept) => {
      const requestBody = intercept.request.body;
      expect(requestBody.name).to.equal("Test User");
      expect(requestBody.address).to.equal("東京都港区");
      expect(requestBody.tel).to.equal("09012345678");
    });

    // 成功メッセージが表示されることを確認
    cy.get(".message").should(
      "contain",
      "登録が完了しました",
      "新規加入者番号:TS0001"
    );
  });

  it("リセットボタンをクリックすると、入力フォームが空になること", () => {
    // 入力フォームに値を入力
    cy.get("#inputUserName").type("Test User");
    cy.get("#inputUserAddress").type("東京都港区");
    cy.get("#inputUserTel").type("09012345678");

    // リセットボタンをクリック
    cy.get(".btn-reset").click();

    // 入力フォームが空になっていることを確認
    cy.get("#inputUserName").should("have.value", "");
    cy.get("#inputUserAddress").should("have.value", "");
    cy.get("#inputUserTel").should("have.value", "");
  });

  it("入力不備がある場合、エラーメッセージがすべて表示されること", () => {
    insertEmptyError();
    // 登録ボタンをクリック
    cy.get(".btn-submit").click();

    cy.wait("@insertEmptyError").then((intercept) => {
      const requestBody = intercept.request.body;
      expect(requestBody.name).to.equal("");
      expect(requestBody.address).to.equal("");
      expect(requestBody.tel).to.equal("");
    });

    cy.contains(".message", "氏名は必須です")
      .contains(".message", "住所は必須です")
      .contains(".message", "電話番号は必須です");
  });

  it("登録に失敗した場合、エラーメッセージが表示されること", () => {
    insertUserError();
    // 入力フォームに値を入力
    cy.get("#inputUserName").type("Test User");
    cy.get("#inputUserAddress").type("東京都港区");
    cy.get("#inputUserTel").type("09012345678");

    // 登録ボタンをクリック
    cy.get(".btn-submit").click();
    cy.wait("@insertUserError");

    // エラーメッセージが表示されることを確認
    cy.get(".message").should("contain", "登録処理に失敗しました");
  });

  it("通信エラー時に適切なメッセージが表示されること", () => {
    statusError();
    cy.get("#inputUserName").type("Test User");
    cy.get("#inputUserAddress").type("東京都港区");
    cy.get("#inputUserTel").type("09012345678");

    // 登録ボタンをクリック
    cy.get(".btn-submit").click();
    cy.wait("@statusError");

    // エラーメッセージが表示されることを確認
    cy.get(".message").should("contain", "通信に失敗しました");
  });

  it("サーバーエラー時に適切なメッセージが表示されること", () => {
    serverError();
    cy.get("#inputUserName").type("Test User");
    cy.get("#inputUserAddress").type("東京都港区");
    cy.get("#inputUserTel").type("09012345678");

    // 登録ボタンをクリック
    cy.get(".btn-submit").click();
    cy.wait("@serverError");

    // エラーメッセージが表示されることを確認
    cy.get(".message").should("contain", "通信に失敗しました");
  });

  it("検索画面へ遷移できること", () => {
    cy.get(".btn-home").click();
    cy.location("pathname").should("eq", "/");
  });
});
