import { Calculate } from '@/components/calculate'
import Image from 'next/image'

interface TokenList {
  token: {
    address: string
    icon: string
    symbol: string
    name: string
    ticker: string
  }
  daySummary: {
    close: number
    closeDollar: number
    prev: number
    low: number
    high: number
  }
}

async function getPriceList(): Promise<TokenList[]> {
  const response = await fetch(
    `https://napi.wemixplay.com/info/v1/token/dex/crowToken`,
    {
      next: {
        revalidate: 30,
      },
    },
  )

  const coins = await response.json()

  return coins.Data
}

export default async function Home() {
  const coinList = await getPriceList()

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col w-[980px]">
        {coinList.map(({ token, daySummary }: TokenList) => {
          return (
            <div
              className="flex items-center justify-between w-full h-[90px] mb-1"
              key={token.address}
            >
              <div className="flex items-center w-[380px] p-5 bg-zinc-900">
                <Image
                  src={token.icon}
                  width={50}
                  height={50}
                  alt={token.name}
                />
                <div className="flex flex-col ml-3">
                  <h2 className="text-lg">{token.name}</h2>
                  <p className="text-sm">
                    {daySummary.close} CROW{' '}
                    <span className="text-xs text-zinc-400">
                      (
                      {daySummary.closeDollar.toLocaleString('en', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                      )
                    </span>
                  </p>
                </div>
              </div>
              <Calculate price={daySummary.closeDollar} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
