'use client'

import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    let displayMessage = error?.message || 'An unexpected application error occurred.'
    try {
      const parsed = JSON.parse(displayMessage)
      if (parsed && typeof parsed.error === 'string') {
        displayMessage = `Data access error (${parsed.operationType || 'read'}): ${parsed.error}`
      }
    } catch {
      // Plain error string
    }
    return { hasError: true, message: displayMessage }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[App ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full rounded-2xl border border-rose-200 bg-white p-6 shadow-lg text-center space-y-4">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <AlertTriangle className="size-6" />
            </div>
            <h2 className="text-lg font-extrabold text-[#07294d]">
              Something went wrong
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed break-words">
              {this.state.message}
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, message: '' })
                window.location.reload()
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-[#07294d] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#0b3866] transition cursor-pointer"
            >
              <RefreshCw className="size-3.5" /> Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
