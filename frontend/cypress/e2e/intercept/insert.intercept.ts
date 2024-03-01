export const insertUser = () => {
  cy.intercept("POST", "http://localhost:3001/insert-member", {
    status: 200,
    message: ["登録が完了しました", "新規加入者番号:TS0001"],
  }).as("insertUser");
};

export const insertUserError = () => {
  cy.intercept("POST", "http://localhost:3001/insert-member", {
    status: 400,
    message: ["登録処理に失敗しました"],
  }).as("insertUserError");
};

export const insertEmptyError = () => {
  cy.intercept("POST", "http://localhost:3001/insert-member", {
    status: 400,
    message: ["氏名は必須です", "住所は必須です", "電話番号は必須です"],
  }).as("insertEmptyError");
};

export const statusError = () => {
  cy.intercept("POST", "http://localhost:3001/insert-member", {
    statusCode: 500,
  }).as("statusError");
};

export const serverError = () => {
  cy.intercept("POST", "http://localhost:3001/insert-member", {
    forceNetworkError: true,
  }).as("serverError");
};
