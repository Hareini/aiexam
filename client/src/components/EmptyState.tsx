import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  imageSrc?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  imageSrc
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-6" data-testid="empty-state">
      <div className="flex flex-col items-center space-y-4">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-24 h-24 opacity-50"
            data-testid="img-empty-state"
          />
        ) : Icon ? (
          <Icon className="h-24 w-24 text-muted-foreground opacity-50" data-testid="icon-empty-state" />
        ) : null}
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold" data-testid="text-empty-title">
            {title}
          </h3>
          <p className="text-muted-foreground max-w-md" data-testid="text-empty-description">
            {description}
          </p>
        </div>

        {actionLabel && onAction && (
          <Button onClick={onAction} data-testid="button-empty-action">
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}