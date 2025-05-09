// landing page

"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserPreferences, Language } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Carousel from "@/components/ui/carousel";
import { carouselImages, languages, countries } from "@/data/landing-page-data";

export default function LandingPage() {
  const [userPreferencesFromLocalStorage, setUserPreferencesToLocalStorage] = useLocalStorage<UserPreferences>( // useLocalStorage return user's preferences from localstorage (language and location) and a setter method
    "userPreferences", // key to store the user's preferences
    {
      // initial value
      language: "English",
      location: "",
    }
  );
  const router = useRouter();
  const [mounted, setMounted] = useState(false); // mounted state ensures component only runs certain logic after it has mounted to avoid hydration mismatches
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("English");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showWarningLanguage, setShowWarningLanguage] = useState(false);
  const [showWarningCountry, setShowWarningCountry] = useState(false);
  const [recordSelection, setRecordSelection] = useState(false);

  useEffect(() => {
    setMounted(true);
    // if user has set location, redirect to home (language is set to English by default already)
    if (mounted && userPreferencesFromLocalStorage.location) {
      router.push("/home");
    }
  }, [router, userPreferencesFromLocalStorage, mounted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLanguage) {
      setShowWarningLanguage(true);
      return;
    }
    if (!selectedCountry) {
      setShowWarningCountry(true);
      return;
    }
    setShowWarningLanguage(false);
    setShowWarningCountry(false);
    if (recordSelection) {
      setUserPreferencesToLocalStorage({
        language: selectedLanguage,
        location: selectedCountry,
      });
    }
    router.push("/home");
  };

  return (
    <div className="min-h-screen flex flex-row bg-slate-50">
      <div className="flex-[2] relative">
        <Carousel images={carouselImages} className="max-h-screen w-full" />
      </div>
      <div className="bg-white h-screen flex-1 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <Image src="/svg/logo.svg" alt="Logo" width={0} height={0} className="h-20 mx-auto mb-6 w-fit" />
          <p className="text-gray-600">PLEASE SELECT A REGION AND LANGUAGE</p>
        </div>

        {/* form to select language and country */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          {/* country */}
          <div className="space-y-2">
            <label htmlFor="country-select" className="block text-sm font-medium text-gray-700">
              Country <span className={`${showWarningCountry ? "inline" : "hidden"} text-red-500`}>(*)</span>
            </label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger id="country-select" className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* language */}
          <div className="space-y-2">
            <label htmlFor="language-select" className="block text-sm font-medium text-gray-700">
              Language <span className={`${showWarningLanguage ? "inline" : "hidden"} text-red-500`}>(*)</span>
            </label>
            <Select value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as Language)}>
              <SelectTrigger id="language-select" className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <input type="checkbox" id="record-selection" className="mr-2" onChange={() => setRecordSelection(!recordSelection)} />
            <label htmlFor="record-selection" className="text-sm text-gray-700">
              Record Selection
            </label>
          </div>

          <Button type="submit" className="w-full">
            Go
          </Button>
        </form>
      </div>
    </div>
  );
}
