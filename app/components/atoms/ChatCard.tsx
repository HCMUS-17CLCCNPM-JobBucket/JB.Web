import Router from "next/router";

export function ChatCard(props) {
  return (
    <div
      onClick={() => Router.push("/chat/" + props.id)}
      className={
        Router.pathname.includes(props.id)
          ? "bg-gray-200 cursor-pointer"
          : "flex gap-2 items-center rounded-md p-1 hover:bg-gray-200 cursor-pointer"
      }
    >
      <img src={props.avatarUrl} alt="" className="h-10 w-10 rounded-full" />
      <div className="flex flex-col">
        <div className="font-bold truncate">{props.name}</div>
        <div className="text-sm text-gray-400">{props.lastMessage} </div>
      </div>
    </div>
  );
}
