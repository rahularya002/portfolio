import { Mail, Phone, MessageCircle, LifeBuoy, MapPin, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Contact from "@/components/Contact"
import WorkshopNav from "@/components/component/workshop-nav"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <WorkshopNav />
      
      <section className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <LifeBuoy className="w-16 h-16 mb-6" />
            <h1 className="text-5xl font-bold mb-4">Get Support</h1>
            <p className="text-xl mb-8 max-w-2xl">We're here to help you make the most of your AI Workshop experience. Find answers to common questions or reach out to our support team.</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 mb-16">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
              <CardDescription>Get in touch with our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-primary" />
                <span className="text-lg">info@mdinfosystems.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-6 h-6 text-primary" />
                <span className="text-lg">+91-9868735399</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-6 h-6 text-primary" />
                <span className="text-lg">Live chat available 9 AM - 5 PM IST</span>
              </div>
              <div className="flex items-center space-x-3">
                
                <MapPin className="w-6 h-6 text-primary" />
                <span className="text-lg">Suncity Trade Tower, 418 B, Sector 21, Gurugram, Haryana 122016</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I access the workshop materials?</AccordionTrigger>
                  <AccordionContent>
                    Workshop materials will not be provided separately, as the sessions are designed to be interactive and self-contained.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What if I miss a live session?</AccordionTrigger>
                  <AccordionContent>
                    Live sessions are not recorded, so we recommend attending them to get the full experience.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is there a refund policy?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer a refund policy. Refunds are typically available if requested at least 24 hours before the workshop starts. Please refer to our terms and conditions for details.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I get a certificate after completing the workshop?</AccordionTrigger>
                  <AccordionContent>
                  Yes, you will receive a digital certificate upon successful completion of the workshop.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Are there any prerequisites for the workshop?</AccordionTrigger>
                  <AccordionContent>
                   No specific prerequisites are required. Just bring your enthusiasm to learn!
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
      <Contact />
      <div className="flex items-center justify-center py-8">
        <Link href="/workshop">
          <button className="p-3 bg-gray-500/20 border-b rounded-md flex gap-2"><ArrowLeft />Back to home</button>
        </Link>
      </div>
      <Footer />
    </div>
  )
}