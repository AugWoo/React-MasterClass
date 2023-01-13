import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { useRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface CharProps {
  coinId: string;
}

function Chart({ coinId }: CharProps) {
  const isDark = useRecoilState(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        'Loading Chart...'
      ) : (
        <ApexChart
          type='line'
          series={[
            {
              name: 'hello',
              data: data?.map((price) => Number(price.close)) as number[],
              // as => 명확한 타입 규정.
            },
          ]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              height: 300,
              width: 200,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: { show: false },
            stroke: {
              curve: 'smooth',
              width: 5,
            },
            xaxis: {
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false, datetimeFormatter: { month: 'mmm "yy' } },
              type: 'datetime',
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: 'gradient',
              gradient: {
                gradientToColors: ['blue'],
                stops: [0, 50, 100],
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(1)}$`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
