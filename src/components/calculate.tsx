'use client'

import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

interface CalculateProps {
  price: number
  crow: number
}

export function Calculate({ price, crow }: CalculateProps) {
  const [averagePrice, setAveragePrice] = useState<number>(0)

  function handleAveragePrice(e: ChangeEvent<HTMLInputElement>) {
    setAveragePrice(Number(e.target.value))
  }

  const result = 0.0125 * averagePrice
  const marketPrice = result - result * (5 / 100)
  const priceInCrow = result / crow
  const profit = marketPrice - price
  const profitInCrow = profit / crow

  console.log({ profit, result, marketPrice, priceInCrow, profitInCrow })

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
        <div className="flex flex-col items-center">
          <p className="flex items-center text-3xl">
            <Image
              src="https://cache.wemixplay.com/ADMIN-CONSOLE/TOKEN/CROW/5b1653cc-d2b1-4d57-a03c-4a73e83dbb46-crow.png"
              width={40}
              height={40}
              alt="CROW"
              className="w-[35px] h-[35px]"
            />
            {priceInCrow.toLocaleString('en', {
              minimumFractionDigits: 4,
            })}
          </p>
          <span className="text-2xl text-zinc-400">
            (
            {result.toLocaleString('en', {
              style: 'currency',
              currency: 'USD',
            })}
            )
          </span>
        </div>
        {averagePrice > 0 && (
          <div
            className={`flex flex-col items-center ml-6 px-4 border-l-[1px] border-zinc-700 text-3xl ${profit > 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            <p className="flex items-center text-3xl">
              <Image
                src="https://cache.wemixplay.com/ADMIN-CONSOLE/TOKEN/CROW/5b1653cc-d2b1-4d57-a03c-4a73e83dbb46-crow.png"
                width={40}
                height={40}
                alt="CROW"
                className="w-[35px] h-[35px]"
              />
              {profitInCrow.toLocaleString('en', {
                minimumFractionDigits: 4,
              })}
            </p>
            <span className="relative text-2xl">
              <span className="text-2xs absolute top-0 right-[-20px]">-5%</span>
              (
              {profit.toLocaleString('en', {
                style: 'currency',
                currency: 'USD',
              })}
              )
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
