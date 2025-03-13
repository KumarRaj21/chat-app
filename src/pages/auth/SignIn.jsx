import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  CheckCircle, 
  LogIn,
  Sparkles
} from 'lucide-react'
import { setUser } from '../../store/authSlice'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [formFocus, setFormFocus] = useState(null)
  const [authSuccess, setAuthSuccess] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  // Subtle background animation
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      // Simulate network delay for better UX feedback
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock authentication
      const user = { id: 1, email: data.email, name: 'John Doe' }
      localStorage.setItem('user', JSON.stringify(user))
      dispatch(setUser(user))
      
      setAuthSuccess(true)
      
      // Toast notification
      toast.success('Welcome back! Redirecting to your dashboard...', {
        duration: 3000,
      })
      
      // Slight delay before navigation for better UX
      setTimeout(() => {
        navigate('/chat')
      }, 1200)
    } catch (error) {
      toast.error('We couldn\'t verify your credentials. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      // Simulate network delay for better UX feedback
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      // Mock Google authentication
      const user = { id: 2, email: 'johndoe@gmail.com', name: 'John Doe', provider: 'google' }
      localStorage.setItem('user', JSON.stringify(user))
      dispatch(setUser(user))
      
      setAuthSuccess(true)
      
      // Toast notification
      toast.success('Google sign-in successful! Redirecting...', {
        duration: 3000,
      })
      
      // Slight delay before navigation for better UX
      setTimeout(() => {
        navigate('/chat')
      }, 1200)
    } catch (error) {
      toast.error('Google sign-in failed. Please try again.')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(124, 58, 237, 0.1), rgba(124, 58, 237, 0.05) 40%, transparent 60%)`,
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80 p-6 relative overflow-hidden">
      {/* Interactive background */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out" 
        style={gradientStyle}
      />
      <div className="absolute inset-0 bg-pattern-grid opacity-[0.02]" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />
      <motion.div 
        className="absolute top-10 left-10 w-16 h-16 rounded-full bg-primary/5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-10 right-20 w-24 h-24 rounded-full bg-primary/5"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div 
        className="absolute top-1/4 right-10 w-10 h-10 rounded-full bg-primary/10"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 overflow-hidden"
        >
          <div className="bg-background/90 backdrop-blur-xl border border-border/50 p-8 rounded-2xl shadow-lg relative">
            {/* Subtle inner glow effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0" />
              <div className="absolute -inset-1 bg-grid-pattern opacity-[0.03]" />
            </div>
            
            {/* Success animation overlay */}
            <AnimatePresence>
              {authSuccess && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 rounded-2xl flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-primary/10 p-4 rounded-full mb-4"
                  >
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-medium text-foreground"
                  >
                    Authentication Successful
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm text-muted-foreground mt-2"
                  >
                    Redirecting to your dashboard...
                  </motion.p>
                  <motion.div
                    className="mt-6 relative h-1 w-48 bg-primary/20 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex flex-col items-center mb-8 relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-5"
              >
                {/* Brand logo placeholder with animation */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-xl relative overflow-hidden shadow-lg shadow-primary/20">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  <span className="relative z-10">A</span>
                  <motion.div 
                    className="absolute top-0 right-0 h-4 w-4"
                    animate={{ 
                      opacity: [0, 0.8, 0],
                      rotate: 360,
                      scale: [1, 1.5, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-primary-foreground/80" />
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-foreground"
              >
                Welcome Back
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-muted-foreground mt-2"
              >
                Sign in to continue to your account
              </motion.p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-1.5"
              >
                <label htmlFor="email" className="text-sm font-medium text-foreground/80 ml-1 flex items-center">
                  <Mail className="h-3 w-3 mr-2 text-primary/70" />
                  Email
                </label>
                <div className={`relative transition-all duration-300 ${formFocus === 'email' ? 'scale-[1.02]' : ''}`}>
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${formFocus === 'email' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-xl bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${errors.email ? 'border-destructive/50' : 'border-border'}`}
                    onFocus={() => setFormFocus('email')}
                    onBlur={() => setFormFocus(null)}
                  />
                  {/* Subtle interaction hint */}
                  <div className={`absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${formFocus === 'email' ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="h-1 w-1 rounded-full bg-primary" />
                  </div>
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-destructive ml-1 mt-1 flex items-center"
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-1.5"
              >
                <label htmlFor="password" className="text-sm font-medium text-foreground/80 ml-1 flex items-center">
                  <Lock className="h-3 w-3 mr-2 text-primary/70" />
                  Password
                </label>
                <div className={`relative transition-all duration-300 ${formFocus === 'password' ? 'scale-[1.02]' : ''}`}>
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${formFocus === 'password' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <input
                    {...register('password')}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-2.5 border rounded-xl bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${errors.password ? 'border-destructive/50' : 'border-border'}`}
                    onFocus={() => setFormFocus('password')}
                    onBlur={() => setFormFocus(null)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-destructive ml-1 mt-1 flex items-center"
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {formFocus === 'password' && !errors.password && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="absolute -bottom-4 right-0"
                    >
                      <div className="flex gap-1">
                        <div className="h-1 w-6 rounded-full bg-primary/10" />
                        <div className="h-1 w-6 rounded-full bg-primary/30" />
                        <div className="h-1 w-6 rounded-full bg-primary/60" />
                        <div className="h-1 w-6 rounded-full bg-primary" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center space-x-2">
                  <div className="relative inline-flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="rounded border-border text-primary focus:ring-primary/20 h-4 w-4"
                    />
                    <div className="absolute h-4 w-4 z-10 pointer-events-none transition-opacity duration-200 opacity-0 peer-checked:opacity-100">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer hover:text-muted-foreground/80 transition-colors">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:text-primary/80 hover:underline transition-colors relative group"
                >
                  Forgot Password?
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading || (!isDirty || !isValid)}
                  className={`w-full py-2.5 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 
                    ${isLoading || (!isDirty || !isValid) 
                      ? 'bg-primary/60 text-primary-foreground/80 cursor-not-allowed' 
                      : 'bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30'}`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="relative z-10 mt-6 flex items-center justify-center space-x-4"
            >
              <div className="h-px flex-1 bg-border/80"></div>
              <span className="text-xs text-muted-foreground px-2">OR</span>
              <div className="h-px flex-1 bg-border/80"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-6 relative z-10"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full py-2.5 px-4 rounded-xl font-medium border border-border bg-background hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 flex items-center justify-center space-x-3 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-yellow-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {isGoogleLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                ) : (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span className="text-foreground">Continue with Google</span>
                  </>
                )}
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-8 pt-6 border-t border-border/50 text-center relative z-10"
            >
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-primary font-medium hover:underline transition-colors relative group inline-flex items-center"
                >
                  Create an account
                  <LogIn className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6 pt-4 text-center relative z-10"
            >
              <p className="text-xs text-muted-foreground/70">
                By signing in, you agree to our{' '}
                <Link to="/terms" className="hover:underline text-muted-foreground/90">Terms of Service</Link>{' '}
                and{' '}
                <Link to="/privacy" className="hover:underline text-muted-foreground/90">Privacy Policy</Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Just for rendering the missing components to avoid errors
const XCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M15 9l-6 6" />
    <path d="M9 9l6 6" />
  </svg>
);

export default SignIn