import Background from "./background";
import Navbar from "@/components/Navbar";
import CharacterList from "@/components/CharacterList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <div className="w-full min-h-screen relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:px-24 xl:py-32">
        <CharacterList />
        <Background />
      </div>
    </main>
  );
}
