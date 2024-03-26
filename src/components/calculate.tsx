'use client'

import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

interface CalculateProps {
  price: number
}

export function Calculate({ price }: CalculateProps) {
  const [averagePrice, setAveragePrice] = useState<number>(0)

  function handleAveragePrice(e: ChangeEvent<HTMLInputElement>) {
    setAveragePrice(Number(e.target.value))
  }

  const result = 0.0125 * averagePrice
  const marketPrice = result - result * (5 / 100)
  const profit = marketPrice - price

  console.log({ profit, result, marketPrice })

  return (
    <div className="flex items-center w-full h-full bg-zinc-800 p-5">
      <div className="flex items-center w-[180px] border-b-[1px] border-zinc-400">
        <Image
          src="https://gcdn.wemade.games/prod/ncgl/official/2.2.0/_next/static/images/token/diagram-vdia.webp"
          width={40}
          height={40}
          alt="Diamond"
        />
        <input
          type="text"
          value={averagePrice}
          onFocus={(e) => e.target.select()}
          onChange={handleAveragePrice}
          placeholder="1000"
          className="w-[130px] p-3 mx-1 text-3xl border-none bg-transparent"
        />
      </div>
      <div className="flex items-center">
        <span className="mx-8 text-5xl">=</span>
        <div className="text-4xl">
          {result.toLocaleString('en', {
            style: 'currency',
            currency: 'USD',
          })}
        </div>
        {averagePrice > 0 && (
          <div
            className={`relative ml-6 px-4 border-l-[1px] border-zinc-700 text-3xl ${profit > 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            <span className="text-2xs absolute top-0 right-0">-5%</span>
            {profit.toLocaleString('en', {
              style: 'currency',
              currency: 'USD',
            })}
          </div>
        )}
      </div>
    </div>
  )
}
