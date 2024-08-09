import { TooltipPosition } from './components/Tooltip/Tooltip.component';

type Tooltip = {
    title: React.ReactNode;
    tooltipLabel?: React.ReactNode;
    tooltipPosition?: TooltipPosition;
    arrow?: boolean;
    tooltipOnOverflow?: boolean;
    className?: string;
};

export const tooltipLabel = (
    <div>
        This tooltipppp does not fit above the button.
        <br />
        This is why it is displayed below instead! This tooltip does not fit above the button.
        <br />
        This is why it is displayed below instead! This tooltip does not fit above the button.
        <br />
        This is why it is displayed below instead!!!!!!!!!!!
    </div>
);

export const tooltip: Tooltip[] = [
    {
        title: 'right',
        tooltipLabel: (
            <span>
                Tooltip tooltip <br />
                right side
            </span>
        ),
        tooltipPosition: 'right',
        arrow: true,
    },
    {
        title: 'bottom with arrow',
        tooltipLabel: <span>bottom tooltip</span>,
        tooltipPosition: 'bottom',
        arrow: true,
    },
    {
        title: <span>top tooltip</span>,
        tooltipLabel: 'top tooltip',
        tooltipPosition: 'top',
        arrow: true,
    },
    {
        title: <div>left</div>,
        tooltipLabel: tooltipLabel,
        tooltipPosition: 'left',
        arrow: true,
    },
    {
        title: 'bottom',
        tooltipLabel: (
            <span>
                bottom tooltip without arrow........ Testing testing testing Testing testing testing Testing testing
                testing
            </span>
        ),
        tooltipPosition: 'bottom',
        arrow: false,
    },
    {
        title: 'left',
        tooltipLabel: 'Left tooltip tile without arrow',
        tooltipPosition: 'left',
        arrow: false,
    },
    {
        title: 'right',
        tooltipLabel: 'right tooltip',
        tooltipPosition: 'right',
        arrow: false,
    },
    {
        title: 'top',
        tooltipLabel: 'top tooltip',
        tooltipPosition: 'top',
        arrow: false,
    },
    {
        title: 'right',
        tooltipLabel: 'right tooltip',
        tooltipPosition: 'right',
        arrow: false,
    },
    {
        title: 'Testing tooltip........overflowed element......',
        tooltipLabel: 'Tooltip on overflow',
        tooltipOnOverflow: true,
        arrow: true,
        className: 'overflowElement',
    },
    {
        title: 'Testing tooltip',
        tooltipLabel: 'Tooltip on overflow',
        tooltipOnOverflow: true,
        className: 'overflowElement',
    },
];
