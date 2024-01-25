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

function HorizontalBarChart({labels, titleText, label, data}) {
    const [stateLabels, setStateLabelsLabels] = useState([])
    const [stateData, setStateData] = useState([])

    useEffect(() => {
        if (labels.length > 0) {
            setStateLabelsLabels(labels.map(item => item.name))
        }
        if (data.length > 0) {
            setStateData(labels.map(item => {
               const temp = data.find(element => element.dataCategory.categoryId === item.categoryId)
               return temp
            }))
        }
    }, [labels, data])

    console.log('check labels', labels)
    console.log('check data', data)
    console.log('check new data: ', stateData)

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

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalBarChart);
