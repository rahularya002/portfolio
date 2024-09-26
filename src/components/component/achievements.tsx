"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export function Achievements(): JSX.Element {
  const [counts, setCounts] = useState({
    users: 0,
    uptime: 0,
    customers: 0,
    satisfaction: 0
  });

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (inView) {
      interval = setInterval(() => {
        setCounts(prevCounts => ({
          users: Math.min(prevCounts.users + 10000, 100000),
          uptime: Math.min(prevCounts.uptime + 1, 99.9),
          customers: Math.min(prevCounts.customers + 5, 250),
          satisfaction: Math.min(prevCounts.satisfaction + 0.1, 4.9)
        }));
      }, 50);
    }

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section className="bg-black text-white min-h-screen py-12 md:py-16 lg:py-20 flex items-center justify-center">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold">Our Achievements</h2>
          <p className="text-gray-300 text-lg md:text-xl">
            We've accomplished a lot in a short amount of time. Check out our key achievements below.
          </p>
        </div>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-900 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <GaugeIcon className="w-10 h-10 mb-4 text-blue-500" />
            <div className="text-4xl font-bold mb-2">{counts.users.toLocaleString()}+</div>
            <p className="text-gray-400">Active Users</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <RocketIcon className="w-10 h-10 mb-4 text-blue-500" />
            <div className="text-4xl font-bold mb-2">{counts.uptime.toFixed(1)}%</div>
            <p className="text-gray-400">Uptime</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <BriefcaseIcon className="w-10 h-10 mb-4 text-blue-500" />
            <div className="text-4xl font-bold mb-2">{counts.customers}+</div>
            <p className="text-gray-400">Enterprise Customers</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <SparkleIcon className="w-10 h-10 mb-4 text-blue-500" />
            <div className="text-4xl font-bold mb-2">{counts.satisfaction.toFixed(1)}/5</div>
            <p className="text-gray-400">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function BriefcaseIcon(props: IconProps): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}

function GaugeIcon(props: IconProps): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  )
}

function RocketIcon(props: IconProps): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

function SparkleIcon(props: IconProps): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  )
}
