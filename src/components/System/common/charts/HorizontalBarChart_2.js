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


function HorizontalBarChart_2({labels, titleText, label, data}) {
    const [stateLabels, setStateLabelsLabels] = useState([])
    const [stateData, setStateData] = useState([])

    useEffect(() => {
        if (labels.length > 0) {
            setStateLabelsLabels(labels.map(item => item.name))
        }
        if (data.length > 0) {
            setStateData(labels.map(item => {
               return data.find(element => element.dataCategoryDetail?.type === item.type)
            }))
        }
    }, [labels, data])

    return (    
        <Bar 
            options={
                {
                    indexAxis: 'y',
                    elements: {
                        bar: {
                            borderWidth: 2,
                        },
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
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
                    labels: stateLabels,
                    datasets: [
                        {
                            label,
                            data: stateData?.map(item => item?.quantity || 0),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ],
               }
            }
        />
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalBarChart_2);
