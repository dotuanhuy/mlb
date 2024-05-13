import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


function AreaChart({ labels, titleText, label, data }) {

    return (
        <Line
            options={
                {
                    responsive: true,
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
            data={
                {
                    labels,
                    datasets: [
                        {
                            label: label.dataSet1,
                            data: data?.map(item => item?.revenue || 0),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                            label: label.dataSet2,
                            data: data?.map(item => item?.profit || 0),
                            borderColor: 'rgba(53, 162, 235, 0.5)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                    ],
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

export default connect(mapStateToProps, mapDispatchToProps)(AreaChart);
