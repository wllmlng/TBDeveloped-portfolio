//External Libraries
import React, { useEffect, useRef} from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import classNames from 'classnames';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

//Api Calls

//Utils

//Hooks

//Components

//Types

//Constants

//Styles
import styles from './TrendChart.module.scss'



//-----------------End Imports-----------------

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

interface Props { 
    loading?: boolean;
    data: any;
}

const TrendChart = ({data, loading}: Props) => {
    const sortedData = data.sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    const averageResponseTime = sortedData.reduce((acc: any, curr: any) => acc + curr.response_time, 0) / sortedData.length;
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = (chartRef.current as any).chart;
            if (loading) {
                chart.showLoading('Loading data...');
            } else {
                chart.hideLoading();
            }
        }
    }, [loading]);

    const options = {
        chart: {
            zoomType: 'x' 
        },
        credits: {
            enabled: false 
        },
        legend: {
            enabled: false 
        },
        title: {
            text: ''
        },
        tooltip: {
            shared: true, 
            useHTML: true, 
            formatter: function () {
                console.log(this)
                const points = (this as any).points; 
                let tooltipHtml = `<strong>${(this as any)?.category}</strong><br/>`;
                points.forEach((point: any) => {
                    tooltipHtml += `Response Rate: <strong>${point.y} ms</strong><br/>`; 
                });
                return tooltipHtml; 
            }
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: ''
            },
            categories: sortedData.map(({ timestamp }: { timestamp: string }) => new Date(timestamp).toLocaleDateString()),
            tickInterval: 5,
            labels: {
                formatter: function () {
                    return new Date((this as any).value).toLocaleDateString(); 
                },
      
            }
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        series: [{
            name: 'Response Time',
            data: sortedData.map(({ response_time }: { response_time: number }) => response_time)
        }, {
            name: 'Average',
            type: 'line', 
            color: 'red', 
            data: new Array(sortedData.length).fill(averageResponseTime), 
            marker: {
                enabled: false 
            },
            tooltip: {
                enabled: false 
            },
            dataLabels: {
                enabled: true, 
                align: 'right', 
                // formatter: function() {
                //     return `${this.y} ms`; 
                // },
                style: {
                    color: 'white', 
                    fill: 'white',
                    fontSize: '15px'
                },
                tooltip: {
                    enabled: false 
                },
                crop: false,
                overflow: 'none',
                allowOverlap: true,
                inside: false,
                verticalAlign: 'middle',
                y: -10,
                x: -5,
                formatter: function() {
                    return loading ? '' : (this as any).point.index === (this as any).series.data.length - 1 ? `Average: ${this.y.toFixed(2)} ms` : null;
                }
            }
        }],
        rangeSelector: {
            selected: 1, 
            buttons: [{
                type: 'day',
                count: 1,
                text: '1d'
            }, {
                type: 'week',
                count: 1,
                text: '1w'
            }, {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'all',
                text: 'All'
            }]
        },
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    menuItems: [
                        'downloadPNG',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadCSV'
                    ]
                }
            }
        }
    };
    
      return (
        <div className={classNames('generic-container', styles.trendChart)}>
            <h4 className="sub-title">Response Trend</h4>
            <div className={styles.chartContainer} >
                <div style={{width:'95%'}}>
                    <HighchartsReact 
                        ref={chartRef}
                        highcharts={Highcharts} 
                        options={options} 
                    />
                </div>
            </div>
        </div>
    );
  };

export default TrendChart