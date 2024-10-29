"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface ContactStats {
  total: number;
  today: number;
  thisWeek: number;
}

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ContactStats>({ total: 0, today: 0, thisWeek: 0 });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get<Contact[]>('/api/contact');
        const contactsData = response.data;
        setContacts(contactsData);
        
        // Calculate stats
        const today = new Date();
        const todayContacts = contactsData.filter(contact => {
          const contactDate = new Date(contact.createdAt);
          return contactDate.toDateString() === today.toDateString();
        });

        const thisWeekContacts = contactsData.filter(contact => {
          const contactDate = new Date(contact.createdAt);
          const diffTime = Math.abs(today.getTime() - contactDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 7;
        });

        setStats({
          total: contactsData.length,
          today: todayContacts.length,
          thisWeek: thisWeekContacts.length
        });

        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact List</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Contacts</p>
                <h3 className="text-2xl font-bold">{stats.total}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Today's Contacts</p>
                <h3 className="text-2xl font-bold">{stats.today}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">This Week</p>
                <h3 className="text-2xl font-bold">{stats.thisWeek}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {contacts.length === 0 ? (
        <p className="text-center text-gray-500">No contacts found</p>
      ) : (
        <ul className="space-y-6">
          {contacts.map((contact) => (
            <li key={contact._id} className="bg-white shadow-md rounded-lg p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="mt-1 text-lg font-semibold">{contact.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1 text-lg font-semibold">{contact.email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">Message</p>
                  <p className="mt-1">{contact.message}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">Created At</p>
                  <p className="mt-1">{new Date(contact.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactsPage;