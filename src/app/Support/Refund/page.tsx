import { ArrowLeft, Clock, CreditCard, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import WorkshopNav from "@/components/component/workshop-nav"
import Link from "next/link"

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <WorkshopNav />
      
      <section className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <CreditCard className="w-16 h-16 mb-6" />
            <h1 className="text-5xl font-bold mb-4">Refund Policy</h1>
            <p className="text-xl mb-8 max-w-2xl">We want you to be completely satisfied with your AI Workshop experience. Here's everything you need to know about our refund policy.</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <Card className="shadow-lg mb-12">
          <CardHeader>
            <CardTitle className="text-3xl">Our Refund Policy</CardTitle>
            <CardDescription>Effective as of January 1, 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>At AI Workshop, we stand behind the quality of our educational content. We offer a straightforward refund policy to ensure your satisfaction:</p>
            
            <div className="pl-6 space-y-4">
              <div className="flex items-start">
                <Clock className="w-6 h-6 mr-2 flex-shrink-0 text-primary" />
                <p><strong>Refund before Workshop:</strong> If you feel like not attending the workshop for any reasons, you can inititate your refund before 24 hours of the prior date of workshop.</p>
              </div>
              <div className="flex items-start">
                <HelpCircle className="w-6 h-6 mr-2 flex-shrink-0 text-primary" />
                <p><strong>No Questions Asked:</strong> We trust your judgment. If you feel the workshop doesn't meet your expectations, we'll process your refund without any hassle.</p>
              </div>
            </div>

            <p>To request a refund, please contact our support team at info@mdinfosystems.com with your order details. We aim to process all refund requests within 3-5 business days.</p>

            <p><strong>Please Note:</strong> After the 7-day period, refunds will be considered on a case-by-case basis. We may offer partial refunds or workshop credit for special circumstances.</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            <CardDescription>Common questions about our refund policy</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I request a refund?</AccordionTrigger>
                <AccordionContent>
                  To request a refund, simply email our support team at info@mdinfosystems.com with your order number and the reason for your refund request. We'll process your request as quickly as possible.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I get a refund before the Workshop?</AccordionTrigger>
                <AccordionContent>
                  Before 24 Hours time period, refunds are considered on a case-by-case basis. Please contact our support team to discuss your situation, and we'll do our best to find a solution.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How long does it take to process a refund?</AccordionTrigger>
                <AccordionContent>
                  We aim to process all refund requests within 3-5 business days. Once processed, it may take an additional 5-10 business days for the refund to appear in your account, depending on your payment method and financial institution.
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