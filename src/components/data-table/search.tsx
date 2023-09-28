'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { Input } from '../ui/input'

const Search = ({ search }: { search?: string }) => {
    const router = useRouter()
    const pathname = usePathname()
    const initialRender = useRef(true)

    const [text, setText] = useState(search)
    const [query] = useDebounce(text, 750)

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }

        if (!query) {
            router.push(`${pathname}`)
        } else {
            router.push(`${pathname}?query=${query}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    return (
        <div className="">
            <Input
                value={text}
                placeholder='Search name...'
                onChange={e => setText(e.target.value)}
                className="h-8 w-[150px] lg:w-[250px]"
            />
        </div>
    )
}

export default Search