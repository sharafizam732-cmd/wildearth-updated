import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, CreditCard, Lock, CheckCircle2, Film, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const CartCheckoutModal: React.FC = () => {
  const { isCartOpen, closeCart, cart, removeFromCart, checkoutCart, navigateTo, openVideoPlayer } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('Marcus Thorne');
  const [email, setEmail] = useState('marcus.wildlife@example.com');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');

  if (!isCartOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.video.price, 0);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = checkoutCart(paymentMethod === 'card' ? 'Stripe Credit Card' : 'PayPal Checkout');
      setCompletedOrder(order);
      setIsProcessing(false);
    }, 1200);
  };

  const handleClose = () => {
    setCompletedOrder(null);
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#0b1510] border border-[#2d5a47] rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Order Confirmation View */
          <div className="py-6 text-center space-y-6 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                Order #{completedOrder.orderNumber} Completed
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Montserrat']">
                Payment Successful!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-md mx-auto">
                Thank you for supporting frontline wildlife conservation. Your documentaries are now unlocked and permanently stored in your private library.
              </p>
            </div>

            {/* Unlocked Items */}
            <div className="bg-[#070d0a] rounded-2xl p-4 border border-white/10 text-left space-y-3 max-w-lg mx-auto">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Unlocked Documentaries:
              </div>
              {completedOrder.items.map((video) => (
                <div key={video.id} className="flex items-center justify-between gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-12 h-8 rounded object-cover"
                    />
                    <div>
                      <div className="text-xs font-bold text-white line-clamp-1">{video.title}</div>
                      <div className="text-[10px] text-emerald-400">{video.duration} · 4K UHD</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleClose();
                      openVideoPlayer(video);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] text-xs font-bold flex items-center gap-1.5 flex-shrink-0"
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>Watch Now</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  handleClose();
                  navigateTo('account');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider"
              >
                Go to My Library
              </button>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-200 text-xs font-semibold"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Cart */
          <div className="py-16 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mx-auto text-neutral-400">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white font-['Montserrat']">Your Cart is Empty</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Browse our catalog of 4K wildlife documentaries and individual film releases to add to your collection.
            </p>
            <button
              onClick={() => {
                closeCart();
                navigateTo('videos');
              }}
              className="px-6 py-3 rounded-xl bg-[#10b981] hover:bg-[#34d399] text-[#070d0a] font-bold text-xs uppercase tracking-wider"
            >
              Explore Catalog
            </button>
          </div>
        ) : (
          /* WooCommerce Cart & Checkout Screen */
          <div className="space-y-6 overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <ShoppingBag className="w-4 h-4" />
                <span>WooCommerce Streaming Checkout</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white font-['Montserrat'] mt-1">
                Order Review
              </h3>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {cart.map(({ video }) => (
                <div
                  key={video.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#070d0a] border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-14 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{video.title}</h4>
                      <p className="text-[10px] text-neutral-400">
                        {video.categoryName} · Lifetime Access
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-white tabular-nums">
                      ${video.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(video.id)}
                      className="text-neutral-400 hover:text-rose-400 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-300">Total Purchase</span>
                <span className="text-[10px] text-emerald-400 block">Immediate instant stream unlock</span>
              </div>
              <span className="text-2xl font-extrabold text-white font-['Montserrat'] tabular-nums">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Payment Form */}
            <form onSubmit={handlePay} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Billing Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#070d0a] border border-[#2d5a47] text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Email (Access Key)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#070d0a] border border-[#2d5a47] text-white text-xs"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                        : 'bg-[#070d0a] border-white/10 text-neutral-400'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit / Debit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'paypal'
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                        : 'bg-[#070d0a] border-white/10 text-neutral-400'
                    }`}
                  >
                    <span>PayPal Instant</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Card Information</label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#070d0a] border border-[#2d5a47] text-white text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#070d0a] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/50 transition-all disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {isProcessing ? 'Authorizing Secure Payment...' : `Complete Purchase • $${total.toFixed(2)}`}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>256-Bit SSL Encrypted WooCommerce Simulation &bull; 100% Conservation Royalty</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
