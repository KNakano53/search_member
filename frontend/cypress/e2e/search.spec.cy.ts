import {
  findOnes,
  findUser,
  limit100,
  limit100Search,
  limit20,
  limit50,
  limit50Search,
  notFound,
  page1,
  page2,
} from "./intercept/search.intercept";

describe("検索機能", () => {
  beforeEach(() => {
    // テスト前に必要な状態を初期化する
    cy.visit("/");
  });

  it("検索フォームに正しい値を入力すると、検索結果が表示されること", () => {
    findUser();
    // 検索フォームに入力
    cy.get("#inputUserID").type("TS0001");
    cy.get("#inputUserName").type("山田 太郎");
    cy.get("#inputUserAddress").type("東京都港区");
    cy.get("#inputUserTel").type("8012345678");

    // 検索ボタンをクリック
    cy.get(".btn-search").click();
    cy.wait("@findUser");

    // 検索結果が表示されていることを確認
    cy.get(".resultTable").should("be.visible");
    cy.get(".table tbody tr").should("have.length", 1);
    cy.get(".table tbody tr td").first().should("contain", "TS0001");
    cy.get(".table tbody tr td").eq(1).should("contain", "山田 太郎");
    cy.get(".table tbody tr td").eq(2).should("contain", "東京都港区");
    cy.get(".table tbody tr td").eq(3).should("contain", "8012345678");
  });

  it("検索後、リセットボタンを押すと、入力と表示がリセットされること", () => {
    findUser();
    // 検索フォームに入力
    cy.get("#inputUserID").type("TS0001");
    cy.get("#inputUserName").type("山田 太郎");
    cy.get("#inputUserAddress").type("東京都港区");
    cy.get("#inputUserTel").type("8012345678");

    // 検索ボタンをクリック
    cy.get(".btn-search").click();
    cy.wait("@findUser");

    // 検索結果が表示されていることを確認
    cy.get(".resultTable").should("be.visible");
    cy.get(".table tbody tr").should("have.length", 1);
    cy.get(".table tbody tr td").first().should("contain", "TS0001");
    cy.get(".table tbody tr td").eq(1).should("contain", "山田 太郎");
    cy.get(".table tbody tr td").eq(2).should("contain", "東京都港区");
    cy.get(".table tbody tr td").eq(3).should("contain", "8012345678");

    // リセットボタンをクリック
    cy.get(".btn-reset").click();

    // 入力と表示がリセットされていることを確認
    cy.get("#inputUserID").should("have.value", "");
    cy.get("#inputUserName").should("have.value", "");
    cy.get("#inputUserAddress").should("have.value", "");
    cy.get("#inputUserTel").should("have.value", "");
    cy.get(".resultTable").should("not.exist");
  });

  it("検索フォームに登録されていない値を入力すると、エラーメッセージが表示されること", () => {
    notFound();
    cy.get("#inputUserID").type("TS");
    // 検索ボタンをクリック
    cy.get(".btn-search").click();
    cy.wait("@notFound");

    // エラーメッセージが表示されていることを確認
    cy.get(".message").should("be.visible");
    cy.get(".message").should("contain", "検索結果がありません");
    cy.get(".resultTable").should("not.exist");
  });

  it("ページ番号ボタンを使ってページを切り替えることができること", () => {
    findOnes();
    page2();
    // 検索フォームに入力
    cy.get("#inputUserName").type("山田");

    // 検索ボタンをクリック
    cy.get(".btn-search").click();
    cy.wait("@findOnes");

    cy.get(".resultTable").should("be.visible");
    cy.get(".table tbody tr").should("have.length", 1);
    cy.get(".table tbody tr td").first().should("contain", "TS0001");
    cy.get(".table tbody tr td").eq(1).should("contain", "山田 太郎");
    cy.get(".table tbody tr td").eq(2).should("contain", "東京都港区");
    cy.get(".table tbody tr td").eq(3).should("contain", "8012345678");

    // 2ページ目へ移動
    cy.get('[aria-label="Page 2"]').click();
    cy.wait("@page2");

    // 2ページ目のデータが表示されていることを確認
    cy.get(".table tbody tr").should("have.length", 1);
    cy.get(".table tbody tr td").first().should("contain", "TS0002");
    cy.get(".table tbody tr td").eq(1).should("contain", "山田 二郎");
    cy.get(".table tbody tr td").eq(2).should("contain", "東京都港区");
    cy.get(".table tbody tr td").eq(3).should("contain", "9012345678");
  });

  it("次ページボタンを使ってページを切り替えることができること", () => {
    findOnes();
    page2();
    // 検索フォームに入力
    cy.get("#inputUserName").type("山田");

    // 検索ボタンをクリック
    cy.get(".btn-search").click();
    cy.wait("@findOnes");

    cy.get(".resultTable").should("be.visible");
    cy.get(".table tbody tr").should("have.length", 1);
    cy.get(".table tbody tr td").first().should("contain", "TS0001");
    cy.get(".table tbody tr td").eq(1).should("contain", "山田 太郎");
    cy.get(".table tbody tr td").eq(2).should("contain", "東京都港区");
    cy.get(".table tbody tr td").eq(3).should("contain", "8012345678");

    // 2ページ目へ移動
    cy.get('[aria-label="Next page"]').click();
    cy.wait("@page2");

    // 2ページ目のデータが表示されていることを確認
    cy.get(".table tbody tr").should("have.length", 1);
    cy.get(".table tbody tr td").first().should("contain", "TS0002");
    cy.get(".table tbody tr td").eq(1).should("contain", "山田 二郎");
    cy.get(".table tbody tr td").eq(2).should("contain", "東京都港区");
    cy.get(".table tbody tr td").eq(3).should("contain", "9012345678");
  });

  it("前ページボタンを使ってページを切り替えることができること", () => {
    findOnes();
    page1();
    page2();
    // 検索フォームに入力
    cy.get("#inputUserName").type("山田");

    // 検索ボタンをクリック
    cy.get(".btn-search").click();
    cy.wait("@findOnes");

    cy.get(".resultTable").should("be.visible");
    cy.get(".table tbody tr").should("have.length", 1);
    cy.get(".table tbody tr td").first().should("contain", "TS0001");
    cy.get(".table tbody tr td").eq(1).should("contain", "山田 太郎");
    cy.get(".table tbody tr td").eq(2).should("contain", "東京都港区");
    cy.get(".table tbody tr td").eq(3).should("contain", "8012345678");

    // 2ページ目へ移動
    cy.get('[aria-label="Next page"]').click();
    cy.wait("@page2");

    // 2ページ目のデータが表示されていることを確認
    cy.get(".table tbody tr").should("have.length", 1);
    cy.get(".table tbody tr td").first().should("contain", "TS0002");
    cy.get(".table tbody tr td").eq(1).should("contain", "山田 二郎");
    cy.get(".table tbody tr td").eq(2).should("contain", "東京都港区");
    cy.get(".table tbody tr td").eq(3).should("contain", "9012345678");

    // 検索ボタンをクリック
    cy.get('[aria-label="Previous page"]').click();
    cy.wait("@page1");

    cy.get(".resultTable").should("be.visible");
    cy.get(".table tbody tr").should("have.length", 1);
    cy.get(".table tbody tr td").first().should("contain", "TS0001");
    cy.get(".table tbody tr td").eq(1).should("contain", "山田 太郎");
    cy.get(".table tbody tr td").eq(2).should("contain", "東京都港区");
    cy.get(".table tbody tr td").eq(3).should("contain", "8012345678");
  });

  it("表示件数を変更すると、APIが呼び出され、表示件数が変更されること(50件)", () => {
    findOnes();
    limit50();
    // 検索ボタンをクリック
    cy.get(".btn-search").click();
    cy.wait("@findOnes");

    // 検索結果が表示されていることを確認
    cy.get(".resultTable").should("be.visible");

    // 表示件数変更ドロップダウン
    cy.get("#pageLimit").select("50");
    // APIリクエストが送信されていることを確認
    cy.wait("@limit50");

    // 検索結果が表示されていることを確認
    cy.get(".resultTable").should("be.visible");
    cy.get(".table tbody tr").should("have.length", 50);
  });

  it("表示件数を変更すると、APIが呼び出され、表示件数が変更されること(100件)", () => {
    findOnes();
    limit100();
    // 検索ボタンをクリック
    cy.get(".btn-search").click();
    cy.wait("@findOnes");

    // 検索結果が表示されていることを確認
    cy.get(".resultTable").should("be.visible");

    // 表示件数変更ドロップダウン
    cy.get("#pageLimit").select("100");
    // APIリクエストが送信されていることを確認
    cy.wait("@limit100");

    // 検索結果が表示されていることを確認
    cy.get(".resultTable").should("be.visible");
    cy.get(".table tbody tr").should("have.length", 100);
  });

  it("表示件数を変更すると、APIが呼び出され、表示件数が変更されること(20件)", () => {
    findOnes();
    limit20();
    limit50();
    // 検索ボタンをクリック
    cy.get(".btn-search").click();
    cy.wait("@findOnes");

    // 検索結果が表示されていることを確認
    cy.get(".resultTable").should("be.visible");

    // 表示件数変更ドロップダウン
    cy.get("#pageLimit").select("50");
    // APIリクエストが送信されていることを確認
    cy.wait("@limit50");

    // 検索結果が表示されていることを確認
    cy.get(".resultTable").should("be.visible");
    cy.get(".table tbody tr").should("have.length", 50);

    // 表示件数変更ドロップダウン
    cy.get("#pageLimit").select("20");
    // APIリクエストが送信されていることを確認
    cy.wait("@limit20");

    // 検索結果が表示されていることを確認
    cy.get(".resultTable").should("be.visible");
    cy.get(".table tbody tr").should("have.length", 20);
  });

  it("表示件数を50件にした状態で検索をすると取得件数に影響すること", () => {
    findOnes();
    limit50();
    limit50Search();
    // 検索ボタンをクリック
    cy.get(".btn-search").click();
    cy.wait("@findOnes");
    // 表示件数変更ドロップダウン
    cy.get("#pageLimit").select("50");
    // APIリクエストが送信されていることを確認
    cy.wait("@limit50");

    cy.get("#inputUserID").type("TS0001");
    // 検索ボタンをクリック
    cy.get(".btn-search").click();
    cy.wait("@limit50Search");

    // 検索結果が表示されていることを確認
    cy.get(".resultTable").should("be.visible");
    cy.get("#pageLimit").should("have.value", "50");
  });

  it("表示件数を100件にした状態で検索をすると取得件数に影響すること", () => {
    findOnes();
    limit100();
    limit100Search();
    // 検索ボタンをクリック
    cy.get(".btn-search").click();
    cy.wait("@findOnes");
    // 表示件数変更ドロップダウン
    cy.get("#pageLimit").select("100");
    // APIリクエストが送信されていることを確認
    cy.wait("@limit100");

    cy.get("#inputUserID").type("TS0001");
    // 検索ボタンをクリック
    cy.get(".btn-search").click();
    cy.wait("@limit100Search");

    // 検索結果が表示されていることを確認
    cy.get(".resultTable").should("be.visible");
    cy.get("#pageLimit").should("have.value", "100");
  });
});
