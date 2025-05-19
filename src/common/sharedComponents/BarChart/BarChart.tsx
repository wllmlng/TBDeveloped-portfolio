//External Libraries
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

//Api Calls

//Utils

//Hooks

//Components

//Types

//Constants

//Styles
import styles from './BarChart.module.scss'

//-----------------End Imports-----------------


interface Props {
    setStatusSelect: (val:string | null) => void;
    data: { status_code: number }[];
    loading: boolean;
    statusSelect: string | null | any;
}

function BarChart({statusSelect, setStatusSelect, data, loading}: Props) {

    const statusCounts = data.reduce((acc, curr) => {
        const statusCode = `${curr.status_code}`;
        if (statusCode.startsWith('2')) {
            acc['2xx'] += 1;
        } else if (statusCode.startsWith('4')) {
            acc['4xx'] += 1;
        } else if (statusCode.startsWith('5')) {
            acc['5xx'] += 1;
        }
        return acc;
    }, { '2xx': 0, '4xx': 0, '5xx': 0 }); 

    const options = {
        chart: {
            type: 'bar',
            height: 300 
        },
        credits: {
            enabled: false 
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false 
        },
        tooltip: {
            enabled: false 
        },
        xAxis: {
            categories: ['2xx', '4xx', '5xx'], 
            title: {
                text: null 
            },
            labels: {
                enabled: false 
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null 
            },
            labels: {
                enabled: false 
            }
        },
        plotOptions: {
            series: {
                cursor: 'pointer', 
                dataLabels: {
                    enabled: true, 
                    format: '{point.y}', 
                    style: {
                        fontWeight: 'bold',
                        color: '#000', 
                    },
                    verticalAlign: 'bottom', 
                    y: -5 
                },
                point: {
                    events: {
                        click: function () {
                            setStatusSelect((this as any).category); 
                        },
                    },
                },
                
            },
        },
        series: [{
            data: [
                { 
                    y: statusCounts['2xx'], 
                    color: '#28a745', 
                    borderColor: statusSelect === '2xx' ? '#000aff' : 'transparent', 
                    borderWidth: statusSelect === '2xx' ? 2 : 0 
                }, 
                { 
                    y: statusCounts['4xx'], 
                    color: '#ffc107', 
                    borderColor: statusSelect === '4xx' ? '#000aff' : 'transparent', 
                    borderWidth: statusSelect === '4xx' ? 2 : 0 
                }, 
                { 
                    y: statusCounts['5xx'], 
                    color: '#dc3545', 
                    borderColor: statusSelect === '5xx' ? '#000aff' : 'transparent', 
                    borderWidth: statusSelect === '5xx' ? 2 : 0 
                }  
            ],
            point: {
                events: {
                    click: function () {
                        const updatedStatus: string | null = (statusSelect === (this as any).category ? null : (this as any).category as string);
                        setStatusSelect(updatedStatus); 
                    },
                },
            },            
        }]
    };

    const loadOptions = {
        chart: {
            type: 'bar',
            height: 300 
        },
        credits: {
            enabled: false 
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false 
        },
        tooltip: {
            enabled: false 
        },
        xAxis: {
            categories: ['2xx', '4xx', '5xx'], 
            title: {
                text: null 
            },
            labels: {
                enabled: false 
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null 
            },
            labels: {
                enabled: false 
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false, 
                },
            },
        },
        series: [{
            data: [
                { 
                    y: 420, 
                    color: '#80808050', 
                }, 
                { 
                    y: 200, 
                    color: '#80808050', 
                }, 
                { 
                    y: 330, 
                    color: '#80808050', 
                }  
            ],
            point: {
                events: {
                    click: function () {
                        const updatedStatus: string | null = (statusSelect === (this as any).category ? null : (this as any).category as string);
                        setStatusSelect(updatedStatus); 
                    },
                },
            },            
        }]
    };

    return (
        <div className={'generic-container'}>
            <h4 className="sub-title">Status Code Distribution</h4>
            <div className={styles.barChartContainer}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={loading ? loadOptions : options}
                />
            </div>
        </div>
    );
}

export default BarChart;