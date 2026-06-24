import { createPurchase } from '@/lib/actions/purchases'
// import { createSubscribe } from '@/lib/actions/subscribes'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { FiCheckCircle, FiArrowRight, FiMail } from 'react-icons/fi'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail },
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {

    await createPurchase({
    artworkId: metadata.artworkId,
    buyerEmail: metadata.buyerEmail,
    buyerName: metadata.buyerName,
  });

    
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 text-white selection:bg-purple-500/30">
        
        {/* GLOSSY OUTER BORDER CONTAINER */}
        <div className="relative w-full max-w-lg rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/40 via-neutral-800 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          
          {/* MAIN GLASS CARD */}
          <div className="p-8 md:p-10 bg-[#0e0e16]/90 backdrop-blur-xl rounded-[23px] border-none text-center space-y-6 flex flex-col items-center">
            
            {/* GLOWING PURPLE CHECK ICON */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full scale-125"></div>
              <div className="relative p-5 bg-purple-500/10 rounded-2xl border border-purple-500/30 text-purple-400 text-4xl shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                <FiCheckCircle />
              </div>
            </div>

            {/* TYPOGRAPHY WITH DYNAMIC GRADIENT */}
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-neutral-200 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                Payment Successful!
              </h1>
              <p className="text-xs font-bold tracking-widest text-purple-400 uppercase">
                Your Purchase is completed
              </p>
            </div>

            {/* SEPARATOR LINE */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>

            {/* DYNAMIC CONFIRMATION MESSAGE */}
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed max-w-sm">
              We appreciate your business! A confirmation email will be sent to{" "}
              <span className="font-semibold text-white bg-neutral-800/60 px-2 py-0.5 rounded border border-neutral-700/50 break-all inline-block">
                {customerEmail}
              </span>.
            </p>

            {/* SUPPORT BOX */}
            <div className="flex items-center gap-2 justify-center bg-neutral-900/40 border border-neutral-800/60 rounded-xl px-4 py-2 w-full text-xs text-neutral-400">
              <FiMail className="text-purple-400 flex-shrink-0" />
              <span>
                Questions? Email us at{" "}
                <a href="mailto:orders@example.com" className="text-neutral-200 hover:text-purple-400 font-medium underline transition-colors">
                  orders@example.com
                </a>
              </span>
            </div>

            {/* REDIRECT BUTTON */}
            <div className="w-full pt-4">
              <a
                href="/dashboard/buyer"
                className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 px-6 rounded-xl shadow-[0_4px_20px_rgba(168,85,247,0.2)] hover:shadow-[0_4px_25px_rgba(168,85,247,0.3)] transition-all duration-300"
              >
                Go to Dashboard
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>
        </div>

      </div>
    )
  }
}