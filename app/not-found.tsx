"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const NotFound = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
        <Button className="mt-4" onClick={() => router.push("/home")}>
          Go back to home
        </Button>
      </div>
    </>
  );
};

export default NotFound;
