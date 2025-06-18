
import {
  Button,
  ButtonGroup,
  ChipList,
} from '@progress/kendo-react-buttons';
import { exportIcon } from '@progress/kendo-svg-icons';
import UsageChart from '../internal-building-blocks/usage-chart';
import { chipData } from '../data';
import { CustomChip } from '../custom-components/CustomComponents';

interface UsageProps {
  onRefresh: (chartOptions: any, themeOptions: any, chartInstance: { setOptions: (arg0: any, arg1: any) => void; }) => void;
}

export default function Usage({ onRefresh }: UsageProps) {
  return (
    <div>
      <h2 className="k-h5 !k-mb-5 k-color-subtle">Usage</h2>
      <div
        className="k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
        style={{ background: 'var(--card-gradient)' }}
      >
        <div className="k-p-4 k-d-flex k-justify-content-between k-flex-wrap k-gap-2 k-p-4">
          <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
            Usage of tokens
          </span>
          <ButtonGroup>
            <Button title="minute">Minute</Button>
            <Button className="k-selected" title="day">
              Day
            </Button>
            <Button title="month">Month</Button>
            <Button title="year">Year</Button>
            <Button title="total">Total</Button>
          </ButtonGroup>
        </div>
        <div className="k-flex-1 k-p-4 k-d-flex k-flex-col k-gap-4">
          <ChipList
            className="k-gap-2"
            data={chipData}
            chip={CustomChip}
            ariaLabel="chiplist"
          />

          <div className="k-flex-1">
            <UsageChart onRefresh={onRefresh} />
          </div>
        </div>
        <div className="k-p-2">
          <Button svgIcon={exportIcon} fillMode="flat" title="export">
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}