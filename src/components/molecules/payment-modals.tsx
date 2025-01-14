import { useState } from 'react'
import { useAccount } from 'wagmi'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

import { Button, Modal, PriceConversion } from '@/components'
import { useBuyNFT, useCurrency, useWertPayment } from '@/hooks'

type PaymentModalsProps = {
  wertModalVisibility: boolean
  paymentModalVisibility: boolean
  nftQuantity: string
  setNftQuantity: (value: string) => void
  wertModalClose: () => void
  paymentModalClose: () => void
}

export const PaymentModals = ({
  wertModalVisibility,
  paymentModalVisibility,
  wertModalClose,
  paymentModalClose,
  nftQuantity,
  setNftQuantity,
}: PaymentModalsProps) => {
  const { buyNFT } = useBuyNFT()
  const { usd } = useCurrency()
  const [wertWidgetStep, setWertWidgetStep] = useState(1)
  const { address } = useAccount()

  const wertWidget = useWertPayment({ address })

  const onModalClose = (modalClose: () => void) => {
    modalClose()
    setNftQuantity('1')
    setTimeout(() => {
      setWertWidgetStep(1)
    }, 250)
  }

  const handleWertWidgetStepTwo = () => {
    setWertWidgetStep(2)
    setTimeout(() => {
      wertWidget.mount()
    }, 500)
  }

  return (
    <>
      <Modal
        open={wertModalVisibility}
        onClose={() => onModalClose(wertModalClose)}
        title={
          wertWidgetStep === 2
            ? `You are going to buy ${nftQuantity} NFT${nftQuantity === '1' ? '' : 's'}`
            : 'Buy NFT using Credit Card'
        }
      >
        <>
          {wertWidgetStep === 1 && (
            <div className="flex items-center flex-col space-y-4 pt-10">
              <PriceConversion currency={usd} nftQuantity={nftQuantity} />
              <span className="text-white">Choose NFT quantity:</span>
              <input
                className="h-20 w-32 bg-white/10 text-center mt-2 text-3xl font-bold text-white"
                onChange={e => setNftQuantity(e.target.value)}
                value={nftQuantity}
                type="number"
                min="1"
              />
              <Button onClick={handleWertWidgetStepTwo} variant="primary" type="button" size="lg">
                Procceed to payment
                <ArrowLongRightIcon className="w-6 h-6 ml-6" />
              </Button>
            </div>
          )}
          {wertWidgetStep === 2 && (
            <AnimatePresence>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                id="wert-widget"
                className="w-full h-[720px] mt-4"
              />
            </AnimatePresence>
          )}
        </>
      </Modal>
      <Modal open={paymentModalVisibility} onClose={() => onModalClose(paymentModalClose)} title="Buy NFT">
        <div className="flex flex-col items-center justify-center space-y-6 mt-10">
          <PriceConversion currency={usd} nftQuantity={nftQuantity} />
          <div className="flex items-center space-x-3">
            <span className="text-white">Choose NFT quantity:</span>
            <input
              className="h-20 w-32 bg-white/10 text-center mt-2 text-3xl font-bold text-white"
              onChange={e => setNftQuantity(e.target.value)}
              value={nftQuantity}
              type="number"
              min="1"
            />
          </div>

          <Button onClick={() => buyNFT()} variant="primary" type="button" size="lg">
            Buy NFT
            <ArrowLongRightIcon className="w-6 h-6 ml-6" />
          </Button>
        </div>
      </Modal>
    </>
  )
}
