import { Tooltip } from './components/Tooltip/Tooltip.component';
import { tooltip } from './App.helper';

function App() {
    return (
        <>
            <h1>Tooltip Demo</h1>
            <div className="container">
                {tooltip.map((tlp, index) => (
                    <Tooltip
                        title={tlp.tooltipLabel}
                        arrow={tlp.arrow}
                        key={index}
                        tooltipPosition={tlp.tooltipPosition}
                        tooltipOnOverflow={tlp.tooltipOnOverflow}
                    >
                        <div className={tlp.className}>{tlp.title}</div>
                    </Tooltip>
                ))}
            </div>
        </>
    );
}

export default App;
