'use client'


import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
    title: string,
    img: JSX.Element,
    path:string
}




export const SideBarItem = ({ title, img, path }: Props) => {

    const pathName = usePathname()

    return (
        <div>
            {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
            <li>
                <Link href={path} 
                className={`relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:text-white hover:bg-sky-600  ${pathName===path?'text-white bg-gradient-to-r from-sky-600 to-cyan-400':''}`}
                >
                    {img}
                    <span className="-mr-1 font-medium group-hover:text-white-700">{title}</span>
                </Link>
            </li>
        </div>
    )
}
