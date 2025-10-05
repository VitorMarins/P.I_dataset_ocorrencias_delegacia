
import Error from 'next/error'

export async function getServerPros() {
    const res = await fetch('api')
    const errorCode = res.ok? false : res.status
    const json = await res.json()

    return ''
}