import React from 'react';

function aboutpage() {
  const steps = [
    {
      title: "Create Profile",
      description:
        "Showcase your skills and highlight the services you offer.",
      icon: "📝", 
    },
    {
      title: "Find Work",
      description:
        "Search and apply for jobs that match your skills and services on Konstrakt.",
      icon: "🔍",
    },
    {
      title: "Manage Jobs",
      description:
        "Use Konstrakt's platform to manage your projects, collaborate, and communicate with clients.",
      icon: "📋",
    },
    {
      title: "Get Paid",
      description:
        "Receive payments for the work you deliver through our platform?.",
      icon: "💰",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="max-w-2xl text-center mb-12">
        <h1 className="mt-4 text-3xl font-bold text-gray-800">
          How Konstrakt Can Help You Find Work
        </h1>
        <p className="mt-2 text-gray-600">
          Konstrakt is your go-to freelancing platform for construction
          professionals. We connect skilled workers with project opportunities,
          making it easy to showcase your expertise and find work. Simply create
          your profile and specify the services you offer.
        </p>
      </div>

      <div className="max-w-6xl text-center">
        <h1 className="mt-4 text-3xl font-bold text-gray-800">
          How Konstrakt Works
        </h1>
     
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default aboutpage;
