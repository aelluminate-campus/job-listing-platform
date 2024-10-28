"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { useEffect } from "react";
import { CheckCircle, Building2, Star } from "lucide-react";
import "swiper/swiper-bundle.css";
import Swiper from "swiper/bundle";

export function LandingPage() {
  useEffect(() => {
    // Initialize Swiper after component mounts
    var swiper = new Swiper(".progress-slide-carousel", {
      loop: true,
      autoplay: {
        delay: 1200,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".progress-slide-carousel .swiper-pagination",
        type: "progressbar",
      },
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-center">
      <main className="flex-1 w-full">
        {/* Swiper Carousel Section */}
        <section className="relative w-full min-h-[60vh] flex justify-center items-center bg-primary">
          <div className="w-full relative">
            {/* Swiper Carousel */}
            <div className="swiper progress-slide-carousel swiper-container relative z-10">
              <div className="swiper-wrapper">
                <div className="swiper-slide relative">
                  <img
                    src="https://constructionmanagement.co.uk/wp-content/uploads/2022/01/dreamstime_m_173237693.jpg"
                    alt="Construction Image 1"
                    className="w-full object-cover max-h-[60vh]"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                </div>
                <div className="swiper-slide relative">
                  <img
                    src="https://metalexponents.com/wp-content/uploads/2023/07/construction-worker-is-tying-the-structural-steel-2023-02-09-00-32-24-utc.jpg"
                    alt="Construction Image 2"
                    className="w-full object-cover max-h-[60vh]"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                </div>
                <div className="swiper-slide relative">
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/56aec2aa76d99c5d803d91b5/405c7abc-ee97-4352-a1cf-55455c46a949/silhouette-group-worker-civil-engineer-safety-uniform-install-reinforced-steel.jpg"
                    alt="Construction Image 3"
                    className="w-full object-cover max-h-[60vh]"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                </div>
              </div>
              <div className="swiper-pagination !bottom-2 !top-auto !w-80 right-0 mx-auto bg-gray-100"></div>
            </div>

            {/* Overlay Text and Buttons */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center space-y-4 px-4 z-20 drop-shadow-lg">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                Connect. Build. Succeed.
              </h1>
              <p className="text-gray-200 max-w-[700px] md:text-xl">
                Konstract: The premier platform connecting skilled construction
                workers with businesses for seamless project collaboration.
              </p>
              <div className="space-x-4">
                <Button className="bg-white text-primary hover:bg-gray-200">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-primary"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 pb-5">
              Why Konstrakt?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-items-center">
              <Card className="w-full max-w-[420px]">
                <CardContent className="flex flex-col items-center p-6">
                  <CheckCircle className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">
                    Verified Professionals
                  </h3>
                  <p className="text-center text-gray-600">
                    Connect with skilled, vetted construction workers for your
                    projects.
                  </p>
                </CardContent>
              </Card>
              <Card className="w-full max-w-[420px]">
                <CardContent className="flex flex-col items-center p-6">
                  <Building2 className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Diverse Projects</h3>
                  <p className="text-center text-gray-600">
                    Find a wide range of construction projects to match your
                    expertise.
                  </p>
                </CardContent>
              </Card>
              <Card className="w-full max-w-[420px]">
                <CardContent className="flex flex-col items-center p-6">
                  <Star className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
                  <p className="text-center text-gray-600">
                    Enjoy hassle-free, secure payments for completed work.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                  For Construction Workers
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 mr-2 text-primary" />
                    <span>Showcase your skills and experience</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 mr-2 text-primary" />
                    <span>Find flexible work opportunities</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 mr-2 text-primary" />
                    <span>Build a strong professional network</span>
                  </li>
                </ul>
                <Button className="mt-6">Sign Up as a Worker</Button>
              </div>
              <div className="relative h-[300px] bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="https://img.freepik.com/free-photo/portrait-man-working-construction_23-2151230014.jpg"
                  alt="Construction worker"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center">
              <div className="relative h-[300px] bg-gray-200 rounded-lg overflow-hidden md:order-last">
                <img
                  src="https://www.autodesk.com/blogs/construction/wp-content/uploads/2021/08/Blog-Hero.jpg"
                  alt="Construction business"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                  For Businesses
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 mr-2 text-primary" />
                    <span>
                      Access a pool of skilled construction professionals
                    </span>
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 mr-2 text-primary" />
                    <span>Post projects and receive competitive bids</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 mr-2 text-primary" />
                    <span>Manage projects efficiently with our tools</span>
                  </li>
                </ul>
                <Button className="mt-6">Post a Project</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
              <Card className="w-full max-w-[400px] text-center flex flex-col items-center">
                <CardContent className="p-6">
                  <p className="mb-4 italic">
                    "Konstrakt has revolutionized how I find work. The platform
                    is easy to use, and I've connected with great clients."
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mb-4"></div>
                    <div className="text-center">
                      <h4 className="font-bold">John Doe</h4>
                      <p className="text-sm text-gray-600">
                        Freelance Carpenter
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full max-w-[400px] text-center flex flex-col items-center">
                <CardContent className="p-6">
                  <p className="mb-4 italic">
                    "As a construction company, we've found exceptional talent
                    through Konstrakt. It's streamlined our hiring process
                    significantly."
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mb-4"></div>
                    <div className="text-center">
                      <h4 className="font-bold">Jane Smith</h4>
                      <p className="text-sm text-gray-600">
                        Project Manager, BuildRight Inc.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
              Ready to Transform Your Construction Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl mb-8">
              Join Konstrakt today and experience the future of construction
              collaboration.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup">
              <Button className="bg-white text-primary hover:bg-gray-200">
                Sign Up Now
              </Button>
              </Link>
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-primary"
              >
                Request a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 Konstrakt. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
