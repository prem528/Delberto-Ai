import Link from "next/link"

export function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={`flex items-center  space-x-4 lg:space-x-6 ${className}`}
      {...props}
    >
      <Link
        href="/"
        className="text-xl font-bold flex items-center"
      >
        <div className="w-8 h-8 bg-blue-500 rounded-full mr-2" />
        LOGO
      </Link>
    </nav>
  )
}

