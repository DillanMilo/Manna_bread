import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-body font-medium transition-all duration-300 rounded-lg touch-manipulation',
  {
    variants: {
      variant: {
        primary: 'bg-brand-walnut text-brand-warm-white hover:bg-brand-walnut-medium hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md',
        secondary: 'bg-transparent text-brand-walnut border-[1.5px] border-brand-walnut hover:bg-brand-walnut hover:text-brand-warm-white active:bg-brand-walnut active:text-brand-warm-white',
        accent: 'bg-brand-cognac text-white hover:bg-brand-cognac-light hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md',
        ghost: 'bg-transparent text-white border-[1.5px] border-white/50 hover:bg-white/10 active:bg-white/15',
      },
      size: {
        default: 'px-7 py-3.5 text-sm min-h-[44px]',
        lg: 'px-8 py-4 text-base min-h-[48px]',
        sm: 'px-5 py-2.5 text-sm min-h-[44px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Button({ children, variant, size, href, external, className, onClick }: ButtonProps) {
  const classes = buttonVariants({ variant, size, className });

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
