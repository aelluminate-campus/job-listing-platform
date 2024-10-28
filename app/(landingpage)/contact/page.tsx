import React from 'react'
import Head from 'next/head';

function contactpage() {
  return (
    <div>
    <Head>
      <title>Contact Me - Konstrakt</title>
    </Head>

    <div className="bg-gray-50 min-h-screen">

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Get in Touch</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           
            <div className="bg-white p-8 shadow-md rounded-lg">
              <form action="#" method="POST">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            <div className="flex flex-col justify-center items-center text-center bg-gray-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <p className="text-gray-600">Feel free to reach out if you have any questions or inquiries.</p>
              <ul className="mt-6 space-y-4">
                <li>
                  <span className="block text-sm font-medium text-gray-700">Email:</span>
                  <a href="mailto:info@konstrakt.com" className="text-blue-600">konstrakt@gmail.com</a>
                </li>
                <li>
                  <span className="block text-sm font-medium text-gray-700">Phone:</span>
                  <a href="tel:+1234567890" className="text-blue-600">+12 345 678 910</a>
                </li>
                <li>
                  <span className="block text-sm font-medium text-gray-700">Address:</span>
                  <p className="text-gray-600">SH-102 Holy Angel University</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  )
}

export default contactpage