import Login from "@/react_components/login";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div className=" text-lg text-center text-purple-600">
        Hola
        <Login></Login>
      </div>
    </main>
  );
}
