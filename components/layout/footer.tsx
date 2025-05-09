import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 pt-12 pb-4">
        <div className="flex flex-col justify-center items-center text-gray-500">
          <div className="mb-6">
            <Link href="#" className="text-sm">
              SIGN UP FOR NEWSLETTER
            </Link>
          </div>
          <div className="flex flex-row justify-between w-[50%]">
            <Link href="#" className="text-sm mb-4">
              TIKTOK
            </Link>
            <Link href="#" className="text-sm mb-4">
              INSTAGRAM
            </Link>
            <Link href="#" className="text-sm mb-4">
              FACEBOOK
            </Link>
            <Link href="#" className="text-sm mb-4">
              X
            </Link>
            <Link href="#" className="text-sm mb-4">
              PINTEREST
            </Link>
            <Link href="#" className="text-sm mb-4">
              YOUTUBE
            </Link>
            <Link href="#" className="text-sm mb-4">
              SPOTIFY
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t text-xs text-gray-500">
          <div className="flex flex-row justify-center items-center gap-10">
            <Link href="#" className="text-sm mb-4">
              DO NOT SELL MY PERSONAL INFORMATION
            </Link>
            <Link href="#" className="text-sm mb-4">
              COOKIE AND ADS PREFERENCES
            </Link>
            <Link href="#" className="text-sm mb-4">
              PRIVACY AND COOKIES POLICY
            </Link>
            <Link href="#" className="text-sm mb-4">
              TERMS OF USE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
