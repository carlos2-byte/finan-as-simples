import { Transaction, getCategoryById, getCreditCardById } from '@/lib/storage';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { getInvoiceDueDate, formatDateShortBR } from '@/lib/dateUtils';
import { useState, useEffect } from 'react';
import {
  TrendingUp,
  UtensilsCrossed,
  Car,
  Home,
  Heart,
  GraduationCap,
  Gamepad2,
  MoreHorizontal,
  CreditCard,
  Trash2,
  Repeat,
  Pencil,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  UtensilsCrossed,
  Car,
  Home,
  Heart,
  GraduationCap,
  Gamepad2,
  MoreHorizontal,
};

interface TransactionItemProps {
  transaction: Transaction;
  onDelete?: (transaction: Transaction) => void;
  onEdit?: (transaction: Transaction) => void;
  showActions?: boolean;
  isPaid?: boolean;
  isOverdue?: boolean;
  onTogglePaid?: (id: string) => void;
  showPurchaseDate?: boolean;
}

function getDisplayDate(
  transaction: Transaction,
  card: { closingDay?: number; dueDay?: number } | null
): string {
  if (transaction.isCardToCardPayment) return transaction.date;
  if (transaction.isCardPayment && transaction.invoiceMonth && card?.closingDay && card?.dueDay) {
    return getInvoiceDueDate(transaction.invoiceMonth, card.closingDay, card.dueDay);
  }
  return transaction.date;
}

export function TransactionItem({ 
  transaction, 
  onDelete,
  onEdit,
  showActions = false,
  isPaid = false,
  isOverdue = false,
  onTogglePaid,
  showPurchaseDate = false,
}: TransactionItemProps) {
  const [displayDate, setDisplayDate] = useState<string>(transaction.date);
  const [cardName, setCardName] = useState<string | null>(null);
  
  const category = getCategoryById(transaction.category || 'other');
  const Icon = category?.icon ? iconMap[category.icon] || MoreHorizontal : MoreHorizontal;
  const isIncome = transaction.type === 'income';
  const isRecurring = !!transaction.recurrenceId;
  const isInstallment = transaction.installments && transaction.installments > 1;
  const isCardPayment = transaction.isCardPayment && transaction.cardId;

  useEffect(() => {
    async function calculateDate() {
      if (isCardPayment && transaction.cardId) {
        const card = await getCreditCardById(transaction.cardId);
        if (card) {
          setDisplayDate(showPurchaseDate ? transaction.date : getDisplayDate(transaction, card));
          setCardName(card.name);
        }
      } else {
        setDisplayDate(transaction.date);
        setCardName(null);
      }
    }
    calculateDate();
  }, [transaction, isCardPayment, showPurchaseDate]);

  const showStatusIndicator = transaction.type === 'expense' && onTogglePaid;

  return (
    <div className={cn(
      "flex items-center h-16 w-full gap-3 py-2 group rounded-xl px-2 transition-all relative overflow-hidden bg-card",
      showStatusIndicator && !isPaid && isOverdue && "bg-destructive/10",
      showStatusIndicator && !isPaid && !isOverdue && "bg-warning/10",
      showActions ? "pr-24" : "pr-2"
    )}>
      
      {/* 1. ÍCONE E STATUS */}
      <div className="flex shrink-0 items-center gap-2">
        {showStatusIndicator && (
          <button onClick={(e) => { e.stopPropagation(); onTogglePaid?.(transaction.id); }} className="relative">
            <div className={cn('h-3.5 w-3.5 rounded-full border-2', isPaid ? 'bg-success border-success' : isOverdue ? 'bg-destructive border-destructive animate-pulse' : 'bg-warning border-warning')} />
            {isOverdue && !isPaid && <AlertTriangle className="absolute -top-1.5 -right-1.5 h-3 w-3 text-destructive" />}
          </button>
        )}
        <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: category?.color ? `${category.color}20` : 'hsl(var(--muted))' }}>
          <Icon className="h-5 w-5" style={{ color: category?.color || 'hsl(var(--muted-foreground))' }} />
        </div>
      </div>

      {/* 2. CONTEÚDO (Texto + Valor colados) */}
      <div className="flex flex-1 min-w-0 items-center gap-2">
        <div className="flex flex-col min-w-0 shrink-0">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-sm truncate leading-tight">
              {transaction.description || category?.name || 'Transação'}
            </p>
            {isCardPayment && <CreditCard className="h-3 w-3 text-muted-foreground shrink-0" />}
          </div>
          <p className="text-[10px] text-muted-foreground truncate">
            {isCardPayment ? formatDateShortBR(displayDate) : formatDate(transaction.date)}
          </p>
        </div>

        {/* VALOR: ml-1 para ficar próximo, e removido o sinal manual para evitar o '--' */}
        <span className={cn(
          'font-bold text-sm tabular-nums truncate ml-1',
          isIncome ? 'text-success' : 'text-foreground'
        )}>
          {formatCurrency(transaction.amount)}
        </span>
      </div>

      {/* 3. BOTÕES FIXOS */}
      {showActions && (
        <div className="absolute right-2 flex items-center gap-1 bg-background/90 backdrop-blur-sm p-1 rounded-lg border border-border/50 shadow-sm">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); onEdit?.(transaction); }}>
            <Pencil className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={(e) => { e.stopPropagation(); onDelete?.(transaction); }}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}