'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const Search = ({ search }: { search?: string }) => {
    const router = useRouter()
    const pathname = usePathname()
    const initialRender = useRef(true)

    const [text, setText] = useState(search)
    const [query] = useDebounce(text, 750)

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }

        if (!query) {
            startTransition(() => {
                router.push(`${pathname}`)
            });
        } else {
            startTransition(() => {
                router.push(`${pathname}?query=${query}`)
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    return (
        <div className="flex items-center gap-2">
            <Input
                value={text}
                placeholder='Search ...'
                disabled={isPending}
                onChange={e => setText(e.target.value)}
                className={cn(`h-8 lg:w-[250px]`)}
            />
            {isPending && <Loader2 className='animate-spin' />}
        </div>
    )
}

export default Search