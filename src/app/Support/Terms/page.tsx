import { ArrowLeft, FileText, UserCheck, AlertTriangle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import WorkshopNav from "@/components/component/workshop-nav"
import Link from "next/link"

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <WorkshopNav />
      
      <section className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <FileText className="w-16 h-16 mb-6" />
            <h1 className="text-5xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-xl mb-8 max-w-2xl">Please read these terms carefully before using our AI Workshop services. By accessing or using our platform, you agree to be bound by these terms.</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <Card className="shadow-lg mb-12">
          <CardHeader>
            <CardTitle className="text-3xl">AI Workshop Terms of Service</CardTitle>
            <CardDescription>Effective Date: January 1, 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>Welcome to AI Workshop. By using our services, you're agreeing to these terms. Please read them carefully.</p>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-2 flex items-center">
                  <UserCheck className="w-6 h-6 mr-2 text-primary" />
                  1. Acceptance of Terms
                </h2>
                <p>By accessing or using the AI Workshop platform, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-primary" />
                  2. Use of Services
                </h2>
                <p>Our services are provided for educational and informational purposes only. You may not use our platform for any illegal or unauthorized purpose. You agree to comply with all local laws regarding online conduct and acceptable content.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-primary" />
                  3. User Responsibilities
                </h2>
                <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must immediately notify AI Workshop of any unauthorized use of your account.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2 flex items-center">
                  <HelpCircle className="w-6 h-6 mr-2 text-primary" />
                  4. Intellectual Property
                </h2>
                <p>The content on AI Workshop, including text, graphics, logos, and software, is the property of AI Workshop or its content suppliers and is protected by international copyright laws. You may not reproduce, modify, distribute, or republish materials contained on our site without our prior written consent.</p>
              </div>
            </div>

            <p>For the full terms and conditions, please read the entire document carefully. If you have any questions, please contact us at legal@aiworkshop.com.</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            <CardDescription>Common questions about our terms and conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Can I share my account with others?</AccordionTrigger>
                <AccordionContent>
                  No, sharing your account is not permitted. Each account is for individual use only. Sharing your account may result in account termination.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What happens if I violate the terms?</AccordionTrigger>
                <AccordionContent>
                  Violations of our terms may result in warnings, temporary suspension, or permanent termination of your account, depending on the severity and frequency of the violations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I use the course materials for my own teaching?</AccordionTrigger>
                <AccordionContent>
                  The course materials are for personal use only. You may not use, reproduce, or distribute our materials for commercial purposes, including teaching, without explicit written permission from AI Workshop.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How often are the terms updated?</AccordionTrigger>
                <AccordionContent>
                  We review and update our terms periodically to ensure they remain relevant and compliant with current laws. Any significant changes will be communicated to users via email or through notifications on our platform.
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