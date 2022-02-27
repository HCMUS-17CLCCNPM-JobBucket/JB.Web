import { useUserInfo } from "app/utils/hooks";
import router from "next/router";
import React from "react";

export default function InfoOrg(props) {
  const user = useUserInfo();

  return (
    <div className="p-4 w-full rounded-lg shadow-lg">
      <div className="flex justify-between">
        <div className="flex flex-col sm:flex-row gap-8 w-full">
          <img
            src={props.avatarUrl}
            alt={props.name}
            className="h-40 w-full sm:w-40 rounded-md object-cover"
          />
          <div>
            <p className="text-3xl font-semibold">{props.name}</p>

            <div className="mt-4">
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>{props.addresses || "Updating"}</p>
              </div>
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <p>{props.phoneNumber}</p>
              </div>
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p>{props.email}</p>
              </div>
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="m12 17 1-2V9.858c1.721-.447 3-2 3-3.858 0-2.206-1.794-4-4-4S8 3.794 8 6c0 1.858 1.279 3.411 3 3.858V15l1 2z"></path>
                  <path d="m16.267 10.563-.533 1.928C18.325 13.207 20 14.584 20 16c0 1.892-3.285 4-8 4s-8-2.108-8-4c0-1.416 1.675-2.793 4.267-3.51l-.533-1.928C4.197 11.54 2 13.623 2 16c0 3.364 4.393 6 10 6s10-2.636 10-6c0-2.377-2.197-4.46-5.733-5.437z"></path>
                </svg>
                <p>{props.country}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          {user.user.roleId === 3 ? (
            <button
              className="btn btn-primary h-12 w-40"
              onClick={() => router.push("/manager/edit")}
            >
              Update
            </button>
          ) : (
            <button
              className="btn btn-primary h-12 w-40"
              onClick={props.handleScroll}
            >
              Write Review
            </button>
          )}
        </div>
      </div>
      <div className="block md:hidden">
        {user.user.roleId === 3 ? (
          <button
            className="btn btn-primary h-12 w-full mt-4"
            onClick={() => router.push("/manager/edit")}
          >
            Update
          </button>
        ) : (
          <button
            className="btn btn-primary h-12 w-full mt-4"
            onClick={props.handleScroll}
          >
            Write Review
          </button>
        )}
      </div>
    </div>
  );
}
