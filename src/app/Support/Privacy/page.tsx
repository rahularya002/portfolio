import { ArrowLeft, Shield, Lock, Eye, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import WorkshopNav from "@/components/component/workshop-nav"
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <WorkshopNav />
      
      <section className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <Shield className="w-16 h-16 mb-6" />
            <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl mb-8 max-w-2xl">We value your privacy and are committed to protecting your personal information. Learn how we collect, use, and safeguard your data.</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <Card className="shadow-lg mb-12">
          <CardHeader>
            <CardTitle className="text-3xl">Our Privacy Policy</CardTitle>
            <CardDescription>Last updated: January 1, 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>At AI Workshop, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our services.</p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-primary" />
                  Information We Collect
                </h2>
                <p>We collect information you provide directly to us, such as when you create an account, enroll in a workshop, or contact our support team. This may include:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Name and contact information</li>
                  <li>Payment details</li>
                  <li>Course progress and completion data</li>
                  <li>Communications with our team</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2 flex items-center">
                  <Eye className="w-6 h-6 mr-2 text-primary" />
                  How We Use Your Information
                </h2>
                <p>We use your information to:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Provide and improve our services</li>
                  <li>Process payments and prevent fraud</li>
                  <li>Communicate with you about our workshops and offers</li>
                  <li>Analyze and improve our educational content</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2 flex items-center">
                  <Lock className="w-6 h-6 mr-2 text-primary" />
                  How We Protect Your Information
                </h2>
                <p>We implement a variety of security measures to maintain the safety of your personal information, including:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Encryption of sensitive data</li>
                  <li>Regular security audits</li>
                  <li>Strict access controls for our staff</li>
                  <li>Compliance with applicable data protection laws</li>
                </ul>
              </div>
            </div>

            <p>For more detailed information about our privacy practices, please read our full privacy policy or contact our data protection officer at privacy@aiworkshop.com.</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            <CardDescription>Common questions about our privacy practices</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How can I access or delete my personal data?</AccordionTrigger>
                <AccordionContent>
                  You can access, update, or request deletion of your personal data by logging into your account settings or contacting our support team at support@aiworkshop.com. We will respond to your request within 30 days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do you share my information with third parties?</AccordionTrigger>
                <AccordionContent>
                  We do not sell your personal information. We may share your data with service providers who help us operate our platform, but they are obligated to keep your information confidential and use it only for the purposes we specify.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How long do you retain my data?</AccordionTrigger>
                <AccordionContent>
                  We retain your personal information for as long as necessary to provide you with our services and as required by law. If you delete your account, we will remove your personal data from our systems within 90 days, except where we are required to retain it for legal purposes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What are my rights under data protection laws?</AccordionTrigger>
                <AccordionContent>
                  Depending on your location, you may have rights such as access, rectification, erasure, data portability, and the right to object to processing. If you have any questions about your rights or wish to exercise them, please contact our data protection officer at privacy@aiworkshop.com.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <Link href={'/Support'}>
            <Button variant="outline" className="inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}