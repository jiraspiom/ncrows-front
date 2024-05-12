import { Calculate } from '@/components/calculate'
import Image from 'next/image'

interface TokenList {
  brl: string,
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

interface CrowToken {
  icon: string
  price: number
  brl: number
  cotacao: number
}

async function getPriceList(): Promise<TokenList[]> {
  const response = await fetch(
    `https://napi.wemixplay.com/info/v1/token/dex/crowToken`,
    {
      next: {
        revalidate: 60,
      },
    },
  )

  const responseCotacao = await fetch(
    'https://economia.awesomeapi.com.br/last/USD-BRL',
     {
      next:{
        revalidate:60
      }
    }
  )

  const coins = await response.json()

  coins.Data.brl = 'teste'
  console.log('uai', coins.Data.brl)
  
  return coins.Data
}

async function getCrowToken(): Promise<CrowToken> {
  const response = await fetch(
    `https://api.wemixplay.com/info/v1/coin-detail?symbol=CROW`,
    {
      next: {
        revalidate: 60,
      },
    },
  )
  const responseCotacao = await fetch(
    'https://economia.awesomeapi.com.br/last/USD-BRL',
     {
      next:{
        revalidate:60
      }
    }
  )

  const crow = await response.json()
  const cotacao = await responseCotacao.json()
  console.log('cotaca', cotacao.USDBRL.high)
  const valorbr =  cotacao.USDBRL.high

  return {
    icon: crow.data.icon,
    price: crow.data.priceData.price,
    brl: crow.data.priceData.price * valorbr,
    cotacao: valorbr
  }
}

export default async function Home() {
  const coinList = await getPriceList()
  const crow = await getCrowToken()

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
    <div className=" flex items-center justify-center ">
      <div className="flex flex-col w-[980px]"> 
        <div className="flex items-center justify-between w-full h-[90px] mb-1">
          <div className="flex items-center w-[550px] p-5 bg-zinc-900">
            <Image src={crow.icon} width={50} height={50} alt="CROW" />
            <div className="flex flex-col ml-3">
              <h2 className="text-lg">CROW</h2>
              <p className="text-sm">
                {crow.price.toLocaleString('en', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 4,
                })} / {crow.brl.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center w-full h-full bg-zinc-800 p-5">
            <Image
              src="https://gcdn.wemade.games/prod/ncgl/official/2.2.0/_next/static/images/token/diagram-vdia.webp"
              width={40}
              height={40}
              alt="Diamond"
            />
            <p className="text-3xl">= $0.009</p>
          </div>
        </div>

        {coinList.map(({ token, daySummary, brl }: TokenList) => {
          return (
            <div
              className="flex items-center justify-between w-full h-[90px] mb-1"
              key={token.address}
            >
              <div className="flex items-center w-[550px] p-5 bg-zinc-900">
                <Image
                  src={token.icon}
                  width={50}
                  height={50}
                  alt={token.name}
                />
                <div className="flex flex-col ml-3 ">
                  <h2 className="text-lg">{token.name}</h2>
                  <p className="text-sm">
                    {daySummary.close} CROW{' '}
                   
                      <span className="text-xs text-zinc-400">
                        (
                        {daySummary.closeDollar.toLocaleString('en', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                         {' / '}
                        {(daySummary.closeDollar * crow.cotacao).toLocaleString('bt-BR',
                        {style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,})}
                        )
                      
                      </span>
                  
                  </p>
                </div>
              </div>
              <Calculate price={daySummary.closeDollar} crow={crow.price} />
            </div>
          )
        })}
      </div>
    </div>
       <div className=''> by ikillyou</div>
    </div>
  
  )
}
