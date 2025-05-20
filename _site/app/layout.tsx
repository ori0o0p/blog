import { useRouter } from 'next/router';
import { CategoryTreeSkeleton } from '@/components/LoadingSkeleton';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const Layout = React.memo(({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleStart = () => {
      timeoutRef.current = setTimeout(() => setIsLoading(true), 300);
    };
    const handleComplete = () => {
      clearTimeout(timeoutRef.current);
      setIsLoading(false);
    };
    
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('beforePopState', handleComplete);
    
    return () => {
      clearTimeout(timeoutRef.current);
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('beforePopState', handleComplete);
    };
  }, [router]);

  return (
    <div className={inter.className}>
      {isLoading && (
        <div className="fixed top-4 right-4 animate-fade-in">
          <div className="h-8 w-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {children}
    </div>
  );
};