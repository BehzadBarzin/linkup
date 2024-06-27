import AddPost from "@/components/AddPost";
import Feed from "@/components/feed/Feed";
import LeftSidebar from "@/components/left-bar/LeftSidebar";
import RightSidebar from "@/components/right-bar/RightSidebar";
import Stories from "@/components/Stories";

export default function Home() {
  return (
    <main className="flex gap-6 pt-6">
      {/* Left */}
      <div className="hidden xl:block xl:w-[20%]">
        <LeftSidebar location="home" />
      </div>
      {/* Center */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPost />
          <Feed />
        </div>
      </div>
      {/* Right */}
      <div className="hidden lg:block lg:w-[30%]">
        <RightSidebar />
      </div>
    </main>
  );
}
