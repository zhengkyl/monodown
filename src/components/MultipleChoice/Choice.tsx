export function Choice(props) {
  return (
    <div class="flex flex-col gap-3 h-full justify-end">
      <img src={props.image} class="max-h-24 object-cover" />
      <p>{props.text}</p>
    </div>
  );
}
