import Link from "next/link"
import { MountainIcon } from "./Icons"

export default function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-20 flex items-center"> 
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <MountainIcon className="h-8 w-8" /> 
        <span className="sr-only">Acme Agency</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link href="#" className="text-base font-medium hover:underline underline-offset-4" prefetch={false}> 
          Services
        </Link>
        <Link href="#" className="text-base font-medium hover:underline underline-offset-4" prefetch={false}> 
          Projects
        </Link>
        <Link href="#" className="text-base font-medium hover:underline underline-offset-4" prefetch={false}> 
          Contact
        </Link>
      </nav>
    </header>
  )
}