import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function VerticalBarChart({labels, titleText, label, data, optionCol=2}) {
    
    const datasets =  optionCol === 2 ? [
        {
            label: label.dataSet1,
            data: data?.map(item => item?.revenue ? item?.revenue : item?.quantity ? item?.quantity : 0),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: label.dataSet2,
            data: data?.map(item => item?.profit || 0),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ] : [
        {
            label: label.dataSet1,
            data: data?.map(item => item?.revenue ? item?.revenue : item?.quantity ? item?.quantity : 0),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
    ]

    return (    
        <Bar 
            options={
                {
                    responsive: true,
                    elements: {
                        bar: {
                            borderWidth: 2,
                        },
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: titleText,
                        },
                    },
                }
            }       
            data= {
               {
                    labels,
                    datasets
               }
            }
        />
    );
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalBarChart);
