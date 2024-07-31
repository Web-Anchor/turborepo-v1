'use client';

import { Divider, Header } from '@repo/components';

export default function Page(): JSX.Element {
  return (
    <section className="flex flex-col gap-10">
      <Divider text="Bounce Wrappers" textAlign="center" />
      <section>
        <Header
          logo={
            <div className="flex lg:flex-1">
              <div className="text-gray-800 font-bold bg-indigo-300 p-2 rounded-lg">
                Logo
              </div>
            </div>
          }
          menuList={[
            <a href="#" className="text-gray-800 font-bold">
              Home
            </a>,
            <a href="#" className="text-gray-800 font-bold">
              About
            </a>,
            <a href="#" className="text-gray-800 font-bold">
              Services
            </a>,
            <a href="#" className="text-gray-800 font-bold">
              Contact
            </a>,
          ]}
          callsToAction={[
            <div className="flex gap-5">
              <button className="text-gray-800 font-bold bg-indigo-300 p-2 rounded-lg">
                Sign In
              </button>
              <button className="text-gray-800 font-bold">Sign Up</button>
            </div>,
          ]}
          className="bg-slate-200"
          footer={
            <div className="flex justify-center text-gray-800 font-bold">
              &copy; 2021
            </div>
          }
        />
      </section>
    </section>
  );
}
