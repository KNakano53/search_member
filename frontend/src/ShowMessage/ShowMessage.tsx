import _ from "lodash";
import React from "react";

type Props = {
  message: string[];
};
export function ShowMessage(props: Props) {
  if ("SUCCESS" === props.message[0] || _.isEmpty(props.message[0])) {
    return null;
  }
  return (
    <div className="message">
      {props.message.map((eachMessage, index) => {
        return (
          <h3 className="text-center text-danger" key={index}>
            {eachMessage}
          </h3>
        );
      })}
    </div>
  );
}
