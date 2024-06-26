import Image from "next/image";
import Comments from "./Comments";

const Post = () => {
  return (
    <div className="flex flex-col gap-4 ">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <Image
            src="/sample-avatar.jpg"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-full"
          />
          {/* Username */}
          <span className="font-medium">John Doe</span>
        </div>
        {/* More... */}
        <Image
          src="/more.png"
          alt=""
          width={16}
          height={16}
          className="cursor-pointer"
        />
      </div>
      {/* Description */}
      <div className="flex flex-col gap-4">
        {/* Post Image */}
        <div className="w-full min-h-96 relative">
          <Image
            src="/sample-post.jpg"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        {/* Post Text */}
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi sit
          recusandae rem provident sint. Assumenda neque explicabo recusandae
          itaque repellendus, praesentium natus soluta voluptatem laboriosam,
          ratione numquam omnis. Similique odio necessitatibus voluptatum
          repellendus nemo, animi quisquam provident et, veritatis sequi ullam
          aperiam maxime? Expedita in repudiandae harum dolor. Dolor,
          exercitationem.
        </p>
      </div>
      {/* Interaction */}
      <div className="flex items-center justify-between text-sm my-4">
        {/* Left */}
        <div className="flex gap-8">
          {/* Likes */}
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
            <Image
              src="/like.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              657 <span className="hidden md:inline">&nbsp;Likes</span>
            </span>
          </div>
          {/* Comments */}
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
            <Image
              src="/comment.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              178 <span className="hidden md:inline">&nbsp;Comments</span>
            </span>
          </div>
        </div>
        {/* Right */}
        <div className="">
          {/* Share */}
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
            <Image
              src="/share.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              48 <span className="hidden md:inline">&nbsp;Shares</span>
            </span>
          </div>
        </div>
      </div>

      {/* Comments */}
      <Comments />
    </div>
  );
};

export default Post;
