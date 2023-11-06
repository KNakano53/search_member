type Props = {
  message: string;
};
export function ShowMessage(props: Props) {
  if ("SUCCESS" === props.message || "" === props.message) {
    return null;
  }
  return (
    <div className="message">
      <h3 className="text-center text-danger">{props.message}</h3>
    </div>
  );
}
