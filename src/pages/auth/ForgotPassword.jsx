import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Mail, ArrowLeft, Send, Loader2 } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState('')
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    setEmail(data.email)
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock password reset request
      toast.success('Reset link sent to your email!', {
        description: `We've sent password recovery instructions to ${data.email}`,
        duration: 5000,
      })
      setEmailSent(true)
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again or contact support if the problem persists',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-background p-4 bg-gradient-to-br from-background to-background/80"
    >
      <div className="w-full max-w-md relative">
        {/* Background decoration elements */}
        <div className="absolute -z-10 top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -z-10 bottom-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass p-8 rounded-2xl shadow-lg backdrop-blur-md border border-white/10 bg-white/5"
        >
          <AnimatePresence mode="wait">
            {!emailSent ? (
              <motion.div key="request-form" {...fadeInUp}>
                <Link
                  to="/signin"
                  className="group inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Sign In
                </Link>

                <div className="space-y-2 mb-8">
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.2 } }}
                    className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
                  >
                    Forgot Password?
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.3 } }}
                    className="text-muted-foreground"
                  >
                    Don't worry, it happens. Enter your email and we'll send you a recovery link.
                  </motion.p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors duration-300" />
                      <input
                        {...register('email')}
                        id="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        placeholder="name@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-sm text-destructive flex items-center"
                        >
                          <span className="inline-block w-1 h-1 bg-destructive rounded-full mr-2"></span>
                          {errors.email.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    disabled={isLoading || !isValid}
                    whileHover={!isLoading ? { scale: 1.02, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    type="submit"
                    className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <span>Send Recovery Link</span>
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="mt-8 pt-6 border-t border-border/30">
                  <p className="text-sm text-muted-foreground text-center">
                    Remember your password?{' '}
                    <Link to="/signin" className="text-primary hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="success-state" {...fadeInUp} className="py-4">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Mail className="h-8 w-8" />
                    </motion.div>
                  </div>
                  
                  <h2 className="text-2xl font-bold">Check your inbox</h2>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    We've sent recovery instructions to <span className="font-medium text-foreground">{email}</span>
                  </p>
                  
                  <div className="mt-6 space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setEmailSent(false)}
                      className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300"
                    >
                      Back to reset password
                    </motion.button>
                    
                    <Link 
                      to="/signin"
                      className="block text-center text-sm text-primary hover:underline"
                    >
                      Return to sign in
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Need help? <a href="#" className="text-primary hover:underline">Contact support</a></p>
        </div>
      </div>
    </motion.div>
  )
}

export default ForgotPassword