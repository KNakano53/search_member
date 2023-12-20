import { render } from "@testing-library/react";
import { it } from "vitest";
import { ShowMessage } from "../../ShowMessage/ShowMessage";
import React from "react";

describe("表示確認", () => {
  it("メッセージが存在しない場合", () => {
    const { container } = render(<ShowMessage message={[""]} />);
    expect(container.firstChild).toBeNull();
  });

  it("メッセージがSUCCESSの場合", () => {
    const { container } = render(<ShowMessage message={["SUCCESS"]} />);
    expect(container.firstChild).toBeNull();
  });

  it("メッセージが存在する場合", () => {
    const messages = ["Error 1", "Error 2"];
    const { getByText } = render(<ShowMessage message={messages} />);
    messages.forEach((message) => {
      expect(getByText(message)).toBeInTheDocument();
    });
  });
});
