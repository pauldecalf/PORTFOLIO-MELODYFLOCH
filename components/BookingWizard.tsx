'use client'

import { useState } from 'react'
import { SessionType } from '@prisma/client'
import BookingStepSession from './booking/BookingStepSession'
import BookingStepDate from './booking/BookingStepDate'
import BookingStepTime from './booking/BookingStepTime'
import BookingStepInfo from './booking/BookingStepInfo'
import BookingStepConfirmation from './booking/BookingStepConfirmation'

interface BookingWizardProps {
  sessionTypes: SessionType[]
}

export interface BookingData {
  sessionTypeId: string
  sessionType?: SessionType
  date: Date | null
  startTime: string
  endTime: string
  clientName: string
  clientEmail: string
  clientPhone: string
  message: string
}

export default function BookingWizard({ sessionTypes }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    sessionTypeId: '',
    date: null,
    startTime: '',
    endTime: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    message: '',
  })

  const steps = [
    { number: 1, title: 'Type de séance' },
    { number: 2, title: 'Date' },
    { number: 3, title: 'Horaire' },
    { number: 4, title: 'Vos informations' },
    { number: 5, title: 'Confirmation' },
  ]

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }))
  }

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5))
  }

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div>
      {/* Indicateur de progression */}
      <div className="mb-12">
        {/* Layout vertical (mobile et desktop si pas assez de place) */}
        <div className="space-y-4 lg:hidden">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors flex-shrink-0 ${
                    currentStep >= step.number
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-8 mt-2 transition-colors ${
                      currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 pt-2">
                <span
                  className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-primary-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop : Horizontal uniquement si assez de place (lg et plus) */}
        <div className="hidden lg:flex items-start justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                    currentStep >= step.number
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`mt-2 text-sm font-medium text-center leading-tight ${
                    currentStep >= step.number ? 'text-primary-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 transition-colors ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contenu de l'étape */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        {currentStep === 1 && (
          <BookingStepSession
            sessionTypes={sessionTypes}
            selectedId={bookingData.sessionTypeId}
            onSelect={(sessionType) => {
              updateBookingData({
                sessionTypeId: sessionType.id,
                sessionType,
              })
              goToNextStep()
            }}
          />
        )}

        {currentStep === 2 && (
          <BookingStepDate
            sessionTypeId={bookingData.sessionTypeId}
            selectedDate={bookingData.date}
            onSelectDate={(date) => {
              updateBookingData({ date })
              goToNextStep()
            }}
            onBack={goToPreviousStep}
          />
        )}

        {currentStep === 3 && (
          <BookingStepTime
            sessionTypeId={bookingData.sessionTypeId}
            date={bookingData.date!}
            selectedTime={bookingData.startTime}
            onSelectTime={(startTime, endTime) => {
              updateBookingData({ startTime, endTime })
              goToNextStep()
            }}
            onBack={goToPreviousStep}
          />
        )}

        {currentStep === 4 && (
          <BookingStepInfo
            bookingData={bookingData}
            onSubmit={(data) => {
              updateBookingData(data)
              goToNextStep()
            }}
            onBack={goToPreviousStep}
          />
        )}

        {currentStep === 5 && (
          <BookingStepConfirmation
            bookingData={bookingData}
            onBack={goToPreviousStep}
          />
        )}
      </div>
    </div>
  )
}

