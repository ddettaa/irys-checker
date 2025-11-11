"use client";
import React, { useState } from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function Home() {
  const [input, setInput] = useState("");
  const [allocation, setAllocation] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate random allocation between 5000-30000
    const randomAllocation = Math.floor(Math.random() * (30000 - 5000 + 1)) + 5000;
    setAllocation(randomAllocation);
    setIsSubmitted(true);
  };

  const isEVMAddress = (value: string) => {
    // EVM addresses are 42 characters long and start with 0x
    return /^0x[a-fA-F0-9]{40}$/.test(value);
  };

  const inputType = input.startsWith("0x") && isEVMAddress(input) ? "wallet" : "discord";

  return (
    <WavyBackground className="flex items-center justify-center min-h-screen pb-40 relative overflow-hidden">
      <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-7xl px-4">
        {/* Left side characters */}
        <div className="flex flex-col items-center gap-6 md:gap-8 pointer-events-none">
          <img 
            src="/character-2.svg" 
            alt="Character" 
            className="w-24 h-24 md:w-32 md:h-32 opacity-60 hover:opacity-80 transition-opacity"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          />
          <img 
            src="/character-4.svg" 
            alt="Character" 
            className="w-24 h-24 md:w-32 md:h-32 opacity-60 hover:opacity-80 transition-opacity"
            style={{ animation: 'float 10s ease-in-out infinite 1s' }}
          />
        </div>
        
        {/* Center Card */}
        <CardContainer className="inter-var relative z-10">
        <CardBody className="bg-white relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-neutral-200 w-auto sm:w-[30rem] h-auto rounded-xl p-6 border shadow-lg">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-emerald-600 dark:text-white"
          >
            Irys Checker
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            Insert your Discord Username or EVM Wallet Address
          </CardItem>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <CardItem translateZ="20" className="w-full">
              <label htmlFor="input" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Discord Username / EVM Wallet Address
              </label>
              <input
                id="input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="username#1234 atau 0x..."
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </CardItem>
            
            {isSubmitted && (
              <CardItem translateZ="20" className="w-full">
                <label htmlFor="allocation" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Allocation
                </label>
                <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-200/50 shadow-lg shadow-emerald-500/10">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0" style={{ animation: 'shimmer 3s ease-in-out infinite' }}></div>
                  <div className="relative px-6 py-5 flex items-center justify-between">
                    {allocation !== null ? (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-xs text-emerald-600/70 font-medium uppercase tracking-wider">Allocation</div>
                            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent animate-pulse">
                              {allocation.toLocaleString('id-ID')}
                            </div>
                          </div>
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30">
                          <span className="text-xs font-semibold text-emerald-700">$IRYS</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-10 h-10 rounded-full bg-neutral-200 animate-pulse"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-neutral-200 rounded animate-pulse mb-2"></div>
                          <div className="h-6 bg-neutral-200 rounded animate-pulse w-24"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardItem>
            )}

            <CardItem translateZ="20" className="w-full pt-4">
              {!isSubmitted ? (
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Submit
                </button>
              ) : (
                <div className="w-full text-center py-3">
                  <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                    Only for fun :)
                  </span>
                </div>
              )}
            </CardItem>

            {input && (
              <CardItem translateZ="10" className="w-full pt-2">
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Checker by @ddettaa
                </div>
              </CardItem>
            )}
          </form>
        </CardBody>
      </CardContainer>
      
      {/* Right side characters */}
      <div className="flex flex-col items-center gap-6 md:gap-8 pointer-events-none">
        <img 
          src="/character-3.svg" 
          alt="Character" 
          className="w-24 h-24 md:w-32 md:h-32 opacity-60 hover:opacity-80 transition-opacity"
          style={{ animation: 'float 8s ease-in-out infinite 2s' }}
        />
        <img 
          src="/character-5.svg" 
          alt="Character" 
          className="w-24 h-24 md:w-32 md:h-32 opacity-60 hover:opacity-80 transition-opacity"
          style={{ animation: 'float 9s ease-in-out infinite 3s' }}
        />
      </div>
      </div>
    </WavyBackground>
  );
}
