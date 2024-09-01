import Logo from "@/components/shared/Logo";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

function Hero() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return <Spinner />;

  return (
    // <section className="py-8 flex items-center justify-center rounded-xl shadow-sm shadow-gray-900  border-white hero text-center">
    <section className="flex items-center justify-center text-center h-screen max-lg:px-8">
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl animate-slidein [--slidein-delay:400ms] opacity-0">
          Find your dream job with {""}
          <span className="animate-slidein [--slidein-delay:500ms] opacity-0">
            <Logo />
          </span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base animate-slidein [--slidein-delay:600ms] opacity-0  text-slate-500 dark:text-slate-400">
          Explore endless opportunities and take the next step towards your
          professional growth. Your future starts here!
        </p>
        <p className="text-xs sm:text-sm md:text-base animate-slidein [--slidein-delay:700ms] opacity-0  text-slate-500 dark:text-slate-400 ">
          Innovative AI platform that transforms the way you find and hire top
          talent.
        </p>
        {!isSignedIn ? (
          <div className="flex flex-col gap-y-4 items-center my-20">
            <Button
              asChild
              className="w-fit py-7 px-5 animate-slidein [--slidein-delay:800ms] opacity-0"
            >
              <Link to={"/sign-up"}>
                Explore your oppotunity
                <span className="ml-2 text-sm">&rarr;</span>
              </Link>
            </Button>

            <Link
              to={"/sign-in"}
              className="hover:underline hover:text-themecolor-lightblue animate-slidein [--slidein-delay:900ms] opacity-0"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <div className="flex flex-col my-24 gap-6 items-center text-slate-500 dark:text-slate-200 animate-slidein [--slidein-delay:900ms] opacity-0">
            <span className="text-lg sm:text-xl md:text-2xl">
              Hello! {user.firstName}, {""}
            </span>
            <ScrollLink
              to="jobs"
              smooth={true}
              duration={500}
              offset={-112}
              className="text-lg sm:text-2xl md:text-3xl hover:underline text-themecolor-lightblue dark:text-themecolor-lightblue animate-slidein [--slidein-delay:900ms] opacity-0 text-slate-500 dark:text-slate-400 cursor-pointer"
            >
              Find out latest jobs{" "}
              <span className="ml-2 text-lg sm:text-xl md:text-2xl">
                &darr;
              </span>
            </ScrollLink>
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
