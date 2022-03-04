import { Popover, Transition } from "@headlessui/react";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/solid";
import notiAPI from "app/api/modules/notiAPI";
import { Fragment, useEffect, useState } from "react";
import Moment from "react-moment";
import { useQuery, gql, useSubscription } from "@apollo/client";
import { useUserInfo } from "app/utils/hooks";
import { toast } from "react-toastify";

export default function Notify() {
  const [noti, setNoti] = useState([]);
  const user = useUserInfo();
  useEffect(() => {
    const fetchNoti = async () => {
      const res = await notiAPI.getAll();
      setNoti(res.data.data.notifications);
    };
    fetchNoti();
  }, []);

  const { data, loading } = useSubscription(
    gql`
      subscription getnote($token: String!) {
        notification(token: $token) {
          id
          message
        }
      }
    `,
    {
      variables: {
        token: user.token,
      },
    }
  );

  useEffect(() => {
    if (data) {
      setNoti([data.notification, ...noti]);

      toast(data.notification.message);
    }
  }, [data]);

  return (
    <div className=" ">
      <Popover className="h-6 w-6 relative">
        {({ open }) => (
          <>
            <Popover.Button>
              <BellIcon className="h-6 w-6 rounded-full cursor-pointer" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 h-[400px] w-[500px] bg-white   px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                <div className="p-2 w-full h-full overflow-auto rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  {noti.length > 0 ? (
                    noti.map((item, index) => (
                      <div key={item.id}>
                        <div className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer flex items-center justify-between">
                          <div className="flex gap-4 items-center">
                            <img
                              src="/common/check.png"
                              alt=""
                              className="h-6 w-6"
                            />
                            <p className="text-lg font-semibold">
                              {item.message}
                            </p>
                          </div>

                          <Moment
                            fromNow
                            date={item.createdDate}
                            className="text-sm text-gray-400"
                          />
                        </div>
                        <hr className="mx-3" />
                      </div>
                    ))
                  ) : (
                    <img
                      src="https://s.tmimgcdn.com/scr/800x500/90900/notification-illustration_90986-1-original.jpg"
                      alt=""
                      className="w-auto h-auto object-cover"
                    />
                  )}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
