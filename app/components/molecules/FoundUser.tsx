import { getAvatar } from "app/utils/getAvatar";
import router from "next/router";
import React from "react";
import { useSelector } from "react-redux";

export default function FoundUser(props) {
  const handleChatClick = async () => {
    // const chatRes = await chatAPI.createConversationOfEmployer(
    //   user.token,
    //   props.jobId,
    //   props.id
    // );
    // if (chatRes.status === 200) router.push("/chat/" + chatRes.data.data.id);
  };
  return (
    <div className="col-span-1 bg-gray-50 border border-gray hover:shadow-lg ease-in-trans rounded-3xl p-4 m-4">
      <div className="flex-none sm:flex">
        <img
          src={getAvatar(props.avatarUrl)}
          alt="aji"
          className="w-32 h-32 object-cover rounded-2xl border border-gray-600"
        />
        <div className="flex-auto sm:ml-5 justify-evenly">
          <div className="flex items-center justify-between sm:mt-2">
            <div className="flex items-center">
              <div className="flex flex-col">
                <div
                  onClick={() => router.push("/recruit/" + props.id)}
                  className="cursor-pointer hover:text-blue-500 ease-in-trans w-full flex-none text-lg text-gray-800 font-bold leading-none"
                >
                  {props.name}
                </div>
                {props.address !== null && (
                  <div className="flex-auto text-gray-500 my-1">
                    {/* <span className="mr-3">
                    {props.positions[0] ? props.positions[0].name : "Updating"}
                  </span> */}
                    <span className="mr-3 border-r-2 border-gray-200 max-h-0" />

                    <span>{props.address + "," + props.city}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex pt-2 text-sm text-gray-500">
            <div className="flex-1 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                  clipRule="evenodd"
                />
              </svg>
              <p>{props.email}</p>
            </div>
            {/* <div className="flex-1 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <p>{props.numberPhone || "N/A"}</p>
            </div> */}
          </div>
          {/* {props.skills.map((item, index) => (
            <Badge
              key={index}
              className="rainbow-m-around_medium"
              label={item.name}
              variant="brand"
              title="the badge title"
            />
          ))} */}
        </div>
      </div>
      {router.pathname.includes("employee") && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => router.push("/employee/" + props.id)}
            className="h-10 w-full px-10 text-white transition-colors duration-150 bg-gray-500 rounded-lg focus:outline-none hover:bg-gray-600"
          >
            Profile
          </button>
          <button
            onClick={handleChatClick}
            className="h-10 w-full px-10 text-white transition-colors duration-150 bg-blue-500 rounded-lg focus:outline-none hover:bg-blue-600"
          >
            Message
          </button>
        </div>
      )}
    </div>
  );
}
