import React from 'react';
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

function HorizontalBarChart({ labels, titleText, label, data }) {

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
                        // legend: {
                        //     position: 'right',
                        // },
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
                            data: data?.map(item => item?.quantitySold || 0),
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalBarChart);
