import WeatherApp from "@/components/WeatherApp";

export default function Home() {
  return (
    <main className="bg-[#02012C] text-white">
      <div className="container min-h-screen mx-auto flex flex-col items-center justify-start py-12">
        <WeatherApp />
      </div>
    </main>
  );
}
