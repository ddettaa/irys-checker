"use client";
import React, { useState } from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function Home() {
  const [input, setInput] = useState("");
  const [allocation, setAllocation] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 70% chance not eligible, 30% chance eligible
    const random = Math.random();
    if (random < 0.) {
      // 70% - Not eligible
      setIsEligible(false);
      setAllocation(null);
    } else {
      // 30% - Eligible, generate random allocation between 5000-70000
      setIsEligible(true);
      const randomAllocation = Math.floor(Math.random() * (70000 - 5000 + 1)) + 5000;
      setAllocation(randomAllocation);
    }
    setIsSubmitted(true);
  };

  const isEVMAddress = (value: string) => {
    // EVM addresses are 42 characters long and start with 0x
    return /^0x[a-fA-F0-9]{40}$/.test(value);
  };

  const inputType = input.startsWith("0x") && isEVMAddress(input) ? "wallet" : "discord";

  return (
    <WavyBackground className="flex items-center justify-center min-h-screen pb-20 md:pb-40 relative overflow-hidden px-4">
      <div className="flex items-center justify-center gap-1 md:gap-8 w-full max-w-7xl">
        {/* Left side characters */}
        <div className="flex flex-col items-center gap-3 md:gap-8 pointer-events-none">
          <img 
            src="/character-2.svg" 
            alt="Character" 
            className="w-12 h-12 md:w-32 md:h-32 opacity-60 hover:opacity-80 transition-opacity"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          />
          <img 
            src="/character-4.svg" 
            alt="Character" 
            className="w-12 h-12 md:w-32 md:h-32 opacity-60 hover:opacity-80 transition-opacity"
            style={{ animation: 'float 10s ease-in-out infinite 1s' }}
          />
        </div>
        
        {/* Center Card */}
        <CardContainer className="inter-var relative z-10 w-full">
        <CardBody className="bg-white relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-neutral-200 w-full max-w-md md:w-[30rem] h-auto rounded-xl p-4 md:p-6 border shadow-lg">
          <CardItem
            translateZ="50"
            className="text-lg md:text-xl font-bold text-emerald-600 dark:text-white"
          >
            Irys Checker
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-xs md:text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            Insert your X,Discord Username or EVM Wallet Address
          </CardItem>
          <form onSubmit={handleSubmit} className="mt-4 md:mt-6 space-y-3 md:space-y-4">
            <CardItem translateZ="20" className="w-full">
              <label htmlFor="input" className="block text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                X, Discord Username or EVM Wallet Address
              </label>
              <input
                id="input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="username#1234 atau 0x..."
                className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </CardItem>
            
            {isSubmitted && (
              <CardItem translateZ="20" className="w-full">
                <label htmlFor="allocation" className="block text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  {isEligible ? "Allocation" : "Status"}
                </label>
                {isEligible ? (
                  <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-200/50 shadow-lg shadow-emerald-500/10">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0" style={{ animation: 'shimmer 3s ease-in-out infinite' }}></div>
                    <div className="relative px-4 md:px-6 py-4 md:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      {allocation !== null ? (
                        <>
                          <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 flex-shrink-0">
                              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-[10px] md:text-xs text-emerald-600/70 font-medium uppercase tracking-wider">Allocation</div>
                              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent animate-pulse">
                                {allocation.toLocaleString('id-ID').replace(/\./g, '.')}
                              </div>
                            </div>
                          </div>
                          <div className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 self-start sm:self-auto">
                            <span className="text-[10px] md:text-xs font-semibold text-emerald-700">$IRYS</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-3 w-full">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-200 animate-pulse"></div>
                          <div className="flex-1">
                            <div className="h-3 md:h-4 bg-neutral-200 rounded animate-pulse mb-2"></div>
                            <div className="h-5 md:h-6 bg-neutral-200 rounded animate-pulse w-24"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 border-2 border-red-200/50 shadow-lg shadow-red-500/10">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-400/20 to-red-400/0" style={{ animation: 'shimmer 3s ease-in-out infinite' }}></div>
                    <div className="relative px-4 md:px-6 py-4 md:py-5 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div className="text-sm md:text-base font-semibold text-red-600 dark:text-red-500">
                          Sorry, not eligible
                        </div>
                        <div className="text-xs md:text-sm text-red-500/80 dark:text-red-400/80 mt-1">
                          Try next season
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardItem>
            )}

            <CardItem translateZ="20" className="w-full pt-3 md:pt-4">
              {!isSubmitted ? (
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Submit
                </button>
              ) : (
                <div className="w-full text-center py-2 md:py-3">
                  <span className="text-base md:text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                    Only for fun :)
                  </span>
                </div>
              )}
            </CardItem>

             
              <CardItem translateZ="10" className="w-full pt-2">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-[10px] md:text-xs text-neutral-500 dark:text-neutral-400 text-center">
                  <span className="leading-tight">created by @ddettaa, you can see the code by clicking the icon github</span>
                  <a 
                    href="https://github.com/ddettaa/irys-checker" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-4 h-4 md:w-5 md:h-5 text-emerald-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors flex-shrink-0"
                    aria-label="View repository on GitHub"
                  >
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </CardItem>
            
          </form>
        </CardBody>
      </CardContainer>
      
      {/* Right side characters */}
      <div className="flex flex-col items-center gap-3 md:gap-8 pointer-events-none">
        <img 
          src="/character-3.svg" 
          alt="Character" 
          className="w-12 h-12 md:w-32 md:h-32 opacity-60 hover:opacity-80 transition-opacity"
          style={{ animation: 'float 8s ease-in-out infinite 2s' }}
        />
        <img 
          src="/character-5.svg" 
          alt="Character" 
          className="w-12 h-12 md:w-32 md:h-32 opacity-60 hover:opacity-80 transition-opacity"
          style={{ animation: 'float 9s ease-in-out infinite 3s' }}
        />
      </div>
      </div>
    </WavyBackground>
  );
}
