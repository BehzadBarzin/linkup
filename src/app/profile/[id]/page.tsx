import Feed from "@/components/Feed";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default function Profile() {
  return (
    <main className="flex gap-6 pt-6">
      {/* Left */}
      <div className="hidden xl:block xl:w-[20%]">
        <LeftSidebar />
      </div>
      {/* Center */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
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
