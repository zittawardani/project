import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog';
import { Button } from '../../button';
import { ProductDataType } from '@/types/productDataTypes';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import { InvoiceDataType } from '@/types/invoiceDataTypes';
import openNewWindow from '@/utils/openNewWindow';

const ModalCheckout = ({ img, title, desc, price, priceType, category }: ProductDataType) => {
  const { toast } = useToast()
  const fee = (price * 0.004)
  const tax = 0.05
  const appFee = 0.002
  const total = (price + (fee + price * tax + price * appFee))
  const [invoiceResponse, setInvoiceResponse] = useState<InvoiceDataType.Main>(Object)
  const [url, setUrl] = useState('')
  const [load, setLoad] = useState(false)
  const [successCreatingInvoice, setSuccesCreatingInvoice] = useState(false)

  const handleDebitCardPayment = async () => {
    const body = {
      amount: total,
      description: `Payout for ${title} on the marketplace dbix.my.id`,
      items: [
        {
          name: title,
          quantity: 1,
          price: price
        }
      ]
    }
    setLoad(true)
    try {
      const resp = await axios.post('/api/payment/create-checkout', body)

      if (resp.status === 200) {
        const invoiceUrl = resp.data.data.invoiceUrl
        setLoad(false)
        toast({
          description: "Creating invoice success!",
        })

        setTimeout(() => {
          window.open(invoiceUrl)
        }, 1000)
      } else {
        toast({
          description: "Creating invoice Failed!",
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.log(error)
      setLoad(false)
      toast({
        description: "Error server!",
        variant: 'destructive'
      })
    }
  }


  return (
    <Dialog>
      <DialogTrigger>
        <Button size={'default'} className='font-medium w-full'>Buy now!</Button>
      </DialogTrigger>
      <DialogContent className='flex justify-between gap-5'>
        <DialogHeader className='w-1/2'>
          <DialogTitle>
            <img src={img} alt={title} className='w-full h-[26rem] object-cover rounded-md' />
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className='w-1/2 flex flex-col gap-5'>
          <h1 className=''>Transaction confirmation</h1>
          <h1 className='text-black font-bold text-xl'>{title}</h1>
          <p>{desc}</p>
          <div className='flex flex-col gap-5'>
            <div className='pb-2 border-b w-full justify-between flex'>
              <h1 className='text-sm'>Transaction fee :</h1>
              <p className='text-sm'>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(fee)}</p>
            </div>
            <div className='pb-2 border-b w-full justify-between flex'>
              <h1 className='text-sm'>TAX :</h1>
              <p className='text-sm'>{tax * 100}% ({new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(tax * price)})</p>
            </div>
            <div className='pb-2 border-b w-full justify-between flex'>
              <h1 className='text-sm'>Application fee :</h1>
              <p className='text-sm'>{appFee * 100}% ({new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(appFee * price)})</p>
            </div>
            <div className='pb-2 border-b w-full justify-between flex'>
              <h1 className='text-xl font-bold text-black'>TOTAL :</h1>
              <p className='text-sm text-black font-bold'>{(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total))}</p>
            </div>
            <div className='flex flex-col gap-3 w-full'>
              <h1>Payment methods</h1>
              <div className='flex items-center gap-3 justify-between w-full'>
                <Button size={'sm'} className='w-full'>Crypto currency</Button>
                <Button size={'sm'} className='w-full' onClick={handleDebitCardPayment}>{load ? 'Creating Invoice....' : 'Debit cards and other payments'}</Button>
              </div>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCheckout;