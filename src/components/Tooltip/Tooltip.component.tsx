import {
    cloneElement,
    createElement,
    ReactElement,
    ReactNode,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { getTooltipStyle } from './Tooltip.helper';
import './Tooltip.css';

export type TooltipPosition =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'bottom-start'
    | 'top-end'
    | 'bottom-end';

export type TooltipArrowPosition = 'center' | 'start' | 'end';

export type BoundingRect = Omit<DOMRect, 'toJSON' | 'x' | 'y'> & {
    id: string;
};

export type TooltipProps = {
    title: ReactNode;
    children: ReactNode;
    arrow?: boolean;
    tooltipPosition?: TooltipPosition;
    className?: string;
    tooltipOnOverflow?: boolean;
    arrowPosition?: TooltipArrowPosition;
};

const tooltipDefaultProps: Partial<TooltipProps> = {
    arrow: false,
    tooltipPosition: 'bottom',
    className: '',
    tooltipOnOverflow: false,
    arrowPosition: 'center',
};

const notComponentTypes: ReactNode[] = ['string', 'number', 'boolean'];

export const Tooltip = ({
    title,
    children,
    arrow = tooltipDefaultProps.arrow,
    tooltipPosition = tooltipDefaultProps.tooltipPosition,
    className = tooltipDefaultProps.className,
    tooltipOnOverflow = tooltipDefaultProps.tooltipOnOverflow,
    arrowPosition = tooltipDefaultProps.arrowPosition,
}: TooltipProps) => {
    const elementRef = useRef<HTMLElement>(null);
    const idRef = useRef<string>(window.crypto.randomUUID());
    const [targetRect, setTargetRect] = useState<BoundingRect>();

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                removeTooltip();
            }
        };

        window.addEventListener('keyup', handleEscape);

        return () => {
            window.removeEventListener('keyup', handleEscape);
        };
    }, []);

    const child = useMemo(() => {
        const childrenProps = {
            ref: elementRef,
            onPointerEnter: () => calculateChildTargetRect(),
            onPointerLeave: () => removeTooltip(),
        };
        if (notComponentTypes.includes(typeof children)) {
            return createElement('span', {
                children,
                ...childrenProps,
            });
        } else {
            return cloneElement(children as ReactElement, { ...childrenProps });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setChildBoundingRect = (boundingRect: DOMRect) => {
        elementRef.current?.setAttribute('aria-describedby', idRef.current);
        setTargetRect({
            bottom: boundingRect.bottom,
            right: boundingRect.right,
            left: boundingRect.left,
            top: boundingRect.top,
            height: boundingRect.height,
            width: boundingRect.width,
            id: idRef.current,
        });
    };

    const removeTooltip = () => {
        elementRef.current?.removeAttribute('aria-describedby');
        setTargetRect(undefined);
    };

    const calculateChildTargetRect = () => {
        if (elementRef.current) {
            const rect: DOMRect = elementRef.current?.getBoundingClientRect();
            if (tooltipOnOverflow) {
                if (elementRef.current.scrollWidth > elementRef.current.clientWidth) {
                    setChildBoundingRect(rect);
                }
            } else {
                setChildBoundingRect(rect);
            }
        }
    };

    return (
        <>
            {child}
            {targetRect && title && (
                <TooltipPortal
                    arrowPosition={arrowPosition}
                    targetCoords={targetRect}
                    title={title}
                    tooltipPosition={tooltipPosition}
                    arrow={arrow}
                    className={className}
                />
            )}
        </>
    );
};

type TooltipPortalProps = Omit<TooltipProps, 'children'> & {
    targetCoords: BoundingRect;
};

export type TooltipBounding = { height: number; width: number };

export function TooltipPortal({
    arrow = tooltipDefaultProps.arrow,
    tooltipPosition = tooltipDefaultProps.tooltipPosition,
    className = tooltipDefaultProps.className,
    arrowPosition = tooltipDefaultProps.arrowPosition,
    title,
    targetCoords,
}: TooltipPortalProps) {
    const [, setTooltipBounding] = useState<TooltipBounding>();
    const ref = useRef<HTMLDivElement>(null);
    const tooltipBoundingRef = useRef<TooltipBounding>();

    useLayoutEffect(() => {
        const data = ref.current?.getBoundingClientRect();
        if (data) {
            tooltipBoundingRef.current = {
                height: data.height,
                width: data.width,
            };
            setTooltipBounding({ ...tooltipBoundingRef.current });
        }
    }, []);

    const tooltipStyle = getTooltipStyle(tooltipPosition!, targetCoords, tooltipBoundingRef.current);

    return createPortal(
        <div
            ref={ref}
            id={targetCoords.id}
            role="tooltip"
            className={`tooltipPortal ${className}`}
            style={{
                transform: tooltipStyle.style,
            }}
        >
            <div className={`tooltip ${tooltipStyle.className} ${arrow ? 'tooltipArrow' : ''} ${arrowPosition}`}>
                {title}
            </div>
        </div>,
        document.body,
    );
}
