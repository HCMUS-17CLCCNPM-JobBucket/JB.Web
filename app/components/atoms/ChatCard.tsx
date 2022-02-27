import Router from "next/router";

export function ChatCard(props) {
  return (
    <div
      onClick={() => Router.push("/chat/" + props.id)}
      className={
        Router.pathname.includes(props.id)
          ? "bg-gray-200 cursor-pointer"
          : "flex flex-col gap-1 items-start rounded-md p-1 hover:bg-gray-200 cursor-pointer" +
            " w-full"
      }
    >
      <div className="flex gap-2 items-center">
        <img
          src={props.organization.avatarUrl}
          alt={props.organization.name}
          className="h-6 w-6 rounded-full"
        />
        <p className="text-xs font-semibold text-red-600">
          {props.organization.name}
        </p>
      </div>
      <div className="flex gap-2 items-center ">
        <img src={props.avatarUrl} alt="" className="h-10 w-10 rounded-full" />
        <div className="flex flex-col w-full">
          <div className="font-bold truncate">{props.name}</div>
          <div className="text-sm text-gray-400 w-[150px] truncate">
            {props.lastMessage}
          </div>
        </div>
      </div>
    </div>
  );
}
