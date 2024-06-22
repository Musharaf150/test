'use client'

import { useState } from 'react'

import { z } from 'zod'
import { FormDataSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = z.infer<typeof FormDataSchema>

const steps = [
  {
    id: 'Step # 1',
    name: 'Marketing Budget',
    fields:['$1000/mo', '$1000-$2000', '$2000-$5000', '$5000-$10000', '$10000-$25000', '$25000+']
  },
  {
    id: 'Step # 2',
    name: 'Personal Information',
    fields: ['firstName','email', 'phoneNo', 'comment']
  },
  { id: 'Step # 3', name: 'Complete' }
]

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema)
  })

  const processForm: SubmitHandler<Inputs> = data => {
    console.log(data)
    reset()
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  const calculateProgressBar = ()=>{
    return ((currentStep + 1) / steps.length) * 100;
  }

  return (
    <section className='relative p-4 pt-0'>
       {/* Navigation */}
       <div className='py-5'>
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={prev}
            disabled={currentStep === 0}
            className='flex font-bold'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6 font-bold pr-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>
            Go Back
          </button>
          <button
            type='button'
            className='flex font-bold ml-5 pl-5'
          >
            Exit
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
          </button>
        </div>
      </div>

      <div className='progress-bar'>
        <div className="progress overflow-hidden" style={{ width: `${calculateProgressBar()}%` }}> 
    </div>
      </div>

      <div className='flex justify-center items-center pt-5'>
      <h1 className='font-extrabold text-gray-900'>
      {steps[currentStep].id}
      </h1>
      </div>

      {/* Form */}
      <section className='flex justify-center items-center px-10'>
    
    
      <form className='py-9' onSubmit={handleSubmit(processForm)}>

      {currentStep === 0 && (
          <div className='px-10'>
            <h1 className='text-xl text-center font-extrabold text-gray-900'>
              What is your monthly digital marketing budget?
            </h1>

            <div className='mt-10 flex flex-col col-span-3 gap-y-4'>
              <div className='sm:col-span-3'>
                <div className='mt-2'>
                  <button
                  id='$1000/mo'
                  type='button'
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:bg-lime-600 hover:bg-lime-600 hover:transition ease-in sm:text-sm sm:leading-6'
                  
                  >
                    $1000/mo
                  </button>
                
                </div>
              </div>

              <div className='sm:col-span-3'>
                <div className='mt-2'>
                  <button
                  id='$1000-$2000'
                  type='button'
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:bg-lime-600 hover:bg-lime-600 hover:transition ease-in sm:text-sm sm:leading-6'                  
                  >
                    $1,000 - $2,000
                  </button>
                
                </div>
              </div>

              <div className='sm:col-span-3'>
                <div className='mt-2'>
                  <button
                  id='$2000-$5000'
                  type='button'
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:bg-lime-600 hover:bg-lime-600 hover:transition ease-in sm:text-sm sm:leading-6'
                  
                  >
                    $2,000 - $5,000
                  </button>
                
                </div>
              </div>

              <div className='sm:col-span-3'>
                <div className='mt-2'>
                  <button
                  id='$5000-$10000'
                  type='button'
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:bg-lime-600 hover:bg-lime-600 hover:transition ease-in sm:text-sm sm:leading-6'
                  
                  >
                    $5,000 - $10,000
                  </button>
                
                </div>
              </div>

              <div className='sm:col-span-3'>
                <div className='mt-2'>
                  <button
                  id='$10000-$25000'
                  type='button'
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:bg-lime-600 hover:bg-lime-600 hover:transition ease-in sm:text-sm sm:leading-6'
                  
                  >
                    $10,000 - $25,000
                  </button>
                
                </div>
              </div>

              <div className='sm:col-span-3'>
                <div className='mt-2'>
                  <button
                  id='$25000+'
                  type='button'
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:bg-lime-600 hover:bg-lime-600 hover:transition ease-in sm:text-sm sm:leading-6'
                  
                  >
                    $25000 +
                  </button>
                
                </div>
              </div>
              </div>
              </div>
        )}



        {currentStep === 1 && (
          <div className='flex flex-col justify-center items-center'>
            <h2 className='text-xl text-center font-extrabold text-gray-900'>
              Details
            </h2>
            <p className=' text-center mt-1 text-sm leading-6 text-gray-600'>
             We're thrilled at the opportunity to help you grow your business online. <br/>
             Please let us know the best way to reach you.
            </p>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-6'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Name
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='firstName'
                    {...register('firstName')}
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.firstName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    type='email'
                    {...register('email')}
                    autoComplete='email'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.email?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='phoneNo'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Phone Number
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='phoneNo'
                    {...register('phoneNo')}
                    autoComplete='family-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.phoneNo?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.phoneNo.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-6'>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Anything else you'd like to share?
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='comment'
                    className='block w-full rounded-md border-0 pb-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
              
                </div>
              </div>
            </div>
            <div className=' py-6'>
              <button
            type='button'
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className=' text-center bg-lime-700 px-6 py-3 text-white'
          >
            Send Request
          </button>
          </div>
          <span className=' flex text-sm font-medium  text-slate-500 pl-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>
We promise never to share your information or spam your inbox</span>

          </div>
        )}

        {currentStep === 2 && (
          <>
          <section className='flex flex-col justify-center items-center gap-y-3 flex-grow-0'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
</svg>

            <h2 className='text-center text-xl font-bold px-5 leading-7 text-gray-900'>
              Your Request for a Proposal Has <br/> Been Submitted!
            </h2>
            <p className='text-center px-12 mt-1 text-sm leading-6 text-gray-600'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo consectetur sit odio nam dolor corporis fuga eos minima a, harum, nihil fugit? Voluptate assumenda fugit veniam temporibus non obcaecati alias.
          
            </p>

            <button
            type='button'
            className=' text-center bg-lime-700 px-6 py-3 text-white'
          >
            Return Home
          </button>
          </section>
          </>
        )}
      </form>
      </section>

    </section>
  )
}
