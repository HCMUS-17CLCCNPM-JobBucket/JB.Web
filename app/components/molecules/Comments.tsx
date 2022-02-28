import { blogAPI } from "app/api/modules/blogAPI";
import Comment from "../atoms/Comment";
import { Popover } from "@headlessui/react";
import {
  DotsVerticalIcon,
  PencilIcon,
  ThumbUpIcon as ThumbUpIconSolid,
  TrashIcon,
} from "@heroicons/react/solid";
import reviewAPI from "app/api/modules/reviewAPI";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { toast } from "react-toastify";
import RatingComponent from "../atoms/RatingComponent";
import ReviewSection from "../molecules/ReviewSection";

export default function Comments(props) {
  console.log(props);
  return (
    <div className="antialiased ">
      <div className="space-y-4">
        {props.comments?.map((item, index) => (
          <Comment
            {...item}
            key={index.id}
            blogId={props.blogId}
            callback={props.callback}
          />
        ))}
      </div>
    </div>
  );
}

// function CommentItem(props) {
//   const [isEdit, setIsEdit] = useState(false);
//   const [status, setStatus] = useState({
//     isInterested: props.isInterested,
//     interestCount: props.interestCount,
//   });

//   useEffect(() => {
//     if (
//       props.isInterested !== status.isInterested &&
//       props.interestCount !== status.interestCount
//     ) {
//       setStatus({
//         isInterested: props.isInterested,
//         interestCount: props.interestCount,
//       });
//     }
//   }, [props.isInterested, props.interestCount]);

//   const handleLike = async () => {
//     const res = await blogAPI.likeComment(props.id);
//     setStatus({
//       isInterested: res.data.data.blog.addInterestedComment.isInterested,
//       interestCount: res.data.data.blog.addInterestedComment.interestCount,
//     });
//   };

//   const handleEdit = () => setIsEdit(true);

//   const handleDelete = async () => {
//     const res = await reviewAPI.deleteReview(props.id);
//     props.callback();
//   };

//   return (
//     <div className="relative flex items-start">
//       <div className="flex-shrink-0">
//         <div className="inline-block relative">
//           <div className="relative w-16 h-16 rounded-full overflow-hidden">
//             <img
//               className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover"
//               src={props.user.avatarUrl || "/avatar/avatar.png"}
//               alt="Profile picture"
//             />
//             <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner" />
//           </div>
//           {props.isAuthor && (
//             <svg
//               className="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//             >
//               <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z" />
//             </svg>
//           )}
//         </div>
//       </div>
//       <div className="ml-6">
//         <div>
//           <p className="flex items-baseline">
//             <span className="text-gray-600 font-bold">{props.user.name}</span>
//             {/* <span className="ml-2 text-green-600 text-xs">
//                 Verified Buyer
//               </span> */}
//           </p>
//           <div className="flex items-center mt-1">
//             <RatingComponent
//               quiet={true}
//               styles=""
//               value={props.rating}
//               callback={() => {}}
//             />
//           </div>
//         </div>
//         <hr />
//         <div className="flex gap-8 items-start mt-4 text-gray-600">
//           <div>
//             <div className="flex  w-40 justify-between">
//               <span className="text-sm">Benefit</span>
//               <RatingComponent
//                 styles="sub-rating"
//                 quiet={true}
//                 value={props.ratingBenefit}
//                 callback={() => {}}
//               />
//             </div>
//             <div className="flex w-40 justify-between">
//               <span className="text-sm">Learning</span>
//               <RatingComponent
//                 styles="sub-rating"
//                 quiet={true}
//                 value={props.ratingLearning}
//                 callback={() => {}}
//               />
//             </div>
//           </div>
//           <div>
//             <div className="flex w-40 justify-between">
//               <span className="text-sm">Culture</span>
//               <RatingComponent
//                 styles="sub-rating"
//                 quiet={true}
//                 value={props.ratingCulture}
//                 callback={() => {}}
//               />
//             </div>
//             <div className="flex w-40 justify-between">
//               <span className="text-sm">Workspace</span>
//               <RatingComponent
//                 styles="sub-rating"
//                 quiet={true}
//                 value={props.ratingWorkspace}
//                 callback={() => {}}
//               />
//             </div>
//           </div>
//         </div>
//         <hr />
//         <div className="mt-3">
//           {/* <span className="font-bold">Sapien consequat eleifend!</span> */}
//           <p className="mt-1">{props.content}</p>

//           <div className="flex gap-2 items-center">
//             <button
//               className="flex items-center justify-center"
//               onClick={handleLike}
//             >
//               {status.isInterested ? (
//                 <ThumbUpIconSolid className="w-5 h-5 text-blue-600" />
//               ) : (
//                 <ThumbUpIconSolid className="w-5 h-5 text-gray-600" />
//               )}
//               <span className="ml-1">{status.interestCount}</span>
//             </button>
//             ·
//             <p className="text-sm text-gray-600">
//               <Moment date={props.createdDate} fromNow />
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
