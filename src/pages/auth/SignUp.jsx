import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Mail, Lock, Eye, EyeOff, User, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  
  const { register, handleSubmit, watch, formState: { errors, isValid, dirtyFields } } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  const password = watch('password', '')
  const passwordStrength = calculatePasswordStrength(password)

  function calculatePasswordStrength(password) {
    if (!password) return 0
    let strength = 0
    
    // Length check
    if (password.length >= 6) strength += 1
    if (password.length >= 10) strength += 1
    
    // Character variety
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    
    return Math.min(strength, 5)
  }

  const getProgressColor = (strength) => {
    if (strength <= 1) return 'bg-red-500'
    if (strength <= 3) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Account created successfully!', {
        description: 'Please check your email to verify your account.',
        duration: 5000,
      })
      
      navigate('/verify')
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again or contact support.',
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
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/90 to-background/80 p-4"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass p-8 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 bg-white/5 overflow-hidden"
        >
          {/* Progress indicator */}
          <div className="mb-8 relative">
            <div className="w-full h-1 bg-border/30 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: step === 1 ? '50%' : '100%' }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="h-full bg-primary"
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-primary font-medium">Account details</span>
              <span className={`text-xs ${step === 2 ? 'text-primary' : 'text-muted-foreground'} font-medium`}>Security</span>
            </div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-center bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-2"
          >
            Create Account
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            className="text-center text-muted-foreground mb-6"
          >
            Join our community and get started today
          </motion.p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" {...fadeInUp} className="space-y-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium flex justify-between">
                      <span>Full Name</span>
                      {dirtyFields.name && !errors.name && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-green-500 flex items-center text-xs"
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Valid
                        </motion.span>
                      )}
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors duration-300" />
                      <input
                        {...register('name')}
                        id="name"
                        type="text"
                        autoComplete="name"
                        autoFocus
                        placeholder="John Doe"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-background/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${errors.name ? 'border-destructive' : 'border-input'}`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-sm text-destructive flex items-center"
                        >
                          <AlertCircle className="h-3 w-3 mr-1" /> {errors.name.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium flex justify-between">
                      <span>Email Address</span>
                      {dirtyFields.email && !errors.email && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-green-500 flex items-center text-xs"
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Valid
                        </motion.span>
                      )}
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors duration-300" />
                      <input
                        {...register('email')}
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-background/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${errors.email ? 'border-destructive' : 'border-input'}`}
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
                          <AlertCircle className="h-3 w-3 mr-1" /> {errors.email.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    disabled={!dirtyFields.name || !dirtyFields.email || errors.name || errors.email}
                    onClick={() => setStep(2)}
                    className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Continue</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="step2" {...fadeInUp} className="space-y-6">
                  {/* Password field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors duration-300" />
                      <input
                        {...register('password')}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        autoFocus
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-background/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${errors.password ? 'border-destructive' : 'border-input'}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    
                    {/* Password strength meter */}
                    {password && (
                      <div className="space-y-1 mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Password strength:</span>
                          <span className={passwordStrength <= 1 ? 'text-red-500' : passwordStrength <= 3 ? 'text-yellow-500' : 'text-green-500'}>
                            {passwordStrength <= 1 ? 'Weak' : passwordStrength <= 3 ? 'Medium' : 'Strong'}
                          </span>
                        </div>
                        <div className="h-1 w-full bg-border/30 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                            className={`h-full ${getProgressColor(passwordStrength)}`}
                          />
                        </div>
                      </div>
                    )}
                    
                    <AnimatePresence>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-sm text-destructive flex items-center"
                        >
                          <AlertCircle className="h-3 w-3 mr-1" /> {errors.password.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Confirm Password field */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors duration-300" />
                      <input
                        {...register('confirmPassword')}
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-background/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${errors.confirmPassword ? 'border-destructive' : 'border-input'}`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-sm text-destructive flex items-center"
                        >
                          <AlertCircle className="h-3 w-3 mr-1" /> {errors.confirmPassword.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-3 px-4 bg-background/50 text-foreground border border-border rounded-lg font-medium hover:bg-background/80 transition-all duration-300"
                    >
                      Back
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isLoading || !isValid}
                      type="submit"
                      className="w-2/3 py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <span>Create Account</span>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <div className="mt-8 pt-6 border-t border-border/30">
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/signin"
                className="text-primary hover:underline font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
            className="mt-4 text-center text-xs text-muted-foreground"
          >
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="hover:underline">Terms</Link> and{' '}
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>.
          </motion.p>
        </motion.div>

        {/* Trust indicators */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            className="flex items-center text-xs text-muted-foreground"
          >
            <Lock className="h-3 w-3 mr-1" /> Secure Connection
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
            className="flex items-center text-xs text-muted-foreground"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" /> Privacy Protected
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default SignUp