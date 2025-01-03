  "use client";
  import React, { useEffect, useState } from 'react';
  import { Card, CardContent } from "@/components/ui/card";
  import { Users, UserCheck, Calendar, Loader2 } from "lucide-react";
  import { useToast } from "@/hooks/use-toast";
  import Link from "next/link";
  import { cn } from '@/lib/utils';

  interface Registration {
    _id: string;
    name: string;
    email: string;
    amount: string;
    createdAt: string;
    paymentMethod: string;
    phoneNumber: string;
    paymentStatus?: 'pending' | 'completed';
  }

  interface RegistrationStats {
    total: number;
    today: number;
    thisWeek: number;
    paid: number;
  }

  const WorkshopRegistrationsPage = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<RegistrationStats>({ 
      total: 0, 
      today: 0, 
      thisWeek: 0,
      paid: 0 
    });
    const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'thisWeek' | 'paid'>('all');
    const { toast } = useToast();

    useEffect(() => {
      const fetchRegistrations = async () => {
        try {
          const response = await fetch('/api/signup');
          const data = await response.json();
          
          if (!response.ok) throw new Error(data.message);
          
          setRegistrations(data);

          // Calculate stats
          const today = new Date();
          const todayRegistrations = data.filter((reg: Registration) => {
            const regDate = new Date(reg.createdAt);
            return regDate.toDateString() === today.toDateString();
          });

          const thisWeekRegistrations = data.filter((reg: Registration) => {
            const regDate = new Date(reg.createdAt);
            const diffTime = Math.abs(today.getTime() - regDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 7;
          });

          const paidRegistrations = data.filter((reg: Registration) => 
            reg.paymentStatus === 'completed'
          );

          setStats({
            total: data.length,
            today: todayRegistrations.length,
            thisWeek: thisWeekRegistrations.length,
            paid: paidRegistrations.length
          });

          setLoading(false);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to fetch registrations",
            variant: "destructive",
          });
          setLoading(false);
        }
      };

      fetchRegistrations();
    }, [toast]);

    // Filter registrations based on the selected filter
    const filteredRegistrations = registrations.filter((reg) => {
      if (activeFilter === 'today') {
        const regDate = new Date(reg.createdAt);
        return regDate.toDateString() === new Date().toDateString();
      }
      if (activeFilter === 'thisWeek') {
        const regDate = new Date(reg.createdAt);
        const diffTime = Math.abs(new Date().getTime() - regDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      }
      if (activeFilter === 'paid') {
        return reg.paymentStatus === 'completed';
      }
      return true;
    });

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-neutral-800 dark:text-neutral-200" />
        </div>
      );
    }

    return (
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
              Workshop Registrations
            </h1>
            <p className="text-neutral-600 text-sm mt-1 dark:text-neutral-300">
              View and manage workshop registrations
            </p>
          </div>
          <Link href="/workshop">
            <button className="bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 text-white rounded-md px-4 h-10 font-medium">
              Back to Home
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card onClick={() => setActiveFilter('all')} className="cursor-pointer bg-white dark:bg-black border dark:border-zinc-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Total Registrations</p>
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.total}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card onClick={() => setActiveFilter('paid')} className="cursor-pointer bg-white dark:bg-black border dark:border-zinc-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Paid Registrations</p>
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.paid}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card onClick={() => setActiveFilter('today')} className="cursor-pointer bg-white dark:bg-black border dark:border-zinc-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Today</p>
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.today}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card onClick={() => setActiveFilter('thisWeek')} className="cursor-pointer bg-white dark:bg-black border dark:border-zinc-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">
                  <Calendar className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">This Week</p>
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.thisWeek}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {filteredRegistrations.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-black border dark:border-zinc-800 rounded-lg">
            <p className="text-neutral-600 dark:text-neutral-300">No registrations found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRegistrations.map((registration) => (
              <div 
                key={registration._id} 
                className="bg-white dark:bg-black border dark:border-zinc-800 rounded-lg p-6 shadow-sm"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Name</p>
                    <p className="mt-1 font-semibold text-neutral-800 dark:text-neutral-200">{registration.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Email</p>
                    <p className="mt-1 text-neutral-800 dark:text-neutral-200">{registration.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">contact</p>
                    <p className="mt-1 text-neutral-800 dark:text-neutral-200">{registration.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">amount</p>
                    <p className="mt-1 text-neutral-800 dark:text-neutral-200">{registration.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Registered On</p>
                    <p className="mt-1 text-neutral-800 dark:text-neutral-200">{new Date(registration.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Payment Method</p>
                    <p className="mt-1 text-neutral-800 dark:text-neutral-200">{registration.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Status</p>
                    <p className={cn("mt-1 font-semibold", registration.paymentStatus === 'completed' ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400")}>
                      {registration.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default WorkshopRegistrationsPage;
