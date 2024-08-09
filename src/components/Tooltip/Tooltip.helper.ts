import { BoundingRect, TooltipBounding, TooltipPosition } from './Tooltip.component';

type TooltipStyleProp = {
    style?: string;
    className?: TooltipPosition;
    arrowStyle?: string;
};

const oppositePosition: Record<TooltipPosition, TooltipPosition> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
    'bottom-start': 'top-start',
    'top-start': 'bottom-start',
    'bottom-end': 'top-end',
    'top-end': 'bottom-end',
};

export const getTooltipStyle = (
    tooltipPosition: TooltipPosition,
    targetCoords: BoundingRect,
    tooltipBounding?: TooltipBounding,
): TooltipStyleProp => {
    const tooltipProps: TooltipStyleProp = {};

    if (targetCoords && tooltipBounding) {
        let changeTooltipPosition = false;
        if (['top', 'top-start', 'top-end'].includes(tooltipPosition)) {
            changeTooltipPosition = tooltipBounding.height > targetCoords.top;
        } else if (tooltipPosition == 'left') {
            changeTooltipPosition = tooltipBounding.width > targetCoords.left;
        } else if (tooltipPosition == 'right') {
            changeTooltipPosition = tooltipBounding.width + targetCoords.right > window.innerWidth;
        } else {
            changeTooltipPosition = targetCoords.bottom + tooltipBounding.height > window.innerHeight;
        }
        if (changeTooltipPosition) {
            tooltipProps.className = oppositePosition[tooltipPosition];
            tooltipProps.style = getPositionWiseStyle(oppositePosition[tooltipPosition], targetCoords, tooltipBounding);
        } else {
            tooltipProps.className = tooltipPosition;
            tooltipProps.style = getPositionWiseStyle(tooltipPosition, targetCoords, tooltipBounding);
        }
    }
    return tooltipProps;
};

export const getPositionWiseArrowStyle = (position: TooltipPosition, tooltipBounding: TooltipBounding) => {
    switch (position) {
        case 'top':
        case 'bottom':
            return `translate3d(${tooltipBounding.width / 2}px, 0, 0)`;
        case 'left':
        case 'right':
            return `translate3d(0, ${-tooltipBounding.height / 2}px, 0)`;
    }
};

export const getPositionWiseStyle = (
    position: TooltipPosition,
    targetCoords: BoundingRect,
    tooltipBounding: TooltipBounding,
) => {
    switch (position) {
        case 'top':
            return `translate3d(${targetCoords.left - (tooltipBounding.width - targetCoords.width) / 2}px, ${targetCoords.top - tooltipBounding.height}px, 0)`;
        case 'top-start':
            return `translate3d(${targetCoords.left}px, ${targetCoords.top - tooltipBounding.height}px, 0)`;
        case 'top-end':
            return `translate3d(${targetCoords.right - tooltipBounding.width}px, ${targetCoords.top - tooltipBounding.height}px, 0)`;
        case 'bottom-end':
            return `translate3d(${targetCoords.right - tooltipBounding.width}px, ${targetCoords.top + targetCoords.height}px, 0)`;
        case 'bottom-start':
            return `translate3d(${targetCoords.left}px, ${targetCoords.top + targetCoords.height}px, 0)`;
        case 'left':
            return `translate3d(${targetCoords.left - tooltipBounding.width}px, ${targetCoords.top - (tooltipBounding.height - targetCoords.height) / 2}px, 0)`;
        case 'right':
            return `translate3d(${targetCoords.left + targetCoords.width}px, ${targetCoords.top - (tooltipBounding.height - targetCoords.height) / 2}px, 0)`;
        case 'bottom':
        default:
            return `translate3d(${targetCoords.left - (tooltipBounding.width - targetCoords.width) / 2}px, ${targetCoords.top + targetCoords.height}px, 0)`;
    }
};
