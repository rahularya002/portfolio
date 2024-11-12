import { Mail, Phone, MessageCircle, Facebook, Twitter, Linkedin, LifeBuoy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Element } from "react-scroll";
import Contact from "@/components/Contact"
import WorkshopNav from "@/components/component/workshop-nav"
import Footer from "@/components/Footer"

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
              <div className="flex space-x-4 mt-6">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin className="w-5 h-5" />
                </Button>
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
                    All the workshop material will be sent to you via Email as PDF.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What if I miss a live session?</AccordionTrigger>
                  <AccordionContent>
                    There wont be any recordings provided to if you miss the live session. we will be reminding you for the workshop via email before the prior date, although the notes will still be there
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is there a refund policy?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer a 24 hours moneyback gurantee before the workshop in case you are unable to attend the workshop.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I get a certificate after completing the workshop?</AccordionTrigger>
                  <AccordionContent>
                    Upon successful completion of the workshop, you'll receive a digital certificate of completion.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Are there any prerequisites for the workshop?</AccordionTrigger>
                  <AccordionContent>
                    While there are no strict prerequisites, basic programming knowledge is recommended. We'll provide resources for beginners to catch up if needed.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  )
}